import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://sean.uzskicorp.agency/sitemap.xml",
    host: "https://sean.uzskicorp.agency",
  };
}
