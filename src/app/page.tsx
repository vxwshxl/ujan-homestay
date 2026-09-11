import { HeroScroll } from "@/components/marketing/hero-scroll";
import { MarqueeBand } from "@/components/marketing/marquee-band";
import { RevealFooter } from "@/components/marketing/reveal-footer";
import {
  AmenityGrid,
  CtaBand,
  FaqBand,
  GalleryBand,
  HomeBand,
  LocationBand,
  RatesBand,
  StayTimelineSection,
} from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { siteStructuredData } from "@/lib/seo";

/**
 * The Ujan Homestay landing.
 *
 * A server component: the copy, the structured data and every section are
 * rendered once and shipped as HTML, readable before anything hydrates. Only
 * what needs the client is a client component — the smooth-scroll bridge, the
 * header, the pinned hero, the stay timeline, the gallery and the counters.
 *
 * `overflow-x-clip` (not hidden) on <main>: clip creates no scroll container,
 * so the pinned hero and the sticky phone keep working, while the blooms and
 * the tilted marquee can never put a horizontal scrollbar on a phone. `z-10`
 * and the opaque background let the page slide up over the pinned footer.
 */
export default function HomePage() {
  // `<` escaped so no string in the graph can ever close the script tag.
  const jsonLd = JSON.stringify(siteStructuredData()).replace(/</g, "\\u003c");

  return (
    <>
      <main id="main" className="relative z-10 flex flex-1 flex-col overflow-x-clip bg-background">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

        <SmoothScroll />
        <SiteNav />

        <HeroScroll />
        <MarqueeBand />
        <HomeBand />
        <StayTimelineSection />
        <AmenityGrid />
        <GalleryBand />
        <RatesBand />
        <LocationBand />
        <FaqBand />
        <CtaBand />
      </main>

      <RevealFooter>
        <SiteFooter />
      </RevealFooter>
    </>
  );
}
