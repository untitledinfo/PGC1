import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/legal.css";

export const metadata: Metadata = {
  title: "Terms of Service — Pakistan Gamers Community",
  description:
    "Terms of Service for Pakistan Gamers Community — rules for using our website, Discord and Minecraft server.",
  openGraph: {
    type: "website",
    siteName: "Pakistan Gamers Community",
    title: "Terms of Service — Pakistan Gamers Community",
    description:
      "Terms covering your use of the PGC website, Discord server and Warrior Lifesteal SMP.",
    images: [{ url: "/banner.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header variant="secondary" />
      <main id="main">
        <section className="legal-hero reveal visible">
          <span className="kicker">LEGAL</span>
          <h1>
            Terms of <em>Service</em>
          </h1>
          <p className="legal-updated">
            Last updated: July 3, 2026 · Applies to pgcmc.fun, our Discord
            server and the Warrior Lifesteal SMP
          </p>
          <div className="legal-toc">
            <a href="#acceptance">Acceptance</a>
            <a href="#eligibility">Eligibility</a>
            <a href="#conduct">Conduct</a>
            <a href="#applications">Applications</a>
            <a href="#accounts">Accounts &amp; bans</a>
            <a href="#ip">Intellectual property</a>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#changes">Changes</a>
            <a href="#contact">Contact</a>
          </div>
        </section>

        <section className="legal-body reveal visible">
          <div className="legal-callout">
            <p>
              These terms cover your use of the PGC website, Discord server and
              Warrior Lifesteal SMP. By joining our Discord or connecting to
              our Minecraft server, you agree to them.
            </p>
          </div>

          <h2 id="acceptance">1. Acceptance of terms</h2>
          <p>
            By accessing pgcmc.fun, joining our Discord server, or connecting
            to any PGC Minecraft server, you agree to these Terms of Service
            and our <Link href="/privacy-policy">Privacy Policy</Link>. If you
            don&apos;t agree, please don&apos;t use our services.
          </p>

          <h2 id="eligibility">2. Eligibility</h2>
          <p>
            You must be at least 13 years old to join our Discord server or
            apply for a staff, developer or creator role, in line with
            Discord&apos;s own minimum age requirement. Players under 13 may
            still play on our Minecraft server with a parent or guardian&apos;s
            permission.
          </p>

          <h2 id="conduct">3. Community conduct</h2>
          <p>
            To keep PGC fair and welcoming, the following are not allowed
            anywhere across our website, Discord or Minecraft servers:
          </p>
          <ul>
            <li>Cheating, hacked clients, macros, exploiting bugs, or griefing.</li>
            <li>Hate speech, harassment, discrimination, or targeted abuse of any kind.</li>
            <li>Impersonating staff, other players, or PGC itself.</li>
            <li>Sharing malicious links, spam, or content that violates Discord&apos;s Community Guidelines.</li>
            <li>Teaming in solo-format events, or otherwise undermining fair competition.</li>
          </ul>
          <p>
            Full, up-to-date server rules are posted in our{" "}
            <Link href="/#faq">FAQ section</Link> and pinned in Discord.
          </p>

          <h2 id="applications">4. Applications &amp; submissions</h2>
          <p>
            When you submit a staff, developer or creator application through
            our site, you confirm the information you provide is accurate.
            Submitting an application does not guarantee acceptance — all
            applications are reviewed at our team&apos;s discretion.
          </p>

          <h2 id="accounts">5. Accounts, warnings &amp; bans</h2>
          <p>
            Staff may issue warnings, mutes, kicks or bans for violations of
            these terms or our server rules, at their reasonable discretion,
            to protect the community. Ban appeals can be raised through
            Discord.
          </p>

          <h2 id="ip">6. Intellectual property</h2>
          <p>
            The PGC name, logo and original custom plugins/systems belong to
            Pakistan Gamers Community. Minecraft is a trademark of Mojang
            Synergies AB; PGC is an independent community project and is not
            affiliated with or endorsed by Mojang or Microsoft.
          </p>

          <h2 id="disclaimer">7. Disclaimer</h2>
          <p>
            PGC is a volunteer-run community project provided &quot;as
            is.&quot; We do our best to keep servers online and events fair,
            but we can&apos;t guarantee uninterrupted uptime, and we&apos;re
            not liable for losses arising from server downtime, item loss, or
            third-party services we link to (such as Discord or our hosting
            provider).
          </p>

          <h2 id="changes">8. Changes to these terms</h2>
          <p>
            We may update these terms as PGC grows. Continued use of our
            website, Discord or Minecraft server after changes are posted
            means you accept the updated terms.
          </p>

          <h2 id="contact">9. Contact</h2>
          <p>
            Questions about these terms can be sent through our{" "}
            <Link href="/#discord">Discord server</Link>.
          </p>
        </section>
      </main>
      <Footer variant="secondary" />
    </>
  );
}
