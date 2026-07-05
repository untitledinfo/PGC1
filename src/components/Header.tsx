"use client";

import { useState } from "react";
import Link from "next/link";

type Variant = "home" | "secondary";

export default function Header({
  variant,
  activeKey,
}: {
  variant: Variant;
  activeKey?: string;
}) {
  const [open, setOpen] = useState(false);

  const cls = (key: string) => (activeKey === key ? "active" : undefined);

  return (
    <header className="nav" id="top">
      {variant === "home" ? (
        <a className="brand" href="#home" aria-label="PGC home">
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
        </a>
      ) : (
        <Link className="brand" href="/#home" aria-label="PGC home">
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
        </Link>
      )}

      <nav
        className={`navlinks${open ? " open" : ""}`}
        id="navlinks"
        aria-label="Main navigation"
      >
        {variant === "home" ? (
          <>
            <a className={cls("home")} href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
            <a className={cls("event")} href="#event" onClick={() => setOpen(false)}>
              Events
            </a>
            <a className={cls("server")} href="#server" onClick={() => setOpen(false)}>
              Server
            </a>
            <a className={cls("team")} href="#team" onClick={() => setOpen(false)}>
              Team
            </a>
            <a
              className={cls("applications")}
              href="#applications"
              onClick={() => setOpen(false)}
            >
              Applications
            </a>
            <Link href="/news" onClick={() => setOpen(false)}>
              News
            </Link>
          </>
        ) : (
          <>
            <Link href="/#home" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/#event" onClick={() => setOpen(false)}>
              Events
            </Link>
            <Link href="/#server" onClick={() => setOpen(false)}>
              Server
            </Link>
            <Link href="/#community" onClick={() => setOpen(false)}>
              Community
            </Link>
            <Link
              className={cls("news")}
              href="/news"
              onClick={() => setOpen(false)}
            >
              News
            </Link>
          </>
        )}
      </nav>

      <div className="nav-actions">
        {variant === "home" && (
          <button className="icon-btn search-toggle" aria-label="Open search">
            <svg>
              <use href="#i-search" />
            </svg>
          </button>
        )}
        {variant === "home" ? (
          <a className="btn btn-sm btn-blue" href="#discord">
            Join Discord <span>↗</span>
          </a>
        ) : (
          <Link className="btn btn-sm btn-blue" href="/#discord">
            Join Discord <span>↗</span>
          </Link>
        )}
        <button
          className="menu"
          aria-controls="navlinks"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
