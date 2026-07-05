import type { Metadata } from "next";
import "../styles/site.css";
import "../styles/premium.css";
import "./globals.css";
import IconDefs from "@/components/IconDefs";
import SiteEffects from "@/components/SiteEffects";

export const metadata: Metadata = {
  metadataBase: new URL("https://pgcmc.fun"),
  title: "Pakistan Gamers Community — Pakistan Gamers Community",
  description:
    "Pakistan Gamers Community — tournaments, Warrior Lifesteal SMP, events, creators and Pakistan's most active Minecraft community.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Pakistan Gamers Community",
    title: "Pakistan Gamers Community — Tournaments, Lifesteal SMP & Giveaways",
    description:
      "Join thousands of Pakistani gamers in tournaments, Warrior Lifesteal SMP, exclusive events, giveaways, and a community that never logs off.",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
    url: "https://pgcmc.fun/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Gamers Community — Tournaments, Lifesteal SMP & Giveaways",
    description:
      "Join thousands of Pakistani gamers in tournaments, Warrior Lifesteal SMP, exclusive events, giveaways, and a community that never logs off.",
    images: ["/logo.png"],
  },
};

export const viewport = {
  themeColor: "#050a12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="noise" aria-hidden="true"></div>

        {children}

        <button className="back-top" aria-label="Back to top">
          ↑
        </button>
        <div className="toast" role="status" aria-live="polite"></div>

        <IconDefs />
        <SiteEffects />
      </body>
    </html>
  );
}
