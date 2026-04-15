import type { MetadataRoute } from "next";

const BASE = "https://mintmediahouse.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
