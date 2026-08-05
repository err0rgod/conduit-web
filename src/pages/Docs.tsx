import { Code, Terminal, Shield } from 'lucide-react';

export default function Docs() {
  return (
    <main>
      <section className="hero" style={{ marginBottom: '4rem' }}>
        <h1>Documentation</h1>
        <p>
          Everything you need to integrate your AI agents with the browser securely.
        </p>
      </section>

      <div className="grid-3" style={{ marginBottom: '4rem' }}>
        <div className="card">
          <Terminal size={24} style={{ marginBottom: '1rem', color: '#fff' }} />
          <h3>Quickstart</h3>
          <p>Get the daemon and CLI running in under 2 minutes.</p>
        </div>
        <div className="card">
          <Code size={24} style={{ marginBottom: '1rem', color: '#fff' }} />
          <h3>MCP Reference</h3>
          <p>Comprehensive guide to all available Model Context Protocol tools.</p>
        </div>
        <div className="card">
          <Shield size={24} style={{ marginBottom: '1rem', color: '#fff' }} />
          <h3>Security Model</h3>
          <p>Learn how Conduit enforces domain policies and action confirmations.</p>
        </div>
      </div>

      <section className="section docs-content">
        <h2>Core Concepts</h2>
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="doc-section">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Architecture</h3>
            <p style={{ color: '#888', marginBottom: '1rem' }}>
              Conduit consists of three components working in tandem:
            </p>
            <ul style={{ listStyle: 'none', color: '#888', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><strong style={{ color: '#fff' }}>1. Conduit Daemon:</strong> A local-first HTTP/WS server that manages MCP connections and agent sessions.</li>
              <li><strong style={{ color: '#fff' }}>2. Conduit CLI:</strong> The developer tool used to manage domains, permissions, and daemon lifecycle.</li>
              <li><strong style={{ color: '#fff' }}>3. Browser Extension:</strong> The MV3 Chromium extension that communicates directly with the active page.</li>
            </ul>
          </div>

          <div className="doc-section">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tab Group Requirement</h3>
            <p style={{ color: '#888', marginBottom: '1rem' }}>
              To prevent AI agents from interfering with user workflows, Conduit enforces a strict tab grouping policy.
              All tabs opened or operated on by an AI agent must belong to a dedicated tab group (e.g., "Agent Work").
            </p>
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <pre>
                <code>
// Example MCP Tool Call
{`{
  "name": "browser_open_tab",
  "arguments": {
    "url": "https://github.com",
    "tabGroup": "Agent Work"
  }
}`}
                </code>
              </pre>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}
