import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig, skills, skillGroups, projects, education, certificates } from "@/lib/site-data";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(10),
});

const profileContext = `
You are the official portfolio assistant for ${siteConfig.name}.
You answer only from the provided portfolio knowledge base.

Brand and Theme:
- Visual style: futuristic red-and-black theme with neon accents.
- Tone: crisp, professional, and confident.

Identity:
- Name: ${siteConfig.name}
- Role: ${siteConfig.role}
- Tagline: ${siteConfig.tagline}
- Bio: ${siteConfig.bio}

Direct Links:
- Resume: ${siteConfig.resumeUrl}
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}

Skills (core):
- ${skills.join(", ")}

Skills by group:
${skillGroups
  .map((group) => `- ${group.title}: ${group.items.map((item) => item.label).join(", ")}`)
  .join("\n")}

Education:
${education
  .map(
    (item) =>
      `- ${item.institution} | ${item.qualification} | ${item.location} | ${item.period}`,
  )
  .join("\n")}

Projects:
${projects
  .map(
    (project) =>
      `- ${project.title}: ${project.subtitle}. ${project.description} Tech: ${project.techStack.join(", ")}. Live: ${project.liveUrl}. GitHub: ${project.githubUrl}.`,
  )
  .join("\n")}

Certificates:
${certificates
  .map(
    (certificate) =>
      `- ${certificate.title} by ${certificate.issuer} (${certificate.issueDate}). Verify: ${certificate.verificationUrl}`,
  )
  .join("\n")}

Rules:
- Answer only portfolio-related questions.
- Provide specific facts and links when useful.
- Keep most replies in 2-6 lines unless user asks for detail.
- If something is outside available knowledge, say it is not listed in the portfolio and point user to ${siteConfig.email}.
`;

function generateLocalReply(userInput: string) {
  const input = userInput.toLowerCase();

  if (/(resume|cv|download)/.test(input)) {
    return `You can download ${siteConfig.name}'s resume from: ${siteConfig.resumeUrl}. For direct requests, contact ${siteConfig.email}.`;
  }

  if (/(contact|email|reach|hire)/.test(input)) {
    return `You can contact ${siteConfig.name} at ${siteConfig.email}. Also connect on LinkedIn: ${siteConfig.linkedin}.`;
  }

  if (/(theme|design|ui|style)/.test(input)) {
    return "The portfolio theme is a futuristic red-and-black visual style with neon glow accents and interactive motion effects.";
  }

  if (/(education|university|college|school|cgpa)/.test(input)) {
    return education
      .map((item) => `${item.institution}: ${item.qualification} (${item.period}, ${item.location})`)
      .join("\n");
  }

  if (/(certificate|certification)/.test(input)) {
    return certificates
      .map((item) => `${item.title} (${item.issuer}, ${item.issueDate}) - ${item.verificationUrl}`)
      .join("\n");
  }

  if (/(project|portfolio|work|demo|live)/.test(input)) {
    return projects
      .map((item) => `${item.title} - Live: ${item.liveUrl} | GitHub: ${item.githubUrl}`)
      .join("\n");
  }

  if (/(skill|technology|tech stack|stack)/.test(input)) {
    return `Core skills: ${skills.join(", ")}\n${skillGroups
      .map((group) => `${group.title}: ${group.items.map((item) => item.label).join(", ")}`)
      .join("\n")}`;
  }

  return `I can help with ${siteConfig.name}'s projects, skills, education, certificates, resume, and contact details. Ask, for example: "Show projects", "How to download resume?", or "What is the tech stack?"`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid messages payload." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const userMessage = parsed.data.messages[parsed.data.messages.length - 1]?.content ?? "";
    return NextResponse.json({ reply: generateLocalReply(userMessage) }, { status: 200 });
  }

  try {
    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          { role: "system", content: profileContext },
          ...parsed.data.messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ reply: "Assistant is temporarily unavailable." }, { status: 200 });
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply:
        reply ||
        "I can help with Shivam's projects, skills, technologies, education, certificates, resume, and contact details.",
    });
  } catch {
    return NextResponse.json({ reply: "Assistant is temporarily unavailable." }, { status: 200 });
  }
}
