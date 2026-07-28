"use client";

import Script from "next/script";

const GA_ID = "G-EX0EQ075QH";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Map short ?src= links (e.g. ?src=resume) to GA campaign source
          var src = new URLSearchParams(window.location.search).get('src');
          gtag('config', '${GA_ID}', src ? {
            campaign_source: src,
            campaign_medium: 'link'
          } : {});

          // Also fire an explicit event so it shows up in Realtime/Events
          if (src) {
            gtag('event', 'tagged_visit', { link_url: src });
          }
        `}
      </Script>
    </>
  );
}
