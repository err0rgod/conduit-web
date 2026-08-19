import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { defaultDoc, docs, findDoc } from "../docs";

export default function Docs() {
  const { slug } = useParams();
  if (!slug) return <Navigate to={`/docs/${defaultDoc.slug}`} replace />;
  const page = findDoc(slug);
  if (!page) return <Navigate to={`/docs/${defaultDoc.slug}`} replace />;
  const index = docs.indexOf(page);
  const previous = docs[index - 1];
  const next = docs[index + 1];

  return (
    <main className="docs-layout">
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <div className="sidebar-label">Documentation</div>
        <nav>
          {docs.map((item) => (
            <Link
              key={item.slug}
              to={`/docs/${item.slug}`}
              className={item.slug === page.slug ? "active" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <article className="docs-article">
        <div className="docs-kicker">Conduit docs / {page.title}</div>
        <h1>{page.title}</h1>
        <p className="docs-lead">{page.summary}</p>

        {page.slug === "getting-started" && (
          <div className="warning-panel">
            <AlertTriangle size={20} aria-hidden="true" />
            <div>
              <strong>Pre-1.0 security notice</strong>
              <p>
                Evaluate Conduit with a disposable profile before using
                sensitive accounts.
              </p>
            </div>
          </div>
        )}

        {page.blocks.map((block) => (
          <section className="doc-block" key={block.heading}>
            <h2>{block.heading}</h2>
            {block.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {block.bullets && (
              <ul>
                {block.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {block.code && (
              <pre>
                <code>{block.code}</code>
              </pre>
            )}
            {block.note && (
              <div className="doc-note">
                <strong>Note.</strong> {block.note}
              </div>
            )}
          </section>
        ))}

        <a
          className="edit-link"
          href="https://github.com/err0rgod/conduit-web/edit/master/src/docs.ts"
          target="_blank"
          rel="noreferrer"
        >
          Edit this page on GitHub <ExternalLink size={14} />
        </a>

        <nav
          className="docs-pagination"
          aria-label="Adjacent documentation pages"
        >
          {previous ? (
            <Link to={`/docs/${previous.slug}`}>
              <ArrowLeft size={16} /> {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/docs/${next.slug}`}>
              {next.title} <ArrowRight size={16} />
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
