import { ExternalLink } from "lucide-react";
import { privacyEffectiveDate, privacySections } from "../privacy";

export default function Privacy() {
  return (
    <main className="privacy-page">
      <article className="docs-article">
        <div className="docs-kicker">Legal / Privacy</div>
        <h1>Privacy Policy</h1>
        <p className="docs-lead">
          This policy explains how the Conduit Extension and website handle
          information.
        </p>
        <p className="privacy-effective">
          <strong>Effective date:</strong> {privacyEffectiveDate}
        </p>

        {privacySections.map((section) => (
          <section className="doc-block" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="privacy-contact-links">
          <a
            href="https://github.com/err0rgod/conduit-extension/issues"
            target="_blank"
            rel="noreferrer"
          >
            Privacy and support questions <ExternalLink size={14} />
          </a>
          <a
            href="https://github.com/err0rgod/conduit-extension/security/advisories/new"
            target="_blank"
            rel="noreferrer"
          >
            Private security report <ExternalLink size={14} />
          </a>
        </div>
      </article>
    </main>
  );
}
