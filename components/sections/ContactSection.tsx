"use client";

import React from "react";
import Grainient from "@/components/Grainient";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  serviceType: string;
  consent: boolean;
};

type ContactSectionProps = {
  title?: string;
  mainMessage?: string;
  contactEmail?: string;
  onSubmit?: (data: ContactFormData) => void;
};

export function ContactSection({
  title = "We can turn your frontier AI roadmap into reality",
  mainMessage = "Contact our team",
  contactEmail = "contact@adzzat.com",
  onSubmit,
}: ContactSectionProps) {
  const [formData, setFormData] = React.useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    serviceType: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      company: formData.company,
      serviceType: formData.serviceType,
      consent: formData.consent,
    };

    try {
      // Send email (from contact@adzzat.com, CC to team) via our API
      const emailRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!emailRes.ok) {
        const err = await emailRes.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send");
      }

      // Also record in spreadsheet (best-effort)
      try {
        await fetch("https://sheetdb.io/api/v1/3hpi189csecyv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [payload] }),
        });
      } catch {
        // Ignore SheetDB errors; user already succeeded
      }

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        company: "",
        serviceType: "",
        consent: false,
      });
      onSubmit?.(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white text-slate-900">
      <div className="fixed inset-0 z-0 bg-white">
        <Grainient
          color1="#c0bfbc"
          color2="#deddda"
          color3="#c0bfbc"
          timeSpeed={0.3}
          colorBalance={0.49}
          warpStrength={3.75}
          warpFrequency={0}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={3.3}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.75}
        />
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 pb-16 pt-28 md:px-8 lg:px-12">
        <div className="grid w-full max-w-6xl items-center gap-12 rounded-3xl bg-white/80 p-6 shadow-2xl backdrop-blur lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-10">
          <div className="flex flex-col items-start gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              CONTACT
            </p>
            <h1 className="max-w-xl text-balance text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
              Tell us about your model, evaluation goals, and timelines. We&apos;ll
              respond with a concrete proposal for a custom data pipeline or
              evaluation program.
            </p>
            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-medium">Email</span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-sm font-medium text-(--brand) underline-offset-4 hover:underline"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-slate-100/80 via-white to-slate-100/80" />
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {mainMessage}
              </h2>
              <p className="text-xs text-slate-500">
                Share a few details and we&apos;ll get back to you within 1–2
                business days.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-medium text-slate-700"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Ada"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-900 outline-none transition focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-medium text-slate-700"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Lovelace"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-900 outline-none transition focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-700"
                >
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-900 outline-none transition focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="mobile"
                  className="text-xs font-medium text-slate-700"
                >
                  Mobile
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 000-0000"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-900 outline-none transition focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="company"
                  className="text-xs font-medium text-slate-700"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Your company name"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-900 outline-none transition focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-700">
                  What type of engagement are you looking for?
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Model training",
                    "Alignment & RLHF",
                    "Evaluation & benchmarking",
                    "Domain-specific expertise",
                    "Custom AI engagement",
                    "Other",
                  ].map((label) => (
                    <label
                      key={label}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs text-slate-700 shadow-sm transition hover:border-(--brand)/60 hover:bg-white"
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={label}
                        checked={formData.serviceType === label}
                        onChange={handleChange}
                        required
                        className="h-3.5 w-3.5 border-slate-300 text-(--brand) focus:ring-(--brand)"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      consent: e.target.checked,
                    }))
                  }
                  required
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-(--brand) focus:ring-(--brand)"
                />
                <span>
                  I consent to AdzzatLabs collecting and using my personal data for
                  the purpose of responding to my inquiry, in accordance with
                  the Privacy Policy.
                </span>
              </label>

              {submitStatus === "success" && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
                  Thank you — your message has been sent.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl cursor-pointer hover:bg-[#0A1628] text-sm font-semibold tracking-[0.12em] text-white shadow-lg transition bg-[#1e3a8a] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

