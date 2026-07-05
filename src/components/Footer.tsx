import Link from "next/link";
import type { ReactNode } from "react";

function HashLink({
  variant,
  hash,
  children,
}: {
  variant: "home" | "secondary";
  hash: string;
  children: ReactNode;
}) {
  return variant === "home" ? (
    <a href={`#${hash}`}>{children}</a>
  ) : (
    <Link href={`/#${hash}`}>{children}</Link>
  );
}

export default function Footer({ variant }: { variant: "home" | "secondary" }) {
  return (
    <footer>
      <div className="footer-brand">
        <HashLink variant={variant} hash="top">
          <span className="brand">
            <img
              className="brand-logo"
              src="/logo.png"
              width={1000}
              height={1000}
              alt="PGC logo"
            />
            <span>
              PGC<small>Pakistan Gamers</small>
            </span>
          </span>
        </HashLink>
        <p>Pakistan&apos;s home for competitive gaming, Minecraft and community.</p>
      </div>
      <div>
        <b>EXPLORE</b>
        <HashLink variant={variant} hash="event">Events</HashLink>
        <HashLink variant={variant} hash="server">Servers</HashLink>
        <HashLink variant={variant} hash="team">Team</HashLink>
        <HashLink variant={variant} hash="gallery">Gallery</HashLink>
        <HashLink variant={variant} hash="faq">Support</HashLink>
      </div>
      <div>
        <b>COMMUNITY</b>
        <HashLink variant={variant} hash="applications">Applications</HashLink>
        <HashLink variant={variant} hash="discord">Discord</HashLink>
        <HashLink variant={variant} hash="leaderboard">Leaderboards</HashLink>
        <Link href="/news">News</Link>
      </div>
      <div>
        <b>LEGAL</b>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
        <HashLink variant={variant} hash="faq">Server Rules</HashLink>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pakistan Gamers Community. All rights reserved.</span>
        <span>Made with ♥ in Pakistan 🇵🇰</span>
      </div>
    </footer>
  );
}
