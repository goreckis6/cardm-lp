import Image from "next/image";
import Link from "next/link";
import { FaqList } from "./components/FaqList";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const features = [
  {
    index: "01",
    kicker: "CAMERA HEART RATE",
    title: "Measure your heart rate without a wearable.",
    copy: "Use Finger PPG with the rear camera and flash, or choose a contactless Face rPPG check-in with the front camera.",
    tags: ["Finger PPG", "Face rPPG", "Instant result"],
  },
  {
    index: "02",
    kicker: "HEALTH JOURNAL",
    title: "Keep your vital readings together.",
    copy: "Manually log readings from trusted devices and follow them alongside your pulse history in one private journal.",
    tags: ["Blood pressure", "Blood oxygen", "Glucose"],
  },
  {
    index: "03",
    kicker: "STRESS & HEART AGE",
    title: "See more context behind the numbers.",
    copy: "Explore longer-term stress patterns, available HRV metrics, energy context and your estimated heart age.",
    tags: ["Stress Index", "Heart age", "HRV & energy"],
  },
  {
    index: "04",
    kicker: "TAGS & CONTEXT",
    title: "Connect each reading with your day.",
    copy: "Add tags to measurements and manual entries, then filter your history to spot patterns around daily habits.",
    tags: ["Sleep", "Stress", "Activity"],
  },
  {
    index: "05",
    kicker: "TRENDS & REPORTS",
    title: "Turn your history into a useful summary.",
    copy: "Review changes over time and create a PDF report from a selected date range to take to a medical appointment.",
    tags: ["7 days–1 year", "PDF export", "Shareable"],
  },
  {
    index: "06",
    kicker: "SMART REMINDERS",
    title: "Build a routine you can maintain.",
    copy: "Set custom reminders for check-ins or manual logs so consistent tracking fits naturally into your day.",
    tags: ["Custom schedule", "Check-in routine", "On your terms"],
  },
];

const steps = [
  {
    n: "01",
    title: "Pick Finger PPG or Face rPPG",
    copy: "Finger PPG: rest a fingertip gently over the rear camera and flash. Face rPPG: hold the phone so your face is in frame — no contact needed — and Cardiom reads subtle skin-colour changes from the pulse.",
  },
  {
    n: "02",
    title: "Follow the on-screen guide",
    copy: "Cardiom prepares the right camera, shows placement cues and waits for a clean signal. Progress starts only when the reading looks usable.",
  },
  {
    n: "03",
    title: "Stay still for up to 30 seconds",
    copy: "Keep still in steady light. Sessions never run longer than 30 seconds. Soft light in front of you helps Face rPPG; a relaxed fingertip helps Finger PPG.",
  },
  {
    n: "04",
    title: "Save the result and watch your pattern",
    copy: "Cardiom labels which method you used, so Finger and Face trends stay comparable. Add context, build your baseline and return over days and weeks.",
  },
];

