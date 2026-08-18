"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  challenge: string;
  message: string;
  consent: boolean;
}

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  challenge: "",
  message: "",
  consent: false,
};

const CHALLENGES = [
  "Inference costs are too high",
  "Model reliability in production",
  "Evaluation for a specific domain",
  "Custom training datasets",
  "RL environments and reward design",
  "Something else",
] as const;

const SHEET_ENDPOINT = "https://sheetdb.io/api/v1/3hpi189csecyv";

type SubmitStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to send");
      }

      // Spreadsheet mirror is best-effort — the enquiry is already delivered.
      try {
        await fetch(SHEET_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [formData] }),
        });
      } catch {
        // Intentionally ignored.
      }

      setSubmitStatus("success");
      setFormData(EMPTY_FORM);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Field
        id="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ada Lovelace"
      />
      <Field
        id="email"
        type="email"
        label="Work email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@company.com"
      />
      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          id="company"
          label="Company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
        />
        <Field
          id="role"
          label="Role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Head of ML"
        />
      </div>

      <div>
        <label htmlFor="challenge" className="t-meta">
          What&rsquo;s your current challenge?
        </label>
        <select
          id="challenge"
          name="challenge"
          value={formData.challenge}
          onChange={handleChange}
          required
          className={cn(
            "mt-2 w-full appearance-none rounded-none border-0 border-b border-rule bg-transparent pb-2",
            "text-base font-medium text-ink transition-colors focus:border-ink focus:outline-none",
            formData.challenge === "" && "text-ink/30",
          )}
        >
          <option value="" disabled>
            Select one
          </option>
          {CHALLENGES.map((challenge) => (
            <option key={challenge} value={challenge} className="text-ink">
              {challenge}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="t-meta">
          Message <span className="opacity-60">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="What are you building, and where does it break down?"
          className={cn(
            "mt-2 w-full resize-y border-0 border-b border-rule bg-transparent pb-2",
            "text-base font-medium text-ink placeholder:text-ink/30",
            "transition-colors focus:border-ink focus:outline-none",
          )}
        />
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={(event) =>
            setFormData((previous) => ({ ...previous, consent: event.target.checked }))
          }
          required
          className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
        />
        <span className="t-small">
          I consent to Adzzat Labs collecting and using my personal data to respond to this enquiry,
          in accordance with the privacy policy.
        </span>
      </label>

      {submitStatus === "success" ? (
        <p className="border-l-2 border-accent pl-4 text-sm font-medium text-ink">
          Thank you &mdash; your message has been sent. We respond within 1&ndash;2 business days.
        </p>
      ) : null}
      {submitStatus === "error" ? (
        <p className="border-l-2 border-rule-strong pl-4 text-sm font-medium text-ink">
          Something went wrong. Please try again, or email contact@adzzat.com directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-shell px-6 py-2.5",
          "text-sm font-medium text-shell-ink transition-opacity duration-150",
          "hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

interface FieldProps {
  id: keyof ContactFormData & string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

/** Hairline-underline input, matching the rule-based language used site-wide. */
function Field({ id, label, value, onChange, placeholder, type = "text" }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="t-meta">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className={cn(
          "mt-2 w-full border-0 border-b border-rule bg-transparent pb-2",
          "text-base font-medium text-ink placeholder:text-ink/30",
          "transition-colors focus:border-ink focus:outline-none",
        )}
      />
    </div>
  );
}
