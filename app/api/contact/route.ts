import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const FROM_EMAIL = "contact@adzzat.com";
const CC_EMAILS = [
  "nabeel@adzzatlabs.com",
  "aryanhonawar@adzzatlabs.com",
  "eshu@adzzatlabs.com",
];

type ContactBody = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  serviceType: string;
  consent: boolean;
};

function buildEmailBody(data: ContactBody): string {
  return [
    "New contact form submission",
    "",
    "---",
    `First name: ${data.firstName}`,
    `Last name: ${data.lastName}`,
    `Email: ${data.email}`,
    `Mobile: ${data.mobile}`,
    `Company: ${data.company}`,
    `Engagement type: ${data.serviceType}`,
    `Consent: ${data.consent ? "Yes" : "No"}`,
    "---",
  ].join("\n");
}

export async function POST(request: Request) {
  const appPassword = process.env.CONTACT_EMAIL_APP_PASSWORD;
  if (!appPassword?.trim()) {
    console.error("CONTACT_EMAIL_APP_PASSWORD is not set");
    return NextResponse.json(
      { error: "Email not configured" },
      { status: 500 }
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, mobile, company, serviceType, consent } =
    body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobile ||
    !company ||
    !serviceType ||
    typeof consent !== "boolean"
  ) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: FROM_EMAIL,
      pass: appPassword,
    },
  });

  const text = buildEmailBody(body);
  const subject = `Contact form: ${firstName} ${lastName} (${company})`;

  try {
    // Internal notification (to team, CC)
    await transporter.sendMail({
      from: `"AdzzatLabs Contact" <${FROM_EMAIL}>`,
      to: FROM_EMAIL,
      cc: CC_EMAILS,
      replyTo: email,
      subject,
      text,
    });

    // Confirmation email to the person who submitted the form
    await transporter.sendMail({
      from: `"AdzzatLabs" <${FROM_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out to AdzzatLabs",
      text: [
        `Hi ${firstName || "there"},`,
        "",
        "Thanks for contacting AdzzatLabs. We've received your details and someone from the team will follow up shortly.",
        "",
        "Summary of what you shared:",
        `• Name: ${firstName} ${lastName}`.trim(),
        `• Company: ${company}`,
        `• Email: ${email}`,
        `• Mobile: ${mobile}`,
        `• Engagement type: ${serviceType}`,
        "",
        "If anything is missing or you'd like to share more context, you can simply reply to this email.",
        "",
        "— AdzzatLabs team",
      ].join("\n"),
    });
  } catch (err) {
    console.error("Contact email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send notification email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