const articles = [
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
    tone: "article-teal",
  },
  {
    tag: "BETTER CHECK-INS",
    title: "How to make camera measurements more repeatable",
    copy: "Light, position and timing: three small choices that make a cleaner routine.",
    href: "/blog/making-camera-check-ins-repeatable",
    tone: "article-ink",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="top">
          <div className="hero-aura hero-aura-one" />
          <div className="hero-aura hero-aura-two" />
          <div className="hero-grid" />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                WELLNESS, MADE PERSONAL
              </div>
              <h1>
                Your heart has a pattern.
                <span>Cardiom helps you see it.</span>
              </h1>
              <p className="hero-lead">
                Measure your pulse with Finger PPG (rear camera + flash) or
                contactless Face rPPG (front-camera face scan) — then keep the
                context in a private daily journal, without a wearable.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="#download">
                  <span className="button-heart">♥</span>
                  Get the app
                  <span className="button-arrow">↗</span>
                </Link>
                <Link className="button button-quiet" href="#how-it-works">
                  See how it works
                </Link>
              </div>
              <div className="trust-row">
                <span>Private by design</span>
                <span>No wearable required</span>
                <span>Built for iPhone</span>
              </div>
            </div>

            <div className="hero-product" aria-label="Cardiom app preview">
              <div className="hero-promo-live">
                <span className="hero-promo-pulse" aria-hidden="true" />
                <span className="hero-promo-pulse hero-promo-pulse-delay" aria-hidden="true" />
                <div className="hero-promo-frame">
                  <Image
                    src="/brand/generated/hero-promo-v3-rppg-v2.jpg"
                    alt="Cardiom Finger PPG and contactless Face rPPG check-ins with the iPhone dashboard"
                    width={900}
                    height={1600}
                    priority
                    sizes="(max-width: 760px) 78vw, (max-width: 1100px) 42vw, 400px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="shell hero-proof" aria-label="Product focus areas">
            <span className="hero-proof-label">One calm place for</span>
            <ul className="hero-proof-list">
              <li>Heart rate</li>
              <li>HRV context</li>
              <li>Manual logs</li>
              <li>Weekly patterns</li>
            </ul>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="section-index">WHAT YOU CAN DO WITH CARDIOM</span>
                <h2>More than a pulse check.</h2>
              </div>
              <p>
                Measure heart rate, organize manual vital readings, understand
                longer-term patterns and build a consistent routine.
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article
                  className="feature-card feature-card-compact"
                  key={feature.index}
                >
                  <div className="feature-copy">
                    <div className="feature-kicker">
                      <span>{feature.index}</span>
                      {feature.kicker}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.copy}</p>
                  </div>
                  <div className="feature-tags" aria-hidden="true">
                    {feature.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="how-it-works">
          <div className="shell">
            <div className="section-heading section-heading-light">
              <div>
                <span className="section-index">02 / HOW IT WORKS</span>
                <h2>Two camera methods. One clear routine.</h2>
              </div>
              <p>
                Cardiom estimates pulse from your iPhone cameras: Finger PPG
                through the fingertip, or Face rPPG by scanning your face.
                Guided, short, and only saved when the signal quality is good.
              </p>
            </div>
            <div className="process-layout">
              <ol className="process-list">
                {steps.map((step) => (
                  <li key={step.n}>
                    <span className="step-number">{step.n}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="process-visual process-visual-phone">
                <Image
                  src="/brand/app-dashboard-hero.jpg"
                  alt="Cardiom home dashboard with Health Check, pulse trend and Measure now"
                  width={860}
                  height={1600}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section privacy-section">
          <div className="shell privacy-layout">
            <div className="privacy-copy">
              <span className="section-index">03 / PRIVACY</span>
              <h2>Your health story should belong to you.</h2>
              <p>
                Cardiom is designed around clear consent, secure sign-in and
                controls that make your data understandable and removable.
                Privacy is part of the product experience — not a page hidden
                at the bottom.
              </p>
              <Link className="text-link text-link-light" href="/privacy">
                Read our privacy approach <span>↗</span>
              </Link>
            </div>
            <div className="privacy-stack">
              <div className="privacy-card privacy-card-main">
                <div className="privacy-lock">●</div>
                <div>
                  <small>PRIVATE SYNC</small>
                  <strong>Available across your devices.</strong>
                  <p>
                    Your account protects access while Cardiom keeps local and
                    synced changes understandable.
                  </p>
                </div>
              </div>
              <div className="privacy-mini-grid">
                <div className="privacy-card">
                  <small>CONTROL</small>
                  <strong>Delete your data</strong>
                </div>
                <div className="privacy-card">
                  <small>TRANSPARENCY</small>
                  <strong>No hidden health claims</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="section-index">04 / PRICING</span>
                <h2>Start simply. Grow into your patterns.</h2>
              </div>
              <p>
                Clear access, no surprise tiers. Final regional pricing will
                always be shown before you subscribe in the App Store.
              </p>
            </div>
            <div className="pricing-grid">
              <article className="pricing-card">
                <div className="pricing-top">
                  <span className="pricing-label">CARDIOM</span>
                  <h3>Start your routine</h3>
                  <p>Core check-ins and a private daily journal.</p>
                </div>
                <div className="price">
                  <strong>Free</strong>
                  <span>to begin</span>
                </div>
                <ul>
                  <li>Finger PPG & Face rPPG pulse check-ins</li>
                  <li>Manual health journal</li>
                  <li>Personal baseline progress</li>
                  <li>Secure account sync</li>
                </ul>
                <Link className="button button-outline" href="#download">
                  Get Cardiom
                </Link>
              </article>
              <article className="pricing-card pricing-card-featured">
                <div className="pricing-badge">EARLY ACCESS</div>
                <div className="pricing-top">
                  <span className="pricing-label">CARDIOM+</span>
                  <h3>See the longer view</h3>
                  <p>Deeper trends and reports for a consistent routine.</p>
                </div>
                <div className="price">
                  <strong>Plus</strong>
                  <span>pricing at launch</span>
                </div>
                <ul>
                  <li>Everything in Cardiom</li>
                  <li>7D–1Y personal trend ranges</li>
                  <li>Weekly and stress-pattern context</li>
                  <li>PDF wellness reports</li>
                </ul>
                <Link className="button button-primary" href="#download">
                  Join early access
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="shell faq-layout">
            <div className="faq-intro">
              <span className="section-index">05 / FAQ</span>
              <h2>The important questions, answered clearly.</h2>
              <p>
                Still curious? The Cardiom support area will grow alongside the
                app.
              </p>
              <Link className="text-link" href="/support">
                Visit support <span>↗</span>
              </Link>
            </div>
            <FaqList />
          </div>
        </section>

        <section className="section journal-section" id="blog">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="section-index">06 / FROM THE JOURNAL</span>
                <h2>Small ideas for a steadier routine.</h2>
              </div>
              <Link className="text-link" href="/blog">
                Browse all stories <span>↗</span>
              </Link>
            </div>
            <div className="article-grid">
              {articles.map((article) => (
                <Link
                  className={`article-card ${article.tone}`}
                  href={article.href}
                  key={article.href}
                >
                  <span className="article-tag">{article.tag}</span>
                  <div>
                    <h3>{article.title}</h3>
                    <p>{article.copy}</p>
                  </div>
                  <span className="article-arrow">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="download-section" id="download">
          <div className="shell download-card">
            <div className="download-glow" />
            <div className="download-copy">
              <span className="section-index">CARDIOM FOR IPHONE</span>
              <h2>Make one minute feel meaningful.</h2>
              <p>
                Be first to know when Cardiom opens on the App Store. Early
                access starts with iPhone.
              </p>
              <a
                className="store-badge"
                href="mailto:hello@cardiom.app?subject=Cardiom%20early%20access"
              >
                <span className="store-mark">●</span>
                <span>
                  <small>JOIN THE</small>
                  <strong>Early access list</strong>
                </span>
              </a>
              <small className="download-note">
                Wellness information only. Cardiom is not a medical device.
              </small>
            </div>
            <div className="download-icon">
              <Image
                src="/brand/app-icon.png"
                alt="Cardiom app icon"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
