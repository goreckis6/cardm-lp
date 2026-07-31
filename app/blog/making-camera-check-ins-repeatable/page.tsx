import type { Metadata } from "next";
import { ArticleLayout } from "../../components/ArticleLayout";

export const metadata: Metadata = {
  title: "More repeatable camera check-ins",
  description:
    "Practical guidance for cleaner Finger PPG and Face rPPG wellness check-ins.",
};

export default function CameraArticle() {
  return (
    <ArticleLayout
      tag="BETTER CHECK-INS"
      title="How to make camera measurements more repeatable"
      readTime="4 min read"
    >
      <p>
        Camera-based check-ins are sensitive to the same things that make
        photography difficult: movement, uneven light and a subject that is not
        where the camera expects it.
      </p>

      <h2>For a fingertip check-in</h2>
      <p>
        Cover the selected lens and rear flash together, keep your hand
        supported and use gentle, even pressure. Pressing too firmly can reduce
        the useful change in light reaching the camera.
      </p>

      <h2>For a face check-in</h2>
      <p>
        Use even light from in front of you, keep your full face inside the
        guide and rest the phone on something stable. Avoid strong backlight,
        moving shadows and talking during the session.
      </p>

      <h2>Build a repeatable moment</h2>
      <ul>
        <li>Pause after movement before beginning.</li>
        <li>Use the same method for like-for-like comparisons.</li>
        <li>Let Cardiom reject a weak signal instead of forcing a result.</li>
        <li>Use the context tag that best reflects the moment.</li>
      </ul>

      <h2>When to try again</h2>
      <p>
        If the camera preview changes rapidly, the phone moves, the flash is not
        covered or your face leaves the guide, stop and restart. One clean
        session is more useful than several rushed ones.
      </p>

      <div className="article-note">
        <p>
          Camera results can differ from a validated medical device. If you need
          a clinical reading, use the appropriate equipment and follow the
          instructions provided with it.
        </p>
      </div>
    </ArticleLayout>
  );
}
