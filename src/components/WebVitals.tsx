"use client";

import { useReportWebVitals } from "next/web-vitals";

type Gtag = (
  command: "event",
  name: string,
  params: Record<string, string | number | boolean>
) => void;

export function WebVitals() {
  useReportWebVitals((metric) => {
    const gtag = (window as Window & { gtag?: Gtag }).gtag;
    if (!gtag) return;

    gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  });

  return null;
}
