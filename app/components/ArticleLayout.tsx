import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function ArticleLayout({
  tag,
  title,
  readTime,
  children,
}: {
  tag: string;
  title: string;
  readTime: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="subpage-main">
        <section className="article-hero">
          <div className="shell">
            <span className="section-index">{tag}</span>
            <h1>{title}</h1>
            <div className="article-meta">
              <span>Cardiom Journal</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>
        </section>
        <section className="article-page">
          <div className="shell article-layout">
            <aside className="article-aside">
              <strong>Remember</strong>
              <span>
                Personal trends are wellness context, not a diagnosis or reason
                to change treatment.
              </span>
            </aside>
            <article className="article-content">{children}</article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
