import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, ShieldCheck, Terminal } from "lucide-react";

const installCommands = {
  windows:
    "irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex",
  unix: "curl -fsSL https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.sh | bash",
};

export default function Home() {
  const [copied, setCopied] = useState<string>();

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(undefined), 1800);
  }

  return (
    <main>
      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" /> backend v0.1.1 · extension v0.1.2
        </div>
        <h1>Connect any AI agent to your browser securely.</h1>
        <p>
          Conduit is a local browser-control bridge: one authenticated daemon,
          one least-privilege Chromium extension, and typed tools for MCP and
          CLI clients.
        </p>
        <div className="hero-actions">
          <button
            className="button"
            onClick={() => copy("windows", installCommands.windows)}
          >
            {copied === "windows" ? (
              <Check size={18} />
            ) : (
              <Terminal size={18} />
            )}
            {copied === "windows" ? "Copied" : "Install for Windows"}
          </button>
          <Link to="/docs/getting-started" className="button secondary">
            Read the docs
          </Link>
          <a
            className="button ghost"
            href="https://github.com/err0rgod/conduit"
          >
            GitHub
          </a>
        </div>

        <InstallCommand
          label="Windows · PowerShell"
          value={installCommands.windows}
          copied={copied === "windows"}
          onCopy={() => copy("windows", installCommands.windows)}
        />
        <InstallCommand
          label="macOS / Linux · Bash"
          value={installCommands.unix}
          copied={copied === "unix"}
          onCopy={() => copy("unix", installCommands.unix)}
        />
      </section>

      <section className="security-banner">
        <ShieldCheck size={24} />
        <div>
          <strong>Page content is data, not trusted agent instruction.</strong>
          <p>
            Conduit keeps page text outside the permission boundary. Per-site
            access remains the default; broader access requires an explicit user
            opt-in and never bypasses daemon policy.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>A small, inspectable control path.</h2>
        <p className="subtitle">
          Every request crosses explicit authentication, validation, policy, and
          browser permission boundaries.
        </p>
        <div className="architecture-flow" aria-label="Conduit architecture">
          {[
            "AI agent",
            "MCP or CLI",
            "Local daemon",
            "MV3 extension",
            "Browser tab",
          ].map((item, index) => (
            <div className="flow-step" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              {index < 4 && <i aria-hidden="true">→</i>}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Secure defaults, useful tools.</h2>
        <div className="grid-3">
          <Feature title="Local by default">
            Loopback-only networking, random local authentication, and no
            Conduit cloud or public relay.
          </Feature>
          <Feature title="Per-site browser access">
            The extension asks Chromium for the current origin. Users can revoke
            it from the same popup or explicitly opt into all HTTP/HTTPS sites.
          </Feature>
          <Feature title="Structured snapshots">
            Accessibility-oriented page data and short-lived element IDs reduce
            reliance on fragile selectors.
          </Feature>
          <Feature title="MCP and CLI">
            Strongly typed browser tools return validated results through either
            integration surface.
          </Feature>
          <Feature title="Policy before action">
            Capability grants, domain rules, confirmations, upload allowlists,
            and payload limits are enforced centrally.
          </Feature>
          <Feature title="Tested release path">
            Cross-platform CI, security tests, real Chromium E2E, and
            checksummed GitHub Release artifacts.
          </Feature>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <div className="eyebrow">One-minute setup</div>
          <h2>The backend installs. The browser stays yours.</h2>
          <p className="subtitle">
            Setup registers a current-user Native Messaging host, starts the
            daemon, and prints the exact extension directory to load. No
            administrator access is required.
          </p>
          <Link className="text-link" to="/docs/quick-start">
            Follow the quick start →
          </Link>
        </div>
        <ol className="setup-list">
          <li>
            <span>1</span>
            <div>
              <strong>Run the installer</strong>
              <p>
                Downloads and verifies the newest backend and extension
                releases.
              </p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <strong>Load unpacked</strong>
              <p>Select the versioned path printed by setup.</p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <strong>Allow one site</strong>
              <p>Use the popup on a non-sensitive test page.</p>
            </div>
          </li>
          <li>
            <span>4</span>
            <div>
              <strong>Connect an agent</strong>
              <p>Launch conduit mcp or use direct CLI commands.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="cta">
        <div>
          <div className="eyebrow">Project status</div>
          <h2>Pre-1.0, honest, and ready to study.</h2>
          <p>
            The core vertical slice works. Sensitive unattended use is not
            recommended yet.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button" to="/docs/roadmap">
            View roadmap
          </Link>
          <a
            className="button secondary"
            href="https://github.com/err0rgod/conduit-extension/releases/tag/v0.1.2"
          >
            Extension v0.1.2
          </a>
        </div>
      </section>
    </main>
  );
}

function InstallCommand(props: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="install-command">
      <div className="command-label">{props.label}</div>
      <code>{props.value}</code>
      <button onClick={props.onCopy} aria-label={`Copy ${props.label} command`}>
        {props.copied ? <Check size={15} /> : <Copy size={15} />}
        {props.copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Feature(props: { title: string; children: string }) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.children}</p>
    </div>
  );
}
