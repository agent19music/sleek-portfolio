import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/ui/ScrollAnimations"
import GradualBlur from "@/components/GradualBlur"
import { DynamicTitle } from "@/components/DynamicTitle"
import GoogleAnalytics from "@/components/GoogleAnalytics"

const hkGrotesk = Roboto({
  weight: ['400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-hk-grotesk',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-instrument-serif'
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sean.uzskicorp.agency'),
  alternates: {
    canonical: 'https://sean.uzskicorp.agency',
  },
  title: {
    default: "Sean Motanya - SWE",
    template: "%s | Sean Motanya",
  },
  description:
    "Full Stack Software Engineer building intentionally designed, impactful applications. Specializing in React, Next.js, Python, and modern web technologies.",
  keywords: [
    "Sean Motanya",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Kotlin",
    "Flask",
    "Docker",
    "React Native",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Portfolio",
    "Nairobi",
    "Kenya",
    "Uzski Corp",
    "Tailwind CSS",
    "Software Engineering",
  ],
  authors: [{ name: "Sean Motanya", url: "https://sean.uzskicorp.agency" }],
  creator: "Sean Motanya",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sean.uzskicorp.agency",
    title: "Sean Motanya - Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building intentionally designed, impactful applications. Specializing in React, Next.js, Python, and modern web technologies.",
    siteName: "Sean Motanya Portfolio",
    images: [
      {
        url: "/sean-og.webp",
        width: 1200,
        height: 630,
        alt: "Sean Motanya - Full Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@uzski404",
    creator: "@uzski404",
    title: "Sean Motanya - Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building intentionally designed, impactful applications. Specializing in React, Next.js, Python, and modern web technologies.",
    images: ["/sean-og.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sean.uzskicorp.agency/#person",
      "name": "Sean Motanya",
      "url": "https://sean.uzskicorp.agency",
      "image": "https://sean.uzskicorp.agency/sean-og.webp",
      "jobTitle": "Full Stack Software Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Uzski Corp"
      },
      "sameAs": [
        "https://x.com/uzski404",
        "https://github.com/uzski404"
      ],
      "description": "Full Stack Software Engineer building intentionally designed, impactful applications. Specializing in React, Next.js, Python, and modern web technologies."
    },
    {
      "@type": "WebSite",
      "@id": "https://sean.uzskicorp.agency/#website",
      "url": "https://sean.uzskicorp.agency",
      "name": "Sean Motanya Portfolio",
      "description": "Full Stack Software Engineer building intentionally designed, impactful applications.",
      "publisher": {
        "@id": "https://sean.uzskicorp.agency/#person"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://sean.uzskicorp.agency/#webpage",
      "url": "https://sean.uzskicorp.agency",
      "name": "Sean Motanya - Full Stack Software Engineer",
      "description": "Full Stack Software Engineer building intentionally designed, impactful applications.",
      "isPartOf": {
        "@id": "https://sean.uzskicorp.agency/#website"
      },
      "about": {
        "@id": "https://sean.uzskicorp.agency/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="tMCNs2fgM6voEHBd3JsySffMFSiUCQDEFEF1iYI3-ZQ" />
        <link rel="canonical" href="https://sean.uzskicorp.agency" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#09090b" />
        <DynamicTitle />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${hkGrotesk.className} ${instrumentSerif.variable}`} suppressHydrationWarning={true}>
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">
            {children}
          </div>
          <GradualBlur
            position="bottom"
            height="5rem"
            target="page"
            zIndex={1}
            strength={2}
            divCount={5}
          />
          <ScrollToTop />
        </ThemeProvider>
        <script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="2cYj0B5Uv0T4q70DhnoAc"
          data-enable-batching="true"
          async
        ></script>
      </body>
    </html>
  );
}
