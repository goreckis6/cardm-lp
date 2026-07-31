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

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Cardiom home">
          <Image
            src="/brand/app-icon.png"
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
