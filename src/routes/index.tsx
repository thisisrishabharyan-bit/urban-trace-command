import { createFileRoute } from "@tanstack/react-router";
import { UrbanTraceDashboard } from "@/components/UrbanTraceDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UrbanTrace AI — Operator Control Room" },
      { name: "description", content: "A calm, map-first smart-city vehicle tracking and traffic alert review workspace." },
      { property: "og:title", content: "UrbanTrace AI — Operator Control Room" },
      { property: "og:description", content: "Smart-city vehicle tracking, camera visibility, and evidence-led alert review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <UrbanTraceDashboard />;
}
