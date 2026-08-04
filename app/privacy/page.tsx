import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cardiom handles account, wellness and measurement data.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="subpage-main">
        <section className="subpage-hero legal-hero">
          <div className="shell">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              LEGAL / PRIVACY
            </div>
            <h1>Privacy should be understandable.</h1>
            <p>
              This policy explains what Cardiom processes, why it is needed,
              where your choices live and how to ask for deletion.
            </p>
          </div>
        </section>
        <section className="legal-page">
          <div className="shell legal-layout">
            <aside className="legal-aside">
              <strong>Effective date</strong>
              <span>July 31, 2026</span>
              <strong style={{ marginTop: 26 }}>Contact</strong>
              <span>
                <a href="mailto:policy@cardiom.app">policy@cardiom.app</a>
              </span>
            </aside>
            <article className="legal-content">
              <div className="legal-note">
                <p>
                  Cardiom is a wellness service, not a medical device. Health
                  information can be sensitive, so our product is designed to
                  collect only what supports the features you choose.
                </p>
              </div>

              <h2>1. Information you provide</h2>
              <p>
                We process account details needed for sign-in, wellness
                readings you save, tags and notes you add, preferences,
                reminders and support messages you choose to send. Sign in
                with Apple may provide a private relay email instead of your
                personal email address.
              </p>

              <h2>2. Camera check-ins</h2>
              <p>
                Fingertip check-ins process a light waveform from the camera
                and do not store raw camera frames as a saved health record.
                Contactless face check-ins may create a temporary clip for
                secure processing. Cardiom is designed to remove that temporary
                media after the requested analysis completes and save only the
                selected results associated with your account.
              </p>

              <h2>3. Why information is processed</h2>
              <ul>
                <li>To authenticate you and secure access to Cardiom.</li>
                <li>To save and synchronise your selected wellness records.</li>
                <li>To generate trends, reports and app features you request.</li>
                <li>To diagnose reliability, security and support issues.</li>
                <li>To meet legal obligations and prevent abuse.</li>
              </ul>

              <h2>4. Service providers</h2>
              <p>
                Cardiom uses carefully selected infrastructure providers for
                authentication, secure database storage, processing and service
                delivery. They process information under contractual and
                technical restrictions appropriate to their role. We do not
                sell personal health information.
              </p>

              <h2>5. Storage and retention</h2>
              <p>
                Saved readings remain available until you delete individual
                entries, reset your Cardiom data or request account deletion,
                subject to limited backups, fraud prevention and legal
                retention requirements. Temporary report files and processing
                media are designed for short-lived delivery rather than
                permanent storage.
              </p>

              <h2>6. Your choices</h2>
              <p>
                Cardiom provides controls for account access, synchronisation,
                Apple Health connection, notifications, data export and
                deletion. You may also contact us to request access,
                correction, portability or deletion where those rights apply.
              </p>

              <h2>7. Security</h2>
              <p>
                We use access controls, encrypted transport, row-level account
                separation and operational safeguards. No system can guarantee
                absolute security, so we also design visible sync and error
                states to help you understand what has and has not been saved.
              </p>

              <h2>8. Children</h2>
              <p>
                Cardiom is not directed to children under the minimum digital
                consent age applicable in their country. We do not knowingly
                create accounts for children where parental authorisation is
                required.
              </p>

              <h2>9. Updates</h2>
              <p>
                We may update this policy as Cardiom evolves. Material changes
                will be presented in the app or by another appropriate notice
                before they take effect.
              </p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
