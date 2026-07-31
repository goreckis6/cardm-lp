import Image from "next/image";
import Link from "next/link";
import { FaqList } from "./components/FaqList";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const features = [
  {
    index: "01",
    kicker: "CAMERA CHECK-INS",
    title: "A calm check-in, right from your iPhone.",
    copy: "Choose fingertip PPG with the rear camera and flash, or a contactless Face rPPG check-in. Cardiom guides the session and only keeps results that pass its quality checks.",
    className: "feature-card feature-card-wide feature-card-blue",
    visual: (
      <div className="signal-window" aria-hidden="true">
        <div className="signal-window-top">
          <span>LIVE SIGNAL</span>
          <span className="signal-live-dot" />
        </div>
        <div className="signal-number">
          78 <small>BPM</small>
        </div>
        <div className="mini-wave">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="signal-progress">
          <span />
        </div>
      </div>
    ),
  },
  {
    index: "02",
    kicker: "PERSONAL BASELINE",
    title: "Your range, not a generic average.",
    copy: "Build a personal reference from consistent check-ins, then follow change across 7 days to 1 year.",
    className: "feature-card feature-card-light",
    visual: (
      <div className="baseline-visual" aria-hidden="true">
        <div className="baseline-orbit">
          <span>12</span>
          <small>CHECK-INS</small>
        </div>
        <div>
          <strong>Baseline ready</strong>
          <p>Personal range unlocked</p>
        </div>
      </div>
    ),
  },
  {
    index: "03",
    kicker: "SIGNAL CONTEXT",
    title: "HRV and longer-term patterns, made readable.",
    copy: "See available SDNN, RMSSD, pNN50, heart age and the 7-day Stress Index with clear explanations beside every metric.",
    className: "feature-card feature-card-dark",
    visual: (
      <div className="metric-cloud" aria-hidden="true">
        <span>
          <small>HRV</small>
          42 ms
        </span>
        <span>
          <small>RMSSD</small>
          38 ms
        </span>
        <span>
          <small>pNN50</small>
          18%
        </span>
      </div>
    ),
  },
  {
    index: "04",
    kicker: "DAILY JOURNAL",
    title: "The readings you already take, finally together.",
    copy: "Log blood pressure, blood oxygen and glucose manually. Add context, find a date, and keep the story of your routine in one place.",
    className: "feature-card feature-card-wide feature-card-coral",
    visual: (
      <div className="journal-visual" aria-hidden="true">
        <div>
          <small>BLOOD PRESSURE</small>
          <strong>
            120/80 <em>mmHg</em>
          </strong>
        </div>
        <div className="journal-line" />
        <div className="journal-stats">
          <span>
            <small>OXYGEN</small>98%
          </span>
          <span>
            <small>GLUCOSE</small>92
          </span>
          <span className="status-normal">IN RANGE</span>
        </div>
      </div>
    ),
  },
];

