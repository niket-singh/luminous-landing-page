"use client";

import { useState } from "react";
import { Container } from "@/components/site/Container";
import { DATASETS, FILTERS, type Dataset, type Filter } from "@/components/datasets/data";
import { cn } from "@/lib/utils";

export function Catalogue() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = DATASETS.filter((item) => filter === "All" || item.category === filter);

  const countFor = (value: Filter) =>
    value === "All" ? DATASETS.length : DATASETS.filter((item) => item.category === value).length;

  return (
    <Container>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Dataset categories">
        {FILTERS.map((value) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium",
                "transition-opacity duration-150 hover:opacity-70",
                active ? "bg-shell text-shell-ink" : "bg-paper-sunk text-ink",
              )}
            >
              {value}
              <span className={cn("font-mono text-[11px]", active ? "opacity-60" : "opacity-45")}>
                {countFor(value)}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10">
        {visible.map((dataset) => (
          <DatasetRow key={dataset.code} dataset={dataset} />
        ))}
      </ul>

      <p className="t-small mt-10 max-w-[62ch]">
        Streaming previews are compressed by Drive &mdash; download samples for full fidelity. North
        America collections are opening soon.
      </p>
    </Container>
  );
}

function DatasetRow({ dataset }: { dataset: Dataset }) {
  return (
    <li className="grid gap-6 border-t border-rule py-8 lg:grid-cols-[minmax(0,20rem)_1fr_auto] lg:gap-10">
      <div>
        <p className="t-meta">{dataset.code}</p>
        <h3 className="t-h3 mt-1.5">{dataset.title}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          <span className="t-small">{dataset.setting}</span>
          <span className="t-small">{dataset.geography}</span>
          {dataset.imu ? <span className="t-meta text-accent">IMU</span> : null}
          {dataset.customCollection ? (
            <span className="t-meta text-accent">Custom collection</span>
          ) : null}
        </div>
      </div>

      <div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <Spec label="Workers" value={dataset.workers} />
          <Spec label="Videos" value={dataset.videos} />
          <Spec label="OTS hours" value={dataset.otsHours} />
          <Spec label="Capture" value={dataset.camera} />
        </dl>
        <p className="t-meta mt-4">
          {dataset.resolution} &middot; 30/60 fps &middot; H.264/H.265
        </p>
        {dataset.note ? <p className="t-small mt-3 max-w-[52ch]">{dataset.note}</p> : null}
      </div>

      <a
        href={dataset.sampleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-fit shrink-0 items-center gap-1 text-sm font-medium underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
      >
        View sample
        <span aria-hidden="true" className="arrow-nudge">&#8599;</span>
      </a>
    </li>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="t-meta">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}
