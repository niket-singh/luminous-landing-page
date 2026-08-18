import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const FROM_EMAIL = "contact@adzzat.com";
const CC_EMAILS = [
  "nabeel@adzzatlabs.com",
  "aryanhonawar@adzzatlabs.com",
  "eshu@adzzatlabs.com",
];

interface ContactBody {
  name: string;
  email: string;
  company: string;
  role: string;
  challenge: string;
  message: string;
  consent: boolean;
}

/** Fields that must be present and non-empty. `message` is optional. */
const REQUIRED_FIELDS = ["name", "email", "company", "role", "challenge"] as const;

function buildEmailBody(data: ContactBody): string {
  return [
    "New enquiry from the Get started form",
    "",
    "---",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Role: ${data.role}`,
    `Current challenge: ${data.challenge}`,
    `Message: ${data.message || "(none)"}`,
    `Consent: ${data.consent ? "Yes" : "No"}`,
    "---",
  ].join("\n");
}

export async function POST(request: Request) {
  const appPassword = process.env.CONTACT_EMAIL_APP_PASSWORD;
  if (!appPassword?.trim()) {
    console.error("CONTACT_EMAIL_APP_PASSWORD is not set");
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body?.[field]?.trim?.());
  if (missing.length > 0 || body.consent !== true) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: FROM_EMAIL, pass: appPassword },
  });

  const text = buildEmailBody(body);
  const subject = `Get started: ${body.name} (${body.company})`;

  try {
    // Internal notification (to team, CC)
    await transporter.sendMail({
      from: `"Adzzat Labs Enquiries" <${FROM_EMAIL}>`,
      to: FROM_EMAIL,
      cc: CC_EMAILS,
      replyTo: body.email,
      subject,
      text,
    });

    // Confirmation email to the person who submitted the form
    await transporter.sendMail({
      from: `"Adzzat Labs" <${FROM_EMAIL}>`,
      to: body.email,
      subject: "Thanks for reaching out to Adzzat Labs",
      text: [
        `Hi ${body.name || "there"},`,
        "",
        "Thanks for contacting Adzzat Labs. We've received your details and someone from the team will follow up shortly.",
        "",
        "Summary of what you shared:",
        `• Name: ${body.name}`,
        `• Company: ${body.company}`,
        `• Role: ${body.role}`,
        `• Email: ${body.email}`,
        `• Current challenge: ${body.challenge}`,
        ...(body.message ? [`• Message: ${body.message}`] : []),
        "",
        "If anything is missing or you'd like to share more context, you can simply reply to this email.",
        "",
        "— Adzzat Labs team",
      ].join("\n"),
    });
  } catch (err) {
    console.error("Contact email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send notification email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
