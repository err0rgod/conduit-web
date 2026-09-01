import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const installCommands = {
  windows:
    "irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex",
  unix: "curl -fsSL https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.sh | bash",
};

const extensionReleaseUrl =
  "https://github.com/err0rgod/conduit-extension/releases/tag/v0.1.3";
const extensionArchiveUrl =
  "https://github.com/err0rgod/conduit-extension/releases/download/v0.1.3/conduit-extension-unpacked-v0.1.3.zip";
const chromeStoreUrl =
  "https://chromewebstore.google.com/detail/conduit-extension/gjhipjgiapijcdnflldnoenafeegmfpc";
const firefoxAddonUrl =
  "https://addons.mozilla.org/en-US/firefox/addon/conduit/";
const skillDirectoryUrl =
  "https://github.com/err0rgod/skills/tree/main/conduit";

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
          <span className="status-dot" /> Chrome Web Store live · backend v0.1.3
        </div>
        <h1>Connect any AI agent to your browser securely.</h1>
        <p>
          Conduit is a local browser-control bridge: one authenticated daemon,
          one least-privilege browser extension, and typed tools for MCP and CLI
          clients.
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
          <a className="button secondary" href={chromeStoreUrl}>
            <ExternalLink size={18} />
            Install Chrome extension
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

      <section className="extension-status live" role="status">
        <Check size={24} />
        <div>
          <strong>Conduit Extension is live on the Chrome Web Store.</strong>
          <p>
            Install the signed Chrome build directly. The verified GitHub
            archive remains available for development or recovery, and the
            backend trusts both identities.
          </p>
          <a className="button store-button" href={chromeStoreUrl}>
            <ExternalLink size={17} />
            Install from Chrome Web Store
          </a>
          <a className="text-link" href={extensionReleaseUrl}>
            GitHub extension release and fallback →
          </a>
          <p className="extension-status-links">
            Firefox users can install the approved add-on directly from Mozilla:{" "}
            <a href={firefoxAddonUrl}>Firefox Add-ons →</a>
          </p>
        </div>
      </section>

      <section className="section install-steps-section">
        <div className="eyebrow">Start here</div>
        <h2>Install Conduit in 4 steps.</h2>
        <p className="subtitle">
          Install the local backend, download the verified extension from
          GitHub, load it in Chrome Developer mode, then give your AI harness
          the skill.
        </p>
        <ol className="install-steps">
          <li>
            <span className="step-number">1</span>
            <div>
              <h3>Install the backend</h3>
              <p>
                Run the Windows or macOS/Linux command above. The script
                downloads, verifies, configures, and starts Conduit locally.
              </p>
              <Link className="text-link" to="/docs/installation">
                Backend installation details →
              </Link>
            </div>
          </li>
          <li>
            <span className="step-number">2</span>
            <div>
              <h3>Install the extension</h3>
              <p>
                Chrome and Brave users can install the live Chrome Web Store
                listing. Firefox users can install the approved add-on directly
                from Mozilla. Use the GitHub archive for development or
                recovery.
              </p>
              <a className="button store-button" href={chromeStoreUrl}>
                <ExternalLink size={17} />
                Chrome Web Store
              </a>
              <a className="button store-button" href={extensionArchiveUrl}>
                <Download size={17} />
                Download unpacked ZIP
                <ExternalLink size={15} />
              </a>
              <a className="text-link browser-link" href={firefoxAddonUrl}>
                Firefox Add-ons (approved) →
              </a>
            </div>
          </li>
          <li>
            <span className="step-number">3</span>
            <div>
              <h3>Load it in Chrome</h3>
              <p>
                Extract the ZIP, open <code>chrome://extensions</code>, enable
                Developer mode, choose Load unpacked, and select the folder
                containing <code>manifest.json</code>.
              </p>
              <a
                className="text-link"
                href="https://github.com/err0rgod/conduit-extension#development"
              >
                See the Developer Mode instructions →
              </a>
            </div>
          </li>
          <li>
            <span className="step-number">4</span>
            <div>
              <h3>Install SKILL.md</h3>
              <p>
                Add the Conduit skill directory to any Agent Skills-compatible
                AI harness.
              </p>
              <a className="text-link" href={skillDirectoryUrl}>
                Open the Conduit skill directory →
              </a>
            </div>
          </li>
        </ol>
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
            The extension asks the browser for the current origin. Users can
            revoke it from the same popup or explicitly opt into all HTTP/HTTPS
            sites.
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
          <a className="button secondary" href={chromeStoreUrl}>
            <ExternalLink size={18} />
            Install extension
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
