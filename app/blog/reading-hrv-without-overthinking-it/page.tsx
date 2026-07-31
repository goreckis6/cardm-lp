import type { Metadata } from "next";
import { ArticleLayout } from "../../components/ArticleLayout";

export const metadata: Metadata = {
  title: "Reading HRV without overthinking it",
  description:
    "A plain-language introduction to SDNN, RMSSD and pNN50 in Cardiom.",
};

export default function HrvArticle() {
  return (
    <ArticleLayout
      tag="HRV, SIMPLIFIED"
      title="Reading HRV without overthinking it"
      readTime="5 min read"
    >
      <p>
        HRV describes variation in the time between detected heart beats. It is
        not the same thing as heart rate, and a “higher is always better” rule
        misses most of the useful context.
      </p>

      <h2>Three labels you may see</h2>
      <p>
        <strong>SDNN</strong> summarises overall variation between beat
        intervals in a session. <strong>RMSSD</strong> focuses on shorter,
        successive changes. <strong>pNN50</strong> is the percentage of
        successive intervals that differ by more than 50 milliseconds.
      </p>

      <h2>Why the values do not appear after every check-in</h2>
      <p>
        HRV needs cleaner beat-to-beat timing than a basic pulse value. If the
        camera signal contains movement, unstable light or uncertain peaks,
        Cardiom may save heart rate without presenting HRV details. Missing data
        is better than false precision.
      </p>

      <h2>Compare with yourself</h2>
      <p>
        Device, posture, breathing, time and measurement duration can all affect
        short HRV sessions. The most useful comparison is usually your own
        repeated routine using the same method.
      </p>
      <ul>
        <li>Measure at a similar time when practical.</li>
        <li>Sit still and breathe naturally.</li>
        <li>Compare Finger and Face trends separately.</li>
        <li>Focus on broader direction, not one unusual session.</li>
      </ul>

      <div className="article-note">
        <p>
          Consumer camera HRV is personal wellness context. Clinical HRV
          assessment may use longer recordings, controlled protocols and
          medical-grade sensors.
        </p>
      </div>
    </ArticleLayout>
  );
}