const steps = [
  {
    n: "01",
    title: "Choose your check-in",
    copy: "Use a fingertip or your face. Cardiom prepares the camera and guides your position.",
  },
  {
    n: "02",
    title: "Stay still for the signal",
    copy: "The progress begins only when the signal is usable and never runs longer than 30 seconds.",
  },
  {
    n: "03",
    title: "See the pattern grow",
    copy: "Save the result, add context and return over time to reveal your personal range.",
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
    tone: "article-red",
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
                Camera-based heart-rate check-ins, thoughtful wellness context
                and your daily health journal — designed to feel calm, private
                and beautifully clear.
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
                <span>● Private by design</span>
                <span>● No wearable required</span>
                <span>● Built for iPhone</span>
              </div>
            </div>

            <div className="hero-product" aria-label="Cardiom app preview">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-promo-stage">
                <div className="hero-promo-kicker">
                  <span>See your</span>
                  <strong>Heart Pattern</strong>
                </div>
                <div className="hero-promo-body">
                  <div className="hero-promo-peek" aria-hidden="true">
                    <Image
                      src="/brand/ppg-peek.png"
                      alt=""
                      width={560}
                      height={900}
                    />
                  </div>
                  <div className="phone-stage-hero">
                    <Image
                      src="/brand/app-dashboard-hero.jpg"
                      alt="Cardiom home dashboard with Health Check and Measure now"
                      width={860}
                      height={1600}
                      priority
                    />
                  </div>
                </div>
                <div className="hero-promo-foot">
                  Camera PPG · No wearable needed
                </div>
              </div>
            </div>
          </div>
          <div className="shell hero-proof">
            <span>One calm place for</span>
            <strong>Heart rate</strong>
            <i />
            <strong>HRV context</strong>
            <i />
            <strong>Manual logs</strong>
            <i />
            <strong>Weekly patterns</strong>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="section-index">01 / FEATURES</span>
                <h2>Health context that feels human.</h2>
              </div>
              <p>
                Cardiom turns a growing set of personal signals into a clear
                daily experience — without turning every number into an alarm.
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article className={feature.className} key={feature.index}>
                  <div className="feature-copy">
                    <div className="feature-kicker">
                      <span>{feature.index}</span>
                      {feature.kicker}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.copy}</p>
                  </div>
                  {feature.visual}
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
                <h2>Thirty seconds. Then the bigger picture.</h2>
              </div>
              <p>
                The interface does the explaining as you go. No setup maze, no
                dashboard overload.
              </p>
            </div>
            <div className="process-layout">
              <div className="process-visual process-visual-phone">
                <Image
                  src="/brand/app-dashboard.jpg"
                  alt="Cardiom home dashboard with Health Check, pulse trend and Measure now"
                  width={860}
                  height={1740}
                />
                <div className="process-live">
                  <span className="live-pulse" />
                  <small>CHECK-IN READY</small>
                  <strong>Place your fingertip</strong>
                </div>
              </div>
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
            </div>
          </div>
        </section>

        <section className="section insight-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="section-index">03 / YOUR PATTERNS</span>
                <h2>Not more data. Better orientation.</h2>
              </div>
              <p>
                Cardiom makes room for today’s result and the gradual patterns
                that only become visible with consistency.
              </p>
            </div>
            <div className="insight-showcase">
              <div className="insight-main-card">
                <div className="insight-card-header">
                  <div>
                    <small>7-DAY STRESS INDEX</small>
                    <h3>Your longer-term pattern</h3>
                  </div>
                  <span className="info-chip">i</span>
                </div>
                <div className="insight-value-row">
                  <div>
                    <strong>34</strong>
                    <span>/100</span>
                    <p>Lower recent load</p>
                  </div>
                  <div className="line-chart" aria-hidden="true">
                    <div className="chart-grid-lines" />
                    <div className="chart-path">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
                <div className="insight-metrics">
                  <span>
                    <small>HRV</small>
                    <strong>42 ms</strong>
                  </span>
                  <span>
                    <small>ENERGY</small>
                    <strong>78</strong>
                  </span>
                  <span>
                    <small>HEART AGE</small>
                    <strong>31 yrs</strong>
                  </span>
                </div>
              </div>
              <div className="insight-side">
                <div className="insight-side-card">
                  <span className="side-card-icon">↔</span>
                  <small>COMPARE METHODS</small>
                  <strong>Finger + Face</strong>
                  <p>Filter every chart by how the check-in was captured.</p>
                </div>
                <div className="insight-side-card insight-side-dark">
                  <span className="side-card-icon">↗</span>
                  <small>SHARE A REPORT</small>
                  <strong>Your story, ready to take with you.</strong>
                  <p>Create a clear PDF from a selected date range.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section privacy-section">
          <div className="shell privacy-layout">
            <div className="privacy-copy">
              <span className="section-index">04 / PRIVACY</span>
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
                <span className="section-index">05 / PRICING</span>
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
                  <li>Camera heart-rate check-ins</li>
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
              <span className="section-index">06 / FAQ</span>
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
                <span className="section-index">07 / FROM THE JOURNAL</span>
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
