"use client";

import { useEffect } from "react";

export default function HomeClient() {
  useEffect(() => {
    const $ = (s: string, c: ParentNode = document) =>
      c.querySelector<HTMLElement>(s);
    const $$ = (s: string, c: ParentNode = document) => [
      ...c.querySelectorAll<HTMLElement>(s),
    ];

    const timers: Array<number> = [];
    const cleanups: Array<() => void> = [];

    // Active nav link tracking by scroll position
    const sections = $$("main section[id]");
    const onScrollActive = () => {
      let current = "home";
      sections.forEach((s) => {
        if (scrollY >= s.offsetTop - 180) current = s.id;
      });
      $$(".navlinks a").forEach((a) =>
        a.classList.toggle("active", (a as HTMLAnchorElement).hash === `#${current}`)
      );
    };
    addEventListener("scroll", onScrollActive, { passive: true });
    onScrollActive();
    cleanups.push(() => removeEventListener("scroll", onScrollActive));

    // Countdown to next Sunday 12PM
    function nextEvent() {
      const now = new Date();
      const target = new Date(now);
      target.setHours(12, 0, 0, 0);
      const add = (7 - now.getDay()) % 7;
      if (add === 0 && now >= target) target.setDate(target.getDate() + 7);
      else target.setDate(target.getDate() + add);
      return target;
    }
    function tick() {
      let n = Math.max(0, nextEvent().getTime() - Date.now());
      const d = Math.floor(n / 864e5);
      n %= 864e5;
      const h = Math.floor(n / 36e5);
      n %= 36e5;
      const m = Math.floor(n / 6e4);
      $$("[data-days]").forEach((x) => (x.textContent = String(d).padStart(2, "0")));
      $$("[data-hours]").forEach((x) => (x.textContent = String(h).padStart(2, "0")));
      $$("[data-minutes]").forEach(
        (x) => (x.textContent = String(m).padStart(2, "0"))
      );
    }
    tick();
    const countdownTimer = window.setInterval(tick, 30000);
    timers.push(countdownTimer);

    // Server panel + clipboard
    const editions: Record<string, { ip: string; port: string }> = {
      java: { ip: "me-01.diamondhost.online", port: "25568" },
      bedrock: { ip: "me-01.diamondhost.online", port: "25568" },
    };
    let edition = "java";

    function toast(msg: string) {
      const el = $(".toast");
      if (!el) return;
      el.textContent = msg;
      el.classList.add("show");
      window.clearTimeout((toast as unknown as { t?: number }).t);
      (toast as unknown as { t?: number }).t = window.setTimeout(
        () => el.classList.remove("show"),
        2300
      );
    }

    async function checkServerStatus() {
      const { ip, port } = editions[edition];
      const endpoint =
        (edition === "bedrock"
          ? "https://api.mcsrvstat.us/bedrock/3/"
          : "https://api.mcsrvstat.us/3/") + `${ip}:${port}`;
      $$("[data-status-label]").forEach((x) => (x.textContent = "CHECKING"));
      const started = performance.now();
      try {
        const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
        const ping = Math.round(performance.now() - started);
        if (!res.ok) throw new Error("status check failed");
        const json = await res.json();
        renderServerStatus(
          json.online === true,
          json.players?.online,
          ping,
          json.players?.max
        );
      } catch {
        renderServerStatus(false, null, null, null);
      }
    }
    function renderServerStatus(
      online: boolean,
      players: number | null | undefined,
      ping: number | null,
      max: number | null | undefined
    ) {
      $$("[data-status-dot]").forEach((x) => x.classList.toggle("offline", !online));
      $$("[data-status-label]").forEach(
        (x) => (x.textContent = online ? "ONLINE" : "OFFLINE")
      );
      $$("[data-server-count]").forEach(
        (x) => (x.textContent = online && players != null ? players.toLocaleString() : "—")
      );
      $$("[data-server-ping]").forEach(
        (x) => (x.textContent = online && ping != null ? `${ping}ms` : "—")
      );
      const pillText = $("[data-status-text]");
      if (pillText)
        pillText.textContent = online
          ? `Online${players != null ? ` • ${players.toLocaleString()} players` : ""}`
          : "Offline";
      const pill = $("[data-status-pill]");
      pill?.classList.toggle("offline", !online);

      const bar = $("[data-player-bar]");
      const fill = $("[data-player-bar-fill]");
      const label = $("[data-player-bar-label]");
      if (bar) {
        if (online && players != null && max) {
          bar.hidden = false;
          const pct = Math.min(100, Math.round((players / max) * 100));
          if (fill) {
            fill.style.width = `${pct}%`;
            fill.style.background =
              pct >= 90
                ? "linear-gradient(90deg,#ff9f43,#ff4d5e)"
                : "linear-gradient(90deg,var(--blue),var(--cyan))";
          }
          if (label) label.textContent = `${players.toLocaleString()} / ${max.toLocaleString()}`;
        } else {
          bar.hidden = true;
        }
      }
    }

    const editionButtons = $$("[data-edition]");
    const onEditionClick = (b: HTMLElement) => () => {
      edition = b.dataset.edition!;
      editionButtons.forEach((x) => x.classList.toggle("active", x === b));
      const ipEl = $("[data-ip]");
      const portEl = $("[data-port]");
      if (ipEl) ipEl.textContent = editions[edition].ip;
      if (portEl) portEl.textContent = editions[edition].port;
      checkServerStatus();
    };
    const editionHandlers: Array<[HTMLElement, () => void]> = [];
    editionButtons.forEach((b) => {
      const handler = onEditionClick(b);
      b.addEventListener("click", handler);
      editionHandlers.push([b, handler]);
    });
    cleanups.push(() =>
      editionHandlers.forEach(([b, h]) => b.removeEventListener("click", h))
    );

    const copyButtons = $$("[data-copy]");
    const onCopyClick = async () => {
      const value = `${editions[edition].ip}:${editions[edition].port}`;
      try {
        await navigator.clipboard.writeText(value);
        toast(`${edition.toUpperCase()} address copied: ${value}`);
      } catch {
        toast(`Server: ${value}`);
      }
    };
    copyButtons.forEach((b) => b.addEventListener("click", onCopyClick));
    cleanups.push(() =>
      copyButtons.forEach((b) => b.removeEventListener("click", onCopyClick))
    );

    checkServerStatus();
    const statusTimer = window.setInterval(checkServerStatus, 60000);
    timers.push(statusTimer);

    // Counters
    const countObs = new IntersectionObserver((es) =>
      es.forEach((e) => {
        const target = e.target as HTMLElement;
        if (!e.isIntersecting || target.dataset.done) return;
        target.dataset.done = "1";
        const end = +target.dataset.counter!;
        const start = performance.now();
        const dur = 1500;
        const prefix = target.dataset.prefix || "";
        function go(t: number) {
          const p = Math.min(1, (t - start) / dur);
          const v = Math.floor(end * (1 - Math.pow(1 - p, 3)));
          target.textContent = prefix + v.toLocaleString();
          if (p < 1) requestAnimationFrame(go);
          else target.textContent = prefix + end.toLocaleString();
        }
        requestAnimationFrame(go);
      })
    );
    $$("[data-counter]").forEach((el) => countObs.observe(el));
    cleanups.push(() => countObs.disconnect());

    // Live Discord widget
    const DISCORD_INVITE = "qnHJZddjTW";
    const statusColor: Record<string, string> = {
      online: "#41d992",
      idle: "#f0b23c",
      dnd: "#ff4d5e",
      streaming: "#a970ff",
    };
    function animateNumber(el: HTMLElement | null, end: number) {
      if (!el) return;
      const start = performance.now();
      const dur = 1200;
      const from = +(el.dataset.done ? el.textContent!.replace(/[^0-9]/g, "") : 0) || 0;
      function go(t: number) {
        const p = Math.min(1, (t - start) / dur);
        const v = Math.floor(from + (end - from) * (1 - Math.pow(1 - p, 3)));
        el!.textContent = v.toLocaleString();
        if (p < 1) requestAnimationFrame(go);
        else el!.textContent = end.toLocaleString();
      }
      el.dataset.done = "1";
      requestAnimationFrame(go);
    }
    interface DiscordMember {
      username?: string;
      status?: string;
      game?: { name?: string };
    }
    function renderOnlineList(members: DiscordMember[] | null) {
      const box = $("#onlineList");
      if (!box) return;
      if (!members || !members.length) {
        box.innerHTML =
          '<span><i style="background:#668f79"></i>Online list hidden <small>Enable "Server Widget" in Discord to show live members</small></span>';
        return;
      }
      box.innerHTML = members
        .slice(0, 8)
        .map((m) => {
          const activity = m.game?.name
            ? `Playing ${m.game.name}`
            : m.status === "dnd"
              ? "Do not disturb"
              : m.status === "idle"
                ? "Idle"
                : "Online now";
          const color = statusColor[m.status || "online"] || statusColor.online;
          const name = (m.username || "Member").replace(/</g, "&lt;");
          return `<span><i style="background:${color};box-shadow:0 0 8px ${color}"></i>${name} <small>${activity}</small></span>`;
        })
        .join("");
    }
    async function loadDiscordLive() {
      const memberStat = $("#statDiscordMembers");
      const widgetMembers = $("#widgetMemberCount");
      const widgetOnline = $("#widgetOnlineCount");
      const liveDot = $("#discordLiveDot");
      try {
        const inviteRes = await fetch(
          `https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true&with_expiration=true`
        );
        if (!inviteRes.ok) throw new Error("invite fetch failed");
        const invite = await inviteRes.json();
        const memberCount = invite.approximate_member_count ?? 0;
        const onlineCount = invite.approximate_presence_count ?? 0;
        if (memberStat) {
          memberStat.dataset.counter = String(memberCount);
          if (memberStat.dataset.done) animateNumber(memberStat, memberCount);
          else countObs.observe(memberStat);
        }
        animateNumber(widgetMembers, memberCount);
        animateNumber(widgetOnline, onlineCount);
        liveDot?.classList.remove("offline");
        const guildId = invite.guild?.id;
        if (guildId) {
          try {
            const widgetRes = await fetch(
              `https://discord.com/api/guilds/${guildId}/widget.json`
            );
            if (widgetRes.ok) {
              const widget = await widgetRes.json();
              renderOnlineList(widget.members);
            } else renderOnlineList(null);
          } catch {
            renderOnlineList(null);
          }
        } else renderOnlineList(null);
      } catch {
        liveDot?.classList.add("offline");
        const box = $("#onlineList");
        if (box)
          box.innerHTML =
            '<span><i style="background:#ff4d5e"></i>Live data unavailable <small>Join the Discord to see current members</small></span>';
      }
    }
    loadDiscordLive();
    const discordTimer = window.setInterval(loadDiscordLive, 60000);
    timers.push(discordTimer);

    // FAQ: one open at a time
    const faqDetails = $$(".faq details");
    const onToggle = (d: HTMLDetailsElement) => () => {
      if (d.open) faqDetails.forEach((x) => x !== d && ((x as HTMLDetailsElement).open = false));
    };
    const faqHandlers: Array<[HTMLDetailsElement, () => void]> = [];
    faqDetails.forEach((d) => {
      const el = d as HTMLDetailsElement;
      const handler = onToggle(el);
      el.addEventListener("toggle", handler);
      faqHandlers.push([el, handler]);
    });
    cleanups.push(() =>
      faqHandlers.forEach(([el, h]) => el.removeEventListener("toggle", h))
    );

    // Modal application forms
    const modal = $(".modal") as HTMLDialogElement | null;
    const body = $(".modal-body");
    type FormKind = "event" | "staff" | "developer" | "creator";
    const formData: Record<
      FormKind,
      { eyebrow: string; title: string; desc: string; role: string; type: string }
    > = {
      event: {
        eyebrow: "EVENT REGISTRATION",
        title: "SECURE YOUR SPOT",
        desc: "Register for The Last Crafter Standing. Confirmation will be sent through Discord.",
        role: "Minecraft username",
        type: "Event",
      },
      staff: {
        eyebrow: "PGC APPLICATIONS",
        title: "JOIN THE STAFF TEAM",
        desc: "Tell us how you can help make PGC safer, stronger and more fun.",
        role: "Preferred role",
        type: "Staff",
      },
      developer: {
        eyebrow: "PGC APPLICATIONS",
        title: "BUILD THE NETWORK",
        desc: "Show us the technical craft you want to bring to Warrior Network.",
        role: "Primary skill",
        type: "Developer",
      },
      creator: {
        eyebrow: "CREATOR PROGRAM",
        title: "CREATE WITH PGC",
        desc: "Apply for creator support, promotion and exclusive community access.",
        role: "Channel / platform",
        type: "Creator",
      },
    };

    function submitForm(e: SubmitEvent) {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const entries = Object.fromEntries(new FormData(form)) as Record<string, string>;
      const kind = form.dataset.kind!;

      const saved = JSON.parse(localStorage.getItem("pgc-submissions") || "[]");
      saved.push({ ...entries, type: kind, date: new Date().toISOString() });
      localStorage.setItem("pgc-submissions", JSON.stringify(saved));

      const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const original = btn?.textContent || "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }

      fetch("https://formsubmit.co/ajax/farhanbluetick@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New ${kind} application — PGC`,
          application_type: kind,
          name: entries.name,
          discord: entries.discord,
          role: entries.role,
          age: entries.age,
          message: entries.message,
        }),
      })
        .then((r) => {
          if (!r.ok) throw new Error("bad response");
          return r.json();
        })
        .then(() => {
          modal?.close();
          toast("Application received — welcome to the next level!");
        })
        .catch(() => {
          modal?.close();
          toast("Saved locally — email notification failed, we'll still review it.");
        })
        .finally(() => {
          if (btn) {
            btn.disabled = false;
            btn.textContent = original;
          }
        });
    }

    function openForm(kind: FormKind) {
      if (!body || !modal) return;
      const x = formData[kind];
      body.innerHTML = `<span class="kicker">${x.eyebrow}</span><h2>${x.title}</h2><p>${x.desc}</p><form data-kind="${x.type}"><label>FULL NAME<input name="name" required placeholder="Your name"></label><label>DISCORD USERNAME<input name="discord" required placeholder="username"></label><label>${x.role.toUpperCase()}<input name="role" required placeholder="Tell us here"></label><label>AGE<input name="age" required type="number" min="13" placeholder="13+"></label><label class="full">WHY PGC?<textarea name="message" required placeholder="A short, honest answer works best."></textarea></label><button class="btn btn-blue" type="submit">Submit ${x.type} application →</button></form>`;
      modal.showModal();
      body.querySelector("form")?.addEventListener("submit", submitForm as EventListener);
    }

    const modalTriggers = $$("[data-modal]");
    const onModalTrigger = (b: HTMLElement) => () => {
      const kind = b.dataset.modal;
      if (kind === "rules") {
        if (!body || !modal) return;
        body.innerHTML =
          '<span class="kicker">TOURNAMENT FORMAT</span><h2>EVENT RULES</h2><p>1. Minecraft 1.20+ only.<br>2. No hacked clients, macros or exploit abuse.<br>3. Teaming in solo events is prohibited.<br>4. Respect staff decisions and fellow players.<br>5. Join the event voice channel 15 minutes before start.</p><button class="btn btn-blue" data-register>Accept &amp; register →</button>';
        modal.showModal();
        const registerBtn = $("[data-register]", body);
        if (registerBtn) registerBtn.onclick = () => openForm("event");
      } else {
        openForm(kind as FormKind);
      }
    };
    const modalHandlers: Array<[HTMLElement, () => void]> = [];
    modalTriggers.forEach((b) => {
      const handler = onModalTrigger(b);
      b.addEventListener("click", handler);
      modalHandlers.push([b, handler]);
    });
    cleanups.push(() =>
      modalHandlers.forEach(([b, h]) => b.removeEventListener("click", h))
    );

    const modalClose = $(".modal-close", modal || undefined);
    const onModalClose = () => modal?.close();
    modalClose?.addEventListener("click", onModalClose);
    const onModalBackdrop = (e: MouseEvent) => {
      if (e.target === modal) modal?.close();
    };
    modal?.addEventListener("click", onModalBackdrop);
    cleanups.push(() => {
      modalClose?.removeEventListener("click", onModalClose);
      modal?.removeEventListener("click", onModalBackdrop);
    });

    // Gallery filters + lightbox
    const filterButtons = $$("[data-filter]");
    const onFilterClick = (b: HTMLElement) => () => {
      filterButtons.forEach((x) => x.classList.toggle("active", x === b));
      $$(".gallery-item").forEach(
        (x) => (x.hidden = !(b.dataset.filter === "all" || x.dataset.type === b.dataset.filter))
      );
    };
    const filterHandlers: Array<[HTMLElement, () => void]> = [];
    filterButtons.forEach((b) => {
      const handler = onFilterClick(b);
      b.addEventListener("click", handler);
      filterHandlers.push([b, handler]);
    });
    cleanups.push(() =>
      filterHandlers.forEach(([b, h]) => b.removeEventListener("click", h))
    );

    const lightbox = $(".lightbox") as HTMLDialogElement | null;
    const lightboxImage = lightbox?.querySelector<HTMLElement>(".lightbox-image");
    let galleryIndex = 0;
    function visibleGalleryItems() {
      return $$(".gallery-item").filter((x) => !x.hidden);
    }
    function showLightbox(i: number) {
      const items = visibleGalleryItems();
      if (!items.length || !lightbox || !lightboxImage) return;
      galleryIndex = (i + items.length) % items.length;
      const item = items[galleryIndex];
      const img = item.querySelector("img");
      lightboxImage.innerHTML = img ? `<img src="${img.src}" alt="${img.alt || ""}">` : "";
      const h3 = lightbox.querySelector("h3");
      const span = item.querySelector("span");
      if (h3 && span) h3.textContent = span.textContent?.trim() || "";
      lightbox.showModal();
    }
    const galleryItems = $$(".gallery-item");
    const galleryHandlers: Array<[HTMLElement, () => void]> = [];
    galleryItems.forEach((item) => {
      const handler = () => showLightbox(visibleGalleryItems().indexOf(item));
      item.addEventListener("click", handler);
      galleryHandlers.push([item, handler]);
    });
    cleanups.push(() =>
      galleryHandlers.forEach(([el, h]) => el.removeEventListener("click", h))
    );

    let lightboxNav: HTMLDivElement | null = null;
    let onPrev: (() => void) | null = null;
    let onNext: (() => void) | null = null;
    if (lightbox && !lightbox.querySelector(".lightbox-nav")) {
      lightboxNav = document.createElement("div");
      lightboxNav.className = "lightbox-nav";
      lightboxNav.innerHTML =
        '<button aria-label="Previous image" data-lb-prev>‹</button><button aria-label="Next image" data-lb-next>›</button>';
      lightbox.appendChild(lightboxNav);
      onPrev = () => showLightbox(galleryIndex - 1);
      onNext = () => showLightbox(galleryIndex + 1);
      lightboxNav.querySelector("[data-lb-prev]")?.addEventListener("click", onPrev);
      lightboxNav.querySelector("[data-lb-next]")?.addEventListener("click", onNext);
    }
    const onLightboxKeydown = (e: KeyboardEvent) => {
      if (lightbox?.open) {
        if (e.key === "ArrowLeft") showLightbox(galleryIndex - 1);
        if (e.key === "ArrowRight") showLightbox(galleryIndex + 1);
      }
    };
    addEventListener("keydown", onLightboxKeydown);
    const lightboxClose = lightbox?.querySelector(".modal-close");
    const onLightboxClose = () => lightbox?.close();
    lightboxClose?.addEventListener("click", onLightboxClose);
    const onLightboxBackdrop = (e: MouseEvent) => {
      if (e.target === lightbox) lightbox?.close();
    };
    lightbox?.addEventListener("click", onLightboxBackdrop);
    cleanups.push(() => {
      removeEventListener("keydown", onLightboxKeydown);
      lightboxClose?.removeEventListener("click", onLightboxClose);
      lightbox?.removeEventListener("click", onLightboxBackdrop);
      if (lightboxNav) {
        if (onPrev) lightboxNav.querySelector("[data-lb-prev]")?.removeEventListener("click", onPrev);
        if (onNext) lightboxNav.querySelector("[data-lb-next]")?.removeEventListener("click", onNext);
      }
    });

    // Site search
    const search = $(".search-overlay");
    const searchInput = $("#site-search") as HTMLInputElement | null;
    const results = $(".search-results");
    function toggleSearch(open: boolean) {
      search?.classList.toggle("open", open);
      search?.setAttribute("aria-hidden", String(!open));
      if (open) setTimeout(() => searchInput?.focus(), 200);
    }
    const searchToggleBtn = $(".search-toggle");
    const onSearchOpen = () => toggleSearch(true);
    searchToggleBtn?.addEventListener("click", onSearchOpen);
    const searchCloseBtn = $(".search-close");
    const onSearchClose = () => toggleSearch(false);
    searchCloseBtn?.addEventListener("click", onSearchClose);
    const onSearchKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleSearch(false);
      if (e.key === "/" && !/input|textarea/i.test((document.activeElement?.tagName || ""))) {
        e.preventDefault();
        toggleSearch(true);
      }
    };
    addEventListener("keydown", onSearchKeydown);
    const pages: Array<[string, string, string]> = [
      ["Events", "Sunday Tournament, prizes and registration", "#event"],
      ["Warrior Lifesteal SMP", "Java and Bedrock server details", "#server"],
      ["Applications", "Staff, developer and creator programs", "#applications"],
      ["Gallery", "Builds and community moments", "#gallery"],
      ["Support", "Frequently asked questions", "#faq"],
      ["Discord", "Join the PGC Discord community", "#discord"],
    ];
    const onSearchInput = () => {
      if (!searchInput || !results) return;
      const q = searchInput.value.toLowerCase().trim();
      const found = q ? pages.filter((x) => x.join(" ").toLowerCase().includes(q)) : [];
      results.innerHTML = found.length
        ? found.map((x) => `<a href="${x[2]}"><b>${x[0]}</b> — ${x[1]}</a>`).join("<br><br>")
        : q
          ? "No matches yet. Try “server” or “applications”."
          : "Press / anywhere to search quickly.";
      $$("a", results).forEach((a) => (a.onclick = () => toggleSearch(false)));
    };
    searchInput?.addEventListener("input", onSearchInput);
    onSearchInput();
    cleanups.push(() => {
      searchToggleBtn?.removeEventListener("click", onSearchOpen);
      searchCloseBtn?.removeEventListener("click", onSearchClose);
      removeEventListener("keydown", onSearchKeydown);
      searchInput?.removeEventListener("input", onSearchInput);
    });

    return () => {
      timers.forEach((t) => clearInterval(t));
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
