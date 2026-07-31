import type { Metadata } from "next";
import { ArticleLayout } from "../../components/ArticleLayout";

export const metadata: Metadata = {
  title: "Why personal baselines beat snapshots",
  description:
    "Why a consistent personal baseline is more useful than reacting to one wellness reading.",
};

export default function BaselineArticle() {
  return (
    <ArticleLayout
      tag="FOUNDATIONS"
      title="Why your personal baseline matters more than one number"
      readTime="4 min read"
    >
      <p>
        A single heart-rate check-in can be interesting. A sequence of
        check-ins taken in similar conditions is what begins to reveal your
        normal pattern.
      </p>

      <h2>One number has very little context</h2>
      <p>
        Heart rate changes with movement, sleep, temperature, caffeine,
        emotion, hydration and time of day. That does not make an individual
        reading useless. It means the reading belongs to a moment — and the
        moment matters.
      </p>

      <h2>A baseline makes “usual” personal</h2>
      <p>
        Cardiom builds a baseline from repeated camera check-ins. Once enough
        sessions are available, the app can show a personal range and compare
        recent values with your own history rather than treating every person
        as identical.
      </p>
      <ul>
        <li>Check in under broadly similar conditions.</li>
        <li>Give yourself a quiet minute before starting.</li>
        <li>Use tags to preserve useful context.</li>
        <li>Look at direction over time instead of chasing daily perfection.</li>
      </ul>

      <h2>Consistency is more valuable than frequency</h2>
      <p>
        Ten hurried measurements in one afternoon do not tell the same story as
        calm check-ins spread across different days. Cardiom’s longer-term
        views intentionally require coverage across time.
      </p>

      <div className="article-note">
        <p>
          If a value concerns you or comes with symptoms, use an appropriate
          validated device and seek medical advice. A wellness baseline cannot
          rule a health problem in or out.
        </p>
      </div>
    </ArticleLayout>
  );
}
