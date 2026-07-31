import type { Metadata } from "next";
import { DatasetsPage } from "@/components/revamp/DatasetsPage";

export const metadata: Metadata = {
  title: "Robotics Dataset Catalogue | AdzzatLabs",
  description:
    "Egocentric video, teleoperation, tactile glove, and annotated manipulation datasets for physical intelligence — collected across residential, commercial, and industrial environments in Asia and Latin America.",
  openGraph: {
    title: "Robotics Dataset Catalogue | AdzzatLabs",
    description:
      "Off-the-shelf and custom robotics datasets: egocentric, teleoperation, tactile glove, and annotated manipulation data with verified quality.",
  },
};

export default function Page() {
  return <DatasetsPage />;
}
