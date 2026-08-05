import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Copy, Check } from 'lucide-react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  
  const installCmd = "irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main>
      <section className="hero">
        <h1>Your agents need a browser.</h1>
        <p>
          One secure, local-first bridge to your Chromium browser. Conduit handles the permissions, DOM structures, and routing, so your agents can keep moving.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="button" onClick={handleCopy}>
            {copied ? <Check size={18} /> : <Terminal size={18} />}
            {copied ? 'Copied' : 'Install Conduit'}
          </button>
          <Link to="/docs" className="button secondary">Read the Docs</Link>
        </div>

        <div className="code-block">
          <div className="copy-text" onClick={handleCopy}>
            {copied ? <Check size={14}/> : <Copy size={14}/>}
            {copied ? 'Copied!' : 'Copy'}
          </div>
          <pre>
            <code>
<span style={{ color: '#569CD6' }}>PS</span> {'>'} {installCmd}
            </code>
          </pre>
        </div>
      </section>

      <section className="section">
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

      <section className="section">
        <h2>Change the browser. Keep the agent.</h2>
        <p className="subtitle">
          Conduit speaks the standard MCP tool shapes your agents already know. Keep your existing AI workflows and SDKs.
        </p>
        
        <div className="grid-3">
          <div className="card">
            <h3>MacOS & Linux</h3>
            <p>Prefer bash? Use the shell installer to set up the CLI and Daemon automatically.</p>
            <pre style={{marginTop: '1.5rem', fontSize: '0.8rem', color: '#ccc', background: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #222', overflowX: 'auto'}}>
              <code>curl -fsSL https://conduit.dev/install.sh | bash</code>
            </pre>
          </div>
          <div className="card">
            <h3>Extension Setup</h3>
            <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#888'}}>
              <p><span style={{color: '#fff'}}>1.</span> Open <code style={{color: '#fff'}}>chrome://extensions</code></p>
              <p><span style={{color: '#fff'}}>2.</span> Enable <strong>Developer mode</strong></p>
              <p><span style={{color: '#fff'}}>3.</span> Click <strong>Load unpacked</strong></p>
              <p><span style={{color: '#fff'}}>4.</span> Paste the local build path.</p>
            </div>
          </div>
          <div className="card">
            <h3>Agent Skills</h3>
            <p>Provide your agents with perfect context and rules so they know exactly how to operate Conduit.</p>
            <Link to="/docs" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', marginTop: '1.5rem', display: 'inline-block', fontWeight: 500}}>
              Read the SKILL.md guide →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
