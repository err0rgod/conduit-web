import { useState } from 'react';
import './index.css';

function App() {
  const [copied, setCopied] = useState(false);
  
  const installCmd = "irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <header>
        <a href="#" className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          CONDUIT
        </a>
        <div className="nav">
          <a href="#platform">Platform</a>
          <a href="#docs">Docs</a>
          <a href="https://github.com/err0rgod/conduit">GitHub</a>
          <a href="https://github.com/err0rgod/skills/blob/main/conduit/SKILL.md">Skills</a>
        </div>
        <div className="status">
          <div className="status-dot"></div>
          Operational
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Your agents need a browser.</h1>
          <p>
            One secure, local-first bridge to your Chromium browser. Conduit handles the permissions, DOM structures, and routing, so your agents can keep moving.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="button" onClick={handleCopy}>
              {copied ? 'Copied' : 'Install Conduit'}
            </button>
            <a href="https://github.com/err0rgod/conduit" className="button secondary">View Source</a>
          </div>

          <div className="code-block">
            <div className="copy-text" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </div>
            <pre>
              <code>
<span style={{ color: '#569CD6' }}>PS</span> {'>'} {installCmd}
              </code>
            </pre>
          </div>
        </section>

        <section id="platform" className="section">
          <h2>Failure is expected. Blindness isn’t.</h2>
          <p className="subtitle">
            Your AI agent talks to Conduit once. We continuously enforce domain policies, generate structured accessibility trees, and execute precise actions.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Secure defaults</h3>
              <p>Loopback-only daemon, explicit domain approvals, and runtime action validation. Agents operate exactly within their bounds.</p>
            </div>
            <div className="card">
              <h3>Structured snapshots</h3>
              <p>Don't guess CSS selectors. Conduit provides precise accessibility trees with temporary, stable element references.</p>
            </div>
            <div className="card">
              <h3>MCP Native</h3>
              <p>Fully supports the Model Context Protocol. Drop Conduit into Claude Code, Cursor, or Windsurf without changing your configuration.</p>
            </div>
          </div>
        </section>

        <section id="docs" className="section">
          <h2>Change the browser. Keep the agent.</h2>
          <p className="subtitle">
            Conduit speaks the standard MCP tool shapes your agents already know. Keep your existing AI workflows and SDKs.
          </p>
          
          <div className="grid-3">
            <div className="card">
              <h3>MacOS & Linux</h3>
              <p>Prefer bash? Use the shell installer.</p>
              <pre style={{marginTop: '1rem', fontSize: '0.85rem', color: '#ccc', background: '#000', padding: '1rem', borderRadius: '4px'}}>
                <code>curl -fsSL https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.sh | bash</code>
              </pre>
            </div>
            <div className="card">
              <h3>Extension Setup</h3>
              <p>1. Open <code style={{color: '#fff'}}>chrome://extensions</code></p>
              <p>2. Enable <strong>Developer mode</strong></p>
              <p>3. <strong>Load unpacked</strong></p>
              <p>4. Paste the setup path.</p>
            </div>
            <div className="card">
              <h3>Agent Skills</h3>
              <p>Provide your agents with perfect context.</p>
              <a href="https://github.com/err0rgod/skills/blob/main/conduit/SKILL.md" style={{ color: '#fff', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block'}}>
                Read SKILL.md
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="copyright">© 2026 Conduit. The open-source browser bridge.</div>
        <div className="footer-links">
          <a href="#platform">Platform</a>
          <a href="#docs">Docs</a>
          <a href="https://github.com/err0rgod/conduit">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
