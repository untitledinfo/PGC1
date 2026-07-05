"use client";

import { useEffect } from "react";

export default function SiteEffects() {
  useEffect(() => {
    const $ = (s: string, c: ParentNode = document) => c.querySelector(s);
    const $$ = (s: string, c: ParentNode = document) => [
      ...c.querySelectorAll<HTMLElement>(s),
    ];

    const cleanups: Array<() => void> = [];

    // Reveal-on-scroll
    const revealObs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => revealObs.observe(el));
    cleanups.push(() => revealObs.disconnect());

    // Stagger card groups
    const groups = $$(
      ".team-grid,.app-grid,.feature-grid,.quotes,.gallery-grid"
    );
    const staggerObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          [...entry.target.children].forEach((child, i) =>
            (child as HTMLElement).style.setProperty("--i", String(i))
          );
          entry.target.classList.add("reveal-stagger");
          staggerObs.unobserve(entry.target);
        }),
      { threshold: 0.12 }
    );
    groups.forEach((g) => staggerObs.observe(g));
    cleanups.push(() => staggerObs.disconnect());

    // Scroll progress bar
    const scrollProgress = document.createElement("div");
    scrollProgress.className = "scroll-progress";
    document.body.appendChild(scrollProgress);
    function updateScrollProgress() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      scrollProgress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
    cleanups.push(() => {
      removeEventListener("scroll", updateScrollProgress);
      scrollProgress.remove();
    });

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHover = matchMedia("(hover: hover)").matches;

    // Cursor glow
    if (!reduceMotion && hasHover) {
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      document.body.appendChild(glow);
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        gx = mx,
        gy = my,
        active = false,
        raf = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (!active) {
          active = true;
          glow.classList.add("active");
        }
      };
      const onLeave = () => {
        active = false;
        glow.classList.remove("active");
      };
      addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      (function loop() {
        gx += (mx - gx) * 0.14;
        gy += (my - gy) * 0.14;
        glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
        raf = requestAnimationFrame(loop);
      })();
      cleanups.push(() => {
        removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
        glow.remove();
      });
    }

    // 3D tilt + spotlight
    if (!reduceMotion && hasHover) {
      const tiltEls = $$(
        ".gallery-item,.app-card,.feature-grid>div,.quotes article,.event-main,.champions,.news-card"
      );
      const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
      tiltEls.forEach((el) => {
        el.classList.add("tilt");
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const rx = (py - 0.5) * -7;
          const ry = (px - 0.5) * 7;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", onMove, { passive: true });
        el.addEventListener("mouseleave", onLeave);
        handlers.push([el, onMove, onLeave]);
      });
      cleanups.push(() => {
        handlers.forEach(([el, onMove, onLeave]) => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // Fade images in as they load
    const imgs = $$("img");
    const imgHandlers: Array<[HTMLImageElement, () => void, () => void]> = [];
    imgs.forEach((imgEl) => {
      const img = imgEl as HTMLImageElement;
      if (img.complete && img.naturalWidth) img.classList.add("is-loaded");
      else {
        const onLoad = () => img.classList.add("is-loaded");
        const onError = () => {
          img
            .closest(".gallery-item,.discord-orb,.event-art")
            ?.classList.add("img-fallback");
          img.style.display = "none";
        };
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
        imgHandlers.push([img, onLoad, onError]);
      }
    });
    cleanups.push(() => {
      imgHandlers.forEach(([img, onLoad, onError]) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      });
    });

    // Nav scrolled state + back-to-top visibility
    const nav = $(".nav") as HTMLElement | null;
    const backTop = $(".back-top") as HTMLElement | null;
    const onScroll = () => {
      nav?.classList.toggle("scrolled", scrollY > 100);
      backTop?.classList.toggle("show", scrollY > 700);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => removeEventListener("scroll", onScroll));

    const onBackTop = () => scrollTo({ top: 0, behavior: "smooth" });
    backTop?.addEventListener("click", onBackTop);
    cleanups.push(() => backTop?.removeEventListener("click", onBackTop));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
