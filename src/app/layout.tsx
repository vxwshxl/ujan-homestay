import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_COLOR } from "@/lib/brand-colors";
import { SEO_DESCRIPTION, SEO_KEYWORDS, SEO_TITLE } from "@/lib/seo";
import { ADDRESS, BRAND, SITE_URL } from "@/lib/site";
import "./globals.css";

// Two families, three files: Fraunces (roman + italic) for display, echoing
// the serif UJAN wordmark, and Geist for everything you read.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

/*
 * Icons and share images come from file conventions in this folder, so Next
 * writes their tags with the right type and size:
 *   favicon.ico · icon.svg · apple-icon.png · opengraph-image.png · twitter-image.png
 * Their sources and the script that renders them live in marketing/.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO_TITLE, template: `%s · ${BRAND.name}` },
  description: SEO_DESCRIPTION,
  applicationName: BRAND.name,
  keywords: SEO_KEYWORDS,
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: BRAND.name,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Phone numbers are real links already; stop iOS from re-linking the address
  // and the price into something else.
  formatDetection: { telephone: false, address: false, email: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  other: {
    "geo.region": "IN-AS",
    "geo.placename": `${ADDRESS.locality}, ${ADDRESS.city}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
