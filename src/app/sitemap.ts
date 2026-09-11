import type { MetadataRoute } from "next";
import { PHOTOS } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * One page, with its photos attached. The image entries are what get the
 * rooms into Google Images for "homestay in Guwahati" searches.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: PHOTOS.map((p) => `${SITE_URL}${p}`),
    },
  ];
}
