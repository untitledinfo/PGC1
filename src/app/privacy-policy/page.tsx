import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/legal.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Pakistan Gamers Community",
  description:
    "Privacy Policy for Pakistan Gamers Community — how we collect, use and protect your data.",
  openGraph: {
    type: "website",
    siteName: "Pakistan Gamers Community",
    title: "Privacy Policy — Pakistan Gamers Community",
    description:
      "How PGC collects, uses and protects your information across our website and Discord community.",
    images: [{ url: "/banner.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header variant="secondary" />
      <main id="main">
        <section className="legal-hero reveal visible">
          <span className="kicker">LEGAL</span>
          <h1>
            Privacy <em>Policy</em>
          </h1>
          <p className="legal-updated">
            Last updated: July 3, 2026 · Applies to pgcmc.fun and the Pakistan
            Gamers Community Discord server
          </p>
          <div className="legal-toc">
            <a href="#collect">What we collect</a>
            <a href="#use">How we use it</a>
            <a href="#discord">Discord data</a>
            <a href="#sharing">Sharing</a>
            <a href="#cookies">Cookies</a>
            <a href="#rights">Your rights</a>
            <a href="#children">Children</a>
            <a href="#contact">Contact</a>
          </div>
        </section>

        <section className="legal-body reveal visible">
          <div className="legal-callout">
            <p>
              PGC is a community-run Minecraft and gaming project, not a company
              with a legal team. This policy explains, in plain language, what
              information we collect through our website, Discord server and
              application forms, and what we do with it.
            </p>
          </div>

          <h2 id="collect">1. What we collect</h2>
          <p>
            We collect only what&apos;s needed to run tournaments, manage
            applications and keep the community safe:
          </p>
          <ul>
            <li>
              <b>Application forms</b> — your in-game name, Discord username/ID,
              age range, role you&apos;re applying for, and any message you
              submit (staff, developer and creator applications).
            </li>
            <li>
              <b>Discord activity</b> — your Discord username, ID, roles,
              messages and voice activity are visible to us as a normal
              function of running a Discord server; this is governed by
              Discord&apos;s own{" "}
              <a
                href="https://discord.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
              .
            </li>
            <li>
              <b>Server play data</b> — your Minecraft username and in-game
              statistics (kills, deaths, playtime) when connected to the
              Warrior Lifesteal SMP.
            </li>
            <li>
              <b>Technical data</b> — standard, non-identifying analytics such
              as browser type and approximate region, collected automatically
              by our hosting provider.
            </li>
          </ul>

          <h2 id="use">2. How we use it</h2>
          <ul>
            <li>To review and respond to staff, developer and creator applications.</li>
            <li>To run tournaments, giveaways and leaderboards fairly.</li>
            <li>To moderate the Discord server and Minecraft server, and enforce our rules.</li>
            <li>To improve the website and community experience over time.</li>
          </ul>
          <p>We do not sell your data, and we do not use it for advertising.</p>

          <h2 id="discord">3. Discord data</h2>
          <p>
            Live member counts, online status and the &quot;who&apos;s
            online&quot; widget shown on our site are pulled directly from
            Discord&apos;s public API in your browser — this data comes from
            Discord, not from a database we maintain.
          </p>

          <h2 id="sharing">4. Sharing</h2>
          <p>
            Application form submissions are sent to a small volunteer review
            team via email using a third-party form relay service. We
            don&apos;t share your information with advertisers or unrelated
            third parties. We may disclose information if required by law or
            to protect the safety of our community.
          </p>

          <h2 id="cookies">5. Cookies &amp; local storage</h2>
          <p>
            Our site uses your browser&apos;s local storage to keep a backup
            copy of application submissions on your own device, and to
            remember light preferences like your selected server edition. We
            don&apos;t use tracking cookies or third-party ad trackers.
          </p>

          <h2 id="rights">6. Your rights &amp; choices</h2>
          <p>
            You can leave the Discord server at any time, which removes your
            membership data from our server. To request that we delete an
            application submission or ask what we hold about you, contact us
            using the details below.
          </p>

          <h2 id="children">7. Children</h2>
          <p>
            Our staff, developer and creator programs require applicants to be
            at least 13 years old, in line with Discord&apos;s own minimum
            age. We don&apos;t knowingly collect information from children
            under 13.
          </p>

          <h2 id="contact">8. Contact</h2>
          <p>
            Questions about this policy can be sent through our{" "}
            <Link href="/#discord">Discord server</Link> or to the address listed in
            our application confirmation emails.
          </p>
        </section>
      </main>
      <Footer variant="secondary" />
    </>
  );
}
