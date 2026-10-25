import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bug,
  Check,
  Copy,
  Download,
  FlaskConical,
  Globe,
  KeyRound,
  ListChecks,
  Lock,
  ScanText,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import GitHubIcon from "../GitHubIcon";

const installCommands = {
  windows:
    "irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex",
  unix: "curl -fsSL https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.sh | bash",
};

const extensionArchiveUrl =
  "https://github.com/err0rgod/conduit-extension/releases/download/v1.1.4/conduit-extension-unpacked-v1.1.4.zip";
export const chromeStoreUrl =
  "https://chromewebstore.google.com/detail/conduit-extension/gjhipjgiapijcdnflldnoenafeegmfpc";
const firefoxAddonUrl =
  "https://addons.mozilla.org/en-US/firefox/addon/conduit/";
const skillDirectoryUrl =
  "https://github.com/err0rgod/skills/tree/main/conduit";

type Platform = keyof typeof installCommands;

const sessionLines: { kind: string; text: string; id?: string }[] = [
  { kind: "cmd", text: "conduit browser open https://example.com" },
  { kind: "ok", text: "tab opened · example.com granted" },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "conduit browser snapshot --mode interactive" },
  { kind: "out", id: "e1", text: 'heading "Example Domain"' },
  { kind: "out", id: "e2", text: 'link "More information…"' },
  { kind: "out", id: "e3", text: 'button "Sign in"' },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "conduit browser click --element e3" },
  { kind: "ok", text: "clicked e3 · policy check passed" },
];

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("windows");
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(installCommands[platform]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <h1>
            Let your AI agent use the browser.
            <span> Safely, on your machine.</span>
          </h1>
          <p className="lead">
            Conduit is an open-source bridge between AI agents and your real
            browser. One local daemon, one least-privilege extension, and typed
            tools for MCP and CLI clients. No cloud relay.
          </p>
          <div className="actions">
            <a className="button" href={chromeStoreUrl}>
              Add to Chrome — it's free
            </a>
            <Link to="/docs/getting-started" className="button ghost">
              Read the docs <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="hero-meta">
            <li>
              <Check size={15} /> Chrome, Brave, Edge & Firefox
            </li>
            <li>
              <Check size={15} /> MIT licensed
            </li>
            <li>
              <Check size={15} /> Backend v1.1.4
            </li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="window">
            <div className="window-bar">
              <i />
              <i />
              <i />
              <span>agent session</span>
            </div>
            <div className="terminal">
              {sessionLines.map((line, index) => (
                <div key={index} className={`t-line ${line.kind}`}>
                  {line.kind === "cmd" && <span className="t-prompt">$</span>}
                  {line.kind === "ok" && <span className="t-ok">✓</span>}
                  {line.id && <span className="t-id">{line.id}</span>}
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell flow-section">
        <div className="flow" aria-label="Conduit architecture">
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
            </div>
          ))}
        </div>
        <p className="flow-caption">
          Every request crosses explicit authentication, validation, policy, and
          browser permission boundaries.
        </p>
      </section>

      <section className="section shell">
        <div className="section-head">
          <div className="eyebrow">Why Conduit</div>
          <h2>Secure defaults. Useful tools.</h2>
          <p>
            Built for people who want agents to do real work in a browser
            without handing over the keys to everything.
          </p>
        </div>
        <div className="features">
          <Feature icon={<Lock size={20} />} title="Local by default">
            Loopback-only networking, random local authentication, and no
            Conduit cloud or public relay.
          </Feature>
          <Feature icon={<Globe size={20} />} title="Per-site browser access">
            The extension asks for the current origin only. Revoke it from the
            same popup, or explicitly opt into all HTTP/HTTPS sites.
          </Feature>
          <Feature icon={<ScanText size={20} />} title="Structured snapshots">
            Accessibility-oriented page data and short-lived element IDs reduce
            reliance on fragile selectors.
          </Feature>
          <Feature icon={<Terminal size={20} />} title="MCP and CLI">
            Strongly typed browser tools return validated results through either
            integration surface.
          </Feature>
          <Feature icon={<Bug size={20} />} title="Browser debugging">
            Opt-in console capture, redacted network diagnostics, runtime
            inspection, and bounded performance traces.
          </Feature>
          <Feature icon={<ListChecks size={20} />} title="Policy before action">
            Capability grants, domain rules, confirmations, upload allowlists,
            and payload limits are enforced centrally.
          </Feature>
        </div>
      </section>

      <section className="section shell" id="install">
        <div className="section-head">
          <div className="eyebrow">Get started</div>
          <h2>Up and running in four steps.</h2>
          <p>
            Install the local backend, add the extension, and give your AI
            harness the skill.
          </p>
        </div>

        <div className="install-box">
          <div className="tabs" role="tablist" aria-label="Operating system">
            <button
              role="tab"
              aria-selected={platform === "windows"}
              onClick={() => setPlatform("windows")}
            >
              Windows · PowerShell
            </button>
            <button
              role="tab"
              aria-selected={platform === "unix"}
              onClick={() => setPlatform("unix")}
            >
              macOS / Linux · Bash
            </button>
          </div>
          <div className="command">
            <code>{installCommands[platform]}</code>
            <button onClick={copy} aria-label="Copy install command">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <ol className="steps">
          <Step n={1} title="Install the backend">
            <p>
              Run the command above. The script downloads, verifies, configures,
              and starts Conduit locally.
            </p>
            <Link className="text-link" to="/docs/installation">
              Installation details <ArrowRight size={14} />
            </Link>
          </Step>
          <Step n={2} title="Install the extension">
            <p>
              Chrome, Brave and Edge users install from the Chrome Web Store.
              Firefox users get the approved Mozilla add-on.
            </p>
            <div className="step-links">
              <a className="text-link" href={chromeStoreUrl}>
                Chrome Web Store <ArrowRight size={14} />
              </a>
              <a className="text-link" href={firefoxAddonUrl}>
                Firefox Add-ons (approved) <ArrowRight size={14} />
              </a>
            </div>
          </Step>
          <Step n={3} title="Load it in Chrome (optional)">
            <p>
              Prefer a manual install? Extract the{" "}
              <a href={extensionArchiveUrl}>
                unpacked ZIP <Download size={13} />
              </a>
              , open <code>chrome://extensions</code>, enable Developer mode,
              and choose Load unpacked.
            </p>
          </Step>
          <Step n={4} title="Install SKILL.md">
            <p>
              Add the Conduit skill directory to any Agent Skills-compatible AI
              harness.
            </p>
            <a className="text-link" href={skillDirectoryUrl}>
              Open the skill directory <ArrowRight size={14} />
            </a>
          </Step>
        </ol>
      </section>

      <section className="section shell">
        <div className="callout">
          <div className="callout-icon">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3>Page content is data, not instructions.</h3>
            <p>
              Conduit keeps page text outside the permission boundary. Per-site
              access is the default; broader access requires an explicit opt-in
              and never bypasses daemon policy.
            </p>
            <Link className="text-link" to="/docs/prompt-injection">
              How Conduit handles prompt injection <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="mini-grid">
          <Mini icon={<KeyRound size={18} />} title="Authenticated pairing">
            The extension authenticates to the daemon through Native Messaging.
          </Mini>
          <Mini icon={<FlaskConical size={18} />} title="Tested release path">
            Cross-platform CI, security tests, real Chromium E2E, checksummed
            releases.
          </Mini>
        </div>
      </section>

      <section className="section shell">
        <div className="cta">
          <h2>Give your agent a browser it can't misuse.</h2>
          <p>
            Pre-1.0 and honest about it: the core works, and every line is open
            to inspect.
          </p>
          <div className="actions center">
            <a className="button light" href={chromeStoreUrl}>
              Add to Chrome
            </a>
            <a
              className="button ghost-light"
              href="https://github.com/err0rgod/conduit"
            >
              <GitHubIcon size={16} /> Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature(props: { icon: ReactNode; title: string; children: string }) {
  return (
    <div className="feature">
      <div className="feature-icon">{props.icon}</div>
      <h3>{props.title}</h3>
      <p>{props.children}</p>
    </div>
  );
}

function Mini(props: { icon: ReactNode; title: string; children: string }) {
  return (
    <div className="mini">
      <div className="mini-icon">{props.icon}</div>
      <div>
        <strong>{props.title}</strong>
        <p>{props.children}</p>
      </div>
    </div>
  );
}

function Step(props: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="step">
      <span className="step-number">{props.n}</span>
      <h3>{props.title}</h3>
      {props.children}
    </li>
  );
}
