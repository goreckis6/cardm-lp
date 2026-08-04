import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
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
              <strong>Last updated</strong>
              <span>August 4, 2026</span>
              <strong style={{ marginTop: 26 }}>Questions</strong>
              <span>
                <a href="mailto:support@cardiom.app">support@cardiom.app</a>
              </span>
              <strong style={{ marginTop: 26 }}>Privacy requests</strong>
              <span>
                <a href="mailto:policy@cardiom.app">policy@cardiom.app</a>
              </span>
            </aside>
            <article className="legal-content">
              <div className="legal-note">
                <p>
                  Cardiom provides wellness information only. It is not a
                  medical device, diagnostic service or substitute for a
                  clinician, emergency service or validated medical equipment.
                  Please read these Terms carefully before accessing or using
                  the Cardiom Service.
                </p>
              </div>

              <h2>1. Interpretation and Definitions</h2>
              <h3>1.1 Interpretation</h3>
              <p>
                Capitalized terms have the meanings provided in this Section or
                otherwise defined in these Terms. The definitions apply
                regardless of whether terms appear in singular or plural.
              </p>
              <h3>1.2 Definitions</h3>
              <ul>
                <li>
                  <strong>Affiliate</strong> means any entity that controls, is
                  controlled by, or is under common control with the Company,
                  where “control” means direct or indirect ownership of at least
                  fifty percent (50%) of the equity interests or voting
                  securities.
                </li>
                <li>
                  <strong>Application</strong> means the mobile application
                  titled “Cardiom,” including all related features, tools,
                  content, and updates.
                </li>
                <li>
                  <strong>Company, We, Us, or Our</strong> means Cardiom, with
                  contact email at{" "}
                  <a href="mailto:support@cardiom.app">support@cardiom.app</a>.
                </li>
                <li>
                  <strong>Device</strong> means any device capable of accessing
                  the Service.
                </li>
                <li>
                  <strong>Measurement</strong> means a camera-based check-in
                  performed with the Application, whether Finger PPG (fingertip
                  on the rear camera with the flash) or Face rPPG (contactless
                  front-camera face scan).
                </li>
                <li>
                  <strong>Service</strong> means, collectively, the Application,
                  the Website at cardiom.app, associated software, content, and
                  any services offered by the Company.
                </li>
                <li>
                  <strong>Subscription</strong> means any paid plan offered
                  through the Application, including Cardiom+.
                </li>
                <li>
                  <strong>User Content</strong> means any Measurements, manually
                  logged readings, tags, notes, images, text, metadata, or other
                  content submitted, saved, or transmitted by You through the
                  Service, including wellness and health-related information.
                </li>
                <li>
                  <strong>Website</strong> means cardiom.app and any associated
                  subdomains.
                </li>
                <li>
                  <strong>You</strong> means the individual using the Service or
                  the legal entity on whose behalf the individual uses the
                  Service.
                </li>
              </ul>

              <h2>2. Agreement to Terms</h2>
              <p>
                Your access to and use of the Service is conditioned upon Your
                acceptance of these Terms and the{" "}
                <Link href="/privacy">Cardiom Privacy Policy</Link>. By
                accessing or using the Service, You acknowledge that You have
                read, understood, and agreed to be bound by these Terms. If You
                do not agree, You must discontinue use of the Service.
              </p>

              <h2>3. Eligibility; Age Requirements</h2>
              <p>
                You represent and warrant that You are at least 16 years old.
              </p>
              <p>
                If You are between 16 and 17 years old, You may only use the
                Service with the consent and supervision of a parent or legal
                guardian, who agrees to be fully responsible for all activities
                conducted using the Service. The Service is not directed to
                children, and We do not knowingly create accounts for users
                below the applicable minimum age.
              </p>

              <h2>4. Wellness Disclaimer; Not a Medical Device</h2>
              <p>
                Cardiom is a personal wellness and self-tracking tool. It does
                not provide medical, diagnostic, or clinical advice, and it is
                not a medical device.
              </p>
              <ul>
                <li>
                  The Service is not intended to diagnose, treat, cure, monitor,
                  or prevent any disease or health condition.
                </li>
                <li>
                  Measurements are estimates produced by camera-based signal
                  processing. Their accuracy can be affected by lighting,
                  movement, camera hardware, finger placement, skin
                  characteristics, circulation, medication, and other factors.
                </li>
                <li>
                  Derived context such as heart rate variability metrics (for
                  example SDNN, RMSSD, pNN50), stress patterns, energy context,
                  and estimated heart age are informational interpretations of
                  Your own history — not clinical measurements or validated
                  scores.
                </li>
                <li>
                  Blood pressure, blood oxygen, glucose, and similar values are
                  entered manually or obtained from other devices. You are
                  responsible for entering them accurately and for using an
                  appropriate, maintained device.
                </li>
                <li>
                  PDF reports and trend summaries are convenience exports of the
                  data in Your account. They are not medical records and are not
                  intended to be relied upon as clinical documentation.
                </li>
                <li>
                  You should not use the Service to make health decisions, change
                  treatment, adjust medication, or delay professional care. Always
                  consult a licensed healthcare professional about Your health.
                </li>
                <li>
                  The Service is not designed for emergencies and does not detect
                  medical events. If You believe You may be experiencing a medical
                  emergency, contact Your local emergency services immediately.
                </li>
              </ul>

              <h2>5. User Content; License Grant</h2>
              <p>
                You retain ownership of Your User Content. By submitting User
                Content, You represent that You own or have the necessary rights
                to it, and that it does not infringe the rights of any third
                party.
              </p>
              <p>
                You grant the Company a worldwide, non-exclusive, royalty-free,
                transferable, sublicensable license to use, reproduce, process,
                store, analyze, and modify the User Content solely to operate,
                provide, secure, and improve the Service — including performing
                Measurements, synchronizing Your account across Your Devices,
                building Your personal baseline, generating trends and reports,
                and delivering the features You request.
              </p>
              <p>
                We do not sell Your health information. Camera check-ins are used
                to produce the results You choose to save; the handling of camera
                media, wellness records, and account data is described in our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
              <p>
                You agree not to submit unlawful, harmful, offensive, or
                infringing content. Do not perform a Face rPPG check-in on another
                person, or upload images or health information about another
                person, without their lawful consent.
              </p>

              <h2>6. Prohibited Uses</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Upload violent, explicit, or unlawful content;</li>
                <li>
                  Use the Service to provide medical, diagnostic, or clinical
                  services to others, or to present Cardiom output as a medical
                  assessment;
                </li>
                <li>
                  Reverse engineer, decompile, or attempt to extract the source
                  code or measurement algorithms of the Service, except where
                  permitted by law;
                </li>
                <li>
                  Circumvent protections, subscription entitlements, or gain
                  unauthorized access to the Service, another user’s account, or
                  related systems;
                </li>
                <li>
                  Record or measure another individual without their lawful
                  consent;
                </li>
                <li>
                  Scrape, harvest, or systematically extract data from the
                  Service, or use it to build a competing dataset or model;
                </li>
                <li>
                  Interfere with the Service’s operation or impose an
                  unreasonable load on our infrastructure; or
                </li>
                <li>
                  Use the Service for any purpose that violates applicable law
                  or these Terms.
                </li>
              </ul>

              <h2>7. Subscription, Billing, and In-App Purchases</h2>
              <p>
                Purchases and subscriptions are processed through third-party
                platforms such as the Apple App Store. Their terms govern payment
                processing, renewals, and refunds. We do not directly process
                payment card transactions.
              </p>
              <p>
                Subscriptions automatically renew unless cancelled at least 24
                hours before the current billing period ends. You can manage or
                cancel subscriptions through Your App Store account settings.
              </p>
              <p>
                Free and paid tiers may differ in features and usage limits (such
                as available trend ranges, pattern context, or report exports).
                Final regional pricing is always shown before purchase. We may
                change plan features or pricing with reasonable notice where
                required by applicable law or platform policies.
              </p>

              <h2>8. Third-Party Services and Integrations</h2>
              <p>
                The Service may link to third-party websites and integrate with
                third-party services, including the Apple App Store, Sign in with
                Apple, Apple Health, and infrastructure providers used for
                authentication, storage, delivery, and diagnostics. The Company
                does not control and is not responsible for such third-party
                content or services. Your use of them is at Your own risk and
                subject to their terms and policies.
              </p>
              <p>
                Where You choose to connect an integration, You authorize the
                exchange of the data required for that integration to function.
                You can review and change these connections in the Application’s
                settings.
              </p>

              <h2>9. Intellectual Property</h2>
              <p>
                All rights in the Service (excluding User Content) are owned
                exclusively by the Company or its licensors. You may not copy,
                modify, distribute, sell, lease, or reverse engineer any part of
                the Service except as expressly permitted by these Terms or
                applicable law.
              </p>
              <p>
                “Cardiom” and related logos, designs, and branding are the
                property of the Company. You may not use our trademarks without
                prior written permission.
              </p>

              <h2>10. Termination</h2>
              <p>
                The Company may suspend or terminate Your access at any time if
                You violate these Terms or if we reasonably believe Your use
                poses a risk to the Service, other users, or third parties. Upon
                termination, all rights granted to You under these Terms
                immediately cease.
              </p>
              <p>
                You may stop using the Service at any time. You may also delete
                Your account and request deletion of Your data as described in
                our <Link href="/privacy">Privacy Policy</Link>.
              </p>

              <h2>11. “AS IS” and “AS AVAILABLE” Disclaimer</h2>
              <p>
                The Service is provided without warranties of any kind, whether
                express or implied. The Company disclaims all warranties
                including merchantability, fitness for a particular purpose,
                accuracy, and non-infringement. We do not warrant that the
                Service will be uninterrupted, error-free, or free of harmful
                components, or that any Measurement, metric, or estimate will be
                available, accurate, or suitable for a particular purpose.
              </p>

              <h2>12. Limitation of Liability</h2>
              <p>
                To the maximum extent allowed by law, the Company’s total
                liability arising out of or relating to the Service or these
                Terms shall not exceed the greater of:
              </p>
              <ul>
                <li>
                  The amount You paid to the Company (or through the App Store
                  for the Service) in the preceding 12 months, or
                </li>
                <li>One hundred dollars (USD $100).</li>
              </ul>
              <p>
                The Company is not liable for indirect, incidental, special,
                consequential, or punitive damages, including loss of profits,
                data, goodwill, or other intangible losses, even if we have been
                advised of the possibility of such damages.
              </p>
              <p>
                Some jurisdictions do not allow certain limitations of liability,
                so some of the above limitations may not apply to You. Nothing in
                these Terms limits rights or liabilities that cannot legally be
                limited.
              </p>

              <h2>13. Copyright Complaints</h2>
              <p>
                If You believe that content available through the Service
                infringes Your copyright, You may submit a notice to{" "}
                <a href="mailto:support@cardiom.app">support@cardiom.app</a> with
                sufficient information to identify the copyrighted work, the
                infringing material, and Your contact details. We may remove or
                disable access to allegedly infringing content in accordance with
                applicable law.
              </p>

              <h2>14. Governing Law</h2>
              <p>
                These Terms are governed by the laws applicable in the
                jurisdiction where the Company is established, without regard to
                conflict-of-law principles. Where permitted by law, You agree to
                the exclusive jurisdiction of the courts in that jurisdiction for
                disputes not subject to arbitration. Mandatory consumer
                protections available to You in Your country of residence remain
                unaffected.
              </p>

              <h2>15. Dispute Resolution</h2>
              <p>
                Before filing a formal legal claim, You agree to contact us at{" "}
                <a href="mailto:support@cardiom.app">support@cardiom.app</a> and
                attempt to resolve the dispute informally. If we cannot resolve a
                dispute within 60 days, either party may pursue remedies
                permitted by applicable law.
              </p>
              <p>
                To the extent permitted by applicable law, disputes shall be
                resolved on an individual basis. Class actions and
                representative actions are not permitted where waivable by law.
              </p>

              <h2>16. Severability and Waiver</h2>
              <p>
                If any provision of these Terms is found to be invalid or
                unenforceable, the remaining provisions will remain in full force
                and effect. Failure to enforce a right under these Terms does not
                constitute a waiver of that right.
              </p>

              <h2>17. Changes to These Terms</h2>
              <p>
                The Company may update these Terms at any time. Material changes
                will be announced through reasonable notice, such as by posting
                an updated version on the Website or within the Application.
                Continued use of the Service after updates constitutes acceptance
                of the revised Terms.
              </p>

              <h2>18. Contact Information</h2>
              <p>
                If You have questions about these Terms, You may contact Us at:
              </p>
              <ul>
                <li>
                  General and support questions:{" "}
                  <a href="mailto:support@cardiom.app">support@cardiom.app</a>
                </li>
                <li>
                  Privacy, data, and deletion requests:{" "}
                  <a href="mailto:policy@cardiom.app">policy@cardiom.app</a>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
