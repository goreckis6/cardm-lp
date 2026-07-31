"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-surface="dark"]'),
    );
    if (!sections.length) return;

    let frame = 0;
    const sample = () => {
      frame = 0;
      const line = 52;
      setOnDark(
        sections.some((section) => {
          const box = section.getBoundingClientRect();
          return box.top <= line && box.bottom >= line;
        }),
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header className={onDark ? "site-header site-header-dark" : "site-header"}>
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Cardiom home">
          <Image
            src="/brand/app-icon-128.png"
            alt=""
            width={48}
            height={48}
            priority
          />
          <span>Cardiom</span>
        </Link>
        <nav className={open ? "nav-links nav-links-open" : "nav-links"}>
          {nav.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            className="header-cta mobile-header-cta"
            href="/#download"
            onClick={() => setOpen(false)}
          >
            Get the app <span>↗</span>
          </Link>
        </nav>
        <Link className="header-cta desktop-header-cta" href="/#download">
          Get the app <span>↗</span>
        </Link>
        <button
          className={open ? "menu-button menu-button-open" : "menu-button"}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
