import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "../components/FaqList";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with Cardiom measurements, accounts, privacy and wellness reports.",
};

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="subpage-main">
        <section className="subpage-hero">
          <div className="shell">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              CARDIOM SUPPORT
            </div>
            <h1>Helpful answers, without the runaround.</h1>
            <p>
              Find guidance for cleaner check-ins, account access, privacy and
              understanding what Cardiom shows.
            </p>
          </div>
        </section>
        <section className="support-page">
          <div className="shell support-layout">
            <div className="support-card">
              <span className="section-index">CONTACT</span>
              <h2>Need a person?</h2>
              <p>
                Tell us your iPhone model, iOS version and what happened. Never
                include sensitive health information in a support email.
              </p>
              <a
                className="button button-primary"
                href="mailto:support@cardiom.app?subject=Cardiom%20support"
              >
                Contact support ↗
              </a>
            </div>
            <div className="support-links">
              <Link className="support-link" href="/#how-it-works">
                Better camera check-ins <span>↗</span>
              </Link>
              <Link className="support-link" href="/privacy">
                Privacy and data controls <span>↗</span>
              </Link>
              <Link className="support-link" href="/terms">
                Wellness and safety guidance <span>↗</span>
              </Link>
              <Link className="support-link" href="/blog">
                Cardiom Journal <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="shell" style={{ marginTop: 90 }}>
            <div className="section-heading">
              <div>
                <span className="section-index">COMMON QUESTIONS</span>
                <h2>Start here.</h2>
              </div>
            </div>
            <FaqList />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
