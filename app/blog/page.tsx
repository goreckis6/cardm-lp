import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Clear, practical articles about personal baselines, camera check-ins and reading wellness patterns.",
};

const stories = [
  {
    tag: "FOUNDATIONS",
    title: "Why your personal baseline matters more than one number",
    copy: "A single reading is a moment. A consistent routine is where useful context begins.",
    href: "/blog/why-baselines-beat-snapshots",
    tone: "article-blue",
  },
  {
    tag: "HRV, SIMPLIFIED",
    title: "Reading HRV without overthinking it",
    copy: "SDNN, RMSSD and pNN50 explained in language that belongs in real life.",
    href: "/blog/reading-hrv-without-overthinking-it",
    tone: "article-red",
  },
  {
    tag: "BETTER CHECK-INS",
    title: "How to make camera measurements more repeatable",
    copy: "Light, position and timing: three small choices that make a cleaner routine.",
    href: "/blog/making-camera-check-ins-repeatable",
    tone: "article-ink",
  },
  {
    tag: "ROUTINES",
    title: "The quiet value of checking in at the same time",
    copy: "Consistency removes noise and makes your personal context easier to read.",
    href: "/blog/why-baselines-beat-snapshots",
    tone: "article-ink",
  },
  {
    tag: "PRIVACY",
    title: "What privacy-first wellness design should feel like",
    copy: "Clear consent, visible sync states and controls that do not require a manual.",
    href: "/privacy",
    tone: "article-blue",
  },
  {
    tag: "CONTEXT",
    title: "A number is not a verdict",
    copy: "Why Cardiom pairs signals with context instead of medical conclusions.",
    href: "/blog/reading-hrv-without-overthinking-it",
    tone: "article-red",
  },
];

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="subpage-main">
        <section className="subpage-hero">
          <div className="shell">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              THE CARDIOM JOURNAL
            </div>
            <h1>Better context begins with better questions.</h1>
            <p>
              Clear ideas for building a calmer measurement routine,
              understanding personal patterns and staying grounded around
              health data.
            </p>
          </div>
        </section>
        <div className="shell blog-grid">
          {stories.map((story, index) => (
            <Link
              className={`article-card ${story.tone}`}
              href={story.href}
              key={`${story.title}-${index}`}
            >
              <span className="article-tag">{story.tag}</span>
              <div>
                <h3>{story.title}</h3>
                <p>{story.copy}</p>
              </div>
              <span className="article-arrow">↗</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
