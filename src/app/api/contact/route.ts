import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const bodySchema = z.object({
  name: z.string().min(2, "Name is too short."),
  email: z.string().email("Invalid email."),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL ?? "Ojhashivam936@gmail.com";
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  if (!resendApiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const { name, email, message } = parsed.data;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Portfolio Inquiry from ${name}`,
      replyTo: email,
      text: `New Portfolio Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error || !data?.id) {
      return NextResponse.json(
        { error: error?.message ?? "Failed to queue email delivery." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email." },
      { status: 500 },
    );
  }
}
