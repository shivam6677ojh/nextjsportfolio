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

function generateLocalReply(userInput: string) {
  const input = userInput.toLowerCase();

  if (/(who are you|about|profile|summary|introduce)/.test(input)) {
    return `${siteConfig.name} is a ${siteConfig.role}.\n${siteConfig.bio}`;
  }

  if (/(resume|cv|download)/.test(input)) {
    return `You can download ${siteConfig.name}'s CV from: ${siteConfig.resumeUrl}.`;
  }

  if (/(contact|email|reach|hire|linkedin|github)/.test(input)) {
    return `Contact: ${siteConfig.email}\nLinkedIn: ${siteConfig.linkedin}\nGitHub: ${siteConfig.github}`;
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

  return `I only answer from ${siteConfig.name}'s CV details: summary, skills, projects, education, certificates, contact, and resume link.\nPlease ask a CV-related question.`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid messages payload." }, { status: 400 });
  }

  const userMessage = parsed.data.messages[parsed.data.messages.length - 1]?.content ?? "";
  return NextResponse.json({ reply: generateLocalReply(userMessage) }, { status: 200 });
}
