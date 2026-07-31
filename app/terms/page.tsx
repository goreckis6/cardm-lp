import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing access to and use of Cardiom.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="subpage-main">
        <section className="subpage-hero legal-hero">
          <div className="shell">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              LEGAL / TERMS
            </div>
            <h1>Clear expectations for a wellness product.</h1>
            <p>
              These terms explain what Cardiom provides, what it does not
              provide and the responsibilities that keep accounts secure.
            </p>
          </div>
        </section>
        <section className="legal-page">
          <div className="shell legal-layout">
            <aside className="legal-aside">
              <strong>Effective date</strong>
              <span>July 31, 2026</span>
              <strong style={{ marginTop: 26 }}>Questions</strong>
              <span>legal@cardiom.app</span>
            </aside>
            <article className="legal-content">
              <div className="legal-note">
                <p>
                  Cardiom provides wellness information only. It is not a
                  medical device, diagnostic service or substitute for a
                  clinician, emergency service or validated medical equipment.
                </p>
              </div>

              <h2>1. Accepting these terms</h2>
              <p>
                By creating an account or using Cardiom, you agree to these
                terms and the Privacy Policy. If you do not agree, do not use
                the service.
              </p>

              <h2>2. Wellness use only</h2>
              <p>
                Camera heart-rate, HRV-related values, stress patterns, heart
                age and other context shown by Cardiom are intended for
                personal awareness. Do not use Cardiom to diagnose a condition,
                change treatment, adjust medication or delay professional care.
                Contact local emergency services when urgent help may be
                needed.
              </p>

              <h2>3. Manual readings</h2>
              <p>
                Blood pressure, blood oxygen and glucose values are entered
                manually or obtained from another source. You are responsible
                for entering them accurately and using an appropriate,
                maintained device.
              </p>

              <h2>4. Your account</h2>
              <p>
                You are responsible for maintaining control of your Apple
                account and device, for the information saved to Cardiom and
                for notifying us if you believe your Cardiom account has been
                compromised.
              </p>

              <h2>5. Acceptable use</h2>
              <ul>
                <li>Do not interfere with or reverse engineer the service.</li>
                <li>Do not attempt to access another person’s data.</li>
                <li>Do not upload unlawful, harmful or deceptive content.</li>
                <li>
                  Do not use Cardiom to provide unlicensed medical services.
                </li>
              </ul>

              <h2>6. Subscriptions</h2>
              <p>
                Paid features, prices, trial terms, renewals and cancellation
                options will be shown through the App Store before purchase.
                App Store billing and refund rules may also apply.
              </p>

              <h2>7. Availability and changes</h2>
              <p>
                We may improve, replace or discontinue features. Service can be
                interrupted by maintenance, network conditions, device
                limitations or external providers. We aim to communicate
                meaningful changes clearly.
              </p>

              <h2>8. Intellectual property</h2>
              <p>
                Cardiom, its visual identity, software, content and product
                design are protected by applicable intellectual property laws.
                These terms grant a limited, personal, non-transferable right
                to use the service.
              </p>

              <h2>9. Liability</h2>
              <p>
                To the extent permitted by law, Cardiom is provided without
                guarantees that every reading will be available, accurate or
                suitable for a particular purpose. Nothing in these terms
                limits rights or liabilities that cannot legally be limited.
              </p>

              <h2>10. Ending use</h2>
              <p>
                You may stop using Cardiom and request deletion of your account.
                We may suspend access for serious misuse, security risk or a
                legal requirement.
              </p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
