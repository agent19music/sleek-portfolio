import type { Metadata } from "next";
import { Instrument_Serif, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/ui/ScrollAnimations"
import GradualBlur from "@/components/GradualBlur"
import { DynamicTitle } from "@/components/DynamicTitle"

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

export const metadata: Metadata = {
  metadataBase: new URL('https://sean.uzskicorp.agency'),
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
        url: "/opengraph.webp",
        width: 1000,
        height: 1000,
        alt: "Sean Motanya - Full Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sean Motanya - Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building intentionally designed, impactful applications. Specializing in React, Next.js, Python, and modern web technologies.",
    creator: "@uzski404",
    images: ["/opengraph.webp"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="tMCNs2fgM6voEHBd3JsySffMFSiUCQDEFEF1iYI3-ZQ" />
        <DynamicTitle />
      </head>
      <body className={`${hkGrotesk.className} ${instrumentSerif.variable}`} suppressHydrationWarning={true}>
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
