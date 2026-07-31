"use client";

import React from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
};

export function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="relative z-20 bg-white/90 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row">
        <div className="max-w-md space-y-4">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
            FAQ
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Have questions? We have answers. Browse our most common inquiries
            about how AdzzatLabs supports frontier AI teams.
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-slate-900 sm:px-5 sm:py-4"
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                >
                  <span>{faq.question}</span>
                  <span className="text-lg text-slate-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

