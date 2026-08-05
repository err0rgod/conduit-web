import React, { useState } from 'react';
import './index.css';

function App() {
  const [copied, setCopied] = useState(false);

  const installCommand = 'irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <img src="/logo.jpg" alt="Conduit Logo" className="logo" />
          <span className="brand-name">Conduit</span>
        </div>
        <nav className="nav-links">
          <a href="#docs" className="nav-link">Documentation</a>
          <a href="#skills" className="nav-link">Agent Skills</a>
          <a href="https://github.com/err0rgod/conduit" className="nav-link">GitHub</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>The Bridge Between <br/>AI and Your Browser.</h1>
          <p>
            An open-source, local-first browser-control bridge for AI agents. 
            Connect MCP or CLI clients to your existing Chromium browser securely.
          </p>

          <div className="terminal">
            <div className="terminal-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <pre>
              <code>
                <span style={{color: '#ff00f0'}}>PS D:\&gt;</span> {installCommand}
              </code>
            </pre>
          </div>
          <button className="copy-btn" onClick={copyToClipboard}>
            {copied ? 'Copied to Clipboard!' : 'Copy 1-Minute Setup Command'}
          </button>
        </section>

        <section id="features" className="grid">
          <div className="glass-card">
            <div className="card-icon">⚡</div>
            <h3>Local-First & Secure</h3>
            <p>Runs a background daemon locally. Enforces strict domain policies, explicit authorizations, and runtime validation. Loopback-only by default.</p>
          </div>
          <div className="glass-card">
            <div className="card-icon">🤖</div>
            <h3>MCP Ready</h3>
            <p>Seamlessly integrates with Claude Code, Cursor, and Windsurf via the Model Context Protocol. Exposes tools like browser_snapshot and browser_click natively.</p>
          </div>
          <div className="glass-card">
            <div className="card-icon">📚</div>
            <h3>Agent Skills</h3>
            <p>Teach your AI agents exactly how to use Conduit. We provide pre-written SKILL files to ensure prompt-injection safety and best practices.</p>
            <a href="https://github.com/err0rgod/skills/blob/main/conduit/SKILL.md" className="action-link">View SKILL.md →</a>
          </div>
        </section>

        <section id="docs" className="glass-card" style={{marginBottom: '2rem'}}>
          <h2>Documentation</h2>
          <br/>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
            <div>
              <h3 style={{color: 'var(--accent-cyan)'}}>macOS / Linux Install</h3>
              <p style={{marginBottom: '1rem'}}>Prefer Bash? We have a curl script for you.</p>
              <pre style={{background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px'}}>
                curl -fsSL https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.sh | bash
              </pre>
            </div>
            <div>
              <h3 style={{color: 'var(--accent-magenta)'}}>Connecting the Extension</h3>
              <p style={{marginBottom: '0.5rem'}}>1. Navigate to <code>chrome://extensions</code></p>
              <p style={{marginBottom: '0.5rem'}}>2. Enable <strong>Developer mode</strong></p>
              <p style={{marginBottom: '0.5rem'}}>3. Click <strong>Load unpacked</strong></p>
              <p>4. Paste the path printed by the setup script.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Built with ❤️ for AI Agents. Conduit is an open-source project.</p>
      </footer>
    </div>
  );
}

export default App;
