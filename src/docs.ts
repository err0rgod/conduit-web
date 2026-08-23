export interface DocBlock {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  note?: string;
}

export interface DocPage {
  slug: string;
  title: string;
  summary: string;
  blocks: DocBlock[];
}

export const docs: DocPage[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    summary:
      "Understand the three local components and get ready for a safe first browser action.",
    blocks: [
      {
        heading: "What Conduit runs",
        paragraphs: [
          "Conduit is a local bridge, not a hosted browser. The backend package installs the conduit CLI, daemon, and MCP adapter. A separate Manifest V3 extension executes actions inside Chrome, Edge, Brave, or Firefox. The documentation site is the only hosted component.",
        ],
        bullets: [
          "Node.js 22 or newer runs the backend.",
          "Chrome and Brave share the Chrome Web Store package, Edge uses the same Chromium build through Edge Add-ons, and Firefox uses its own package.",
          "The daemon binds to 127.0.0.1 by default and authenticates the extension through Native Messaging.",
        ],
      },
      {
        heading: "Before the first action",
        paragraphs: [
          "Install the backend first, install the extension from the browser store second, and add the Conduit SKILL.md to your AI harness third. Grant only the site you intend to automate from the extension popup. Conduit starts with browser.read only and asks on first-use domains. Per-site access is the recommended default; an operator may explicitly choose Allow all sites for a local workflow, but that browser grant never changes daemon policy.",
        ],
        code: "conduit setup\nconduit doctor\nconduit browser tabs",
        note: "Conduit is pre-1.0. Use a disposable browser profile and non-sensitive test pages while evaluating it.",
      },
    ],
  },
  {
    slug: "installation",
    title: "Installation",
    summary:
      "Install a checksummed release without administrator access, or build all repositories from source.",
    blocks: [
      {
        heading: "1. Install the backend on Windows",
        paragraphs: [
          "Run in PowerShell as your normal user. The installer downloads and verifies only the backend, registers Native Messaging, and does not install a browser extension, Node.js, or system packages.",
        ],
        code: "irm https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.ps1 | iex",
      },
      {
        heading: "1. Install the backend on macOS or Linux",
        code: "curl -fsSL https://raw.githubusercontent.com/err0rgod/conduit/main/scripts/install.sh | bash",
      },
      {
        heading: "Reproducible backend version",
        paragraphs: [
          "By default, the installer selects the newest backend release. Pin it when reproducibility matters.",
        ],
        code: "./install.sh --version v0.1.2\n./install.ps1 -Version v0.1.2",
      },
      {
        heading: "2. Install the browser extension",
        paragraphs: [
          "Install from the store after the backend is ready. Chrome and Brave share the Chrome Web Store build. Edge uses the same Chromium source package through Microsoft Edge Add-ons. Firefox has a separate build because its background and advanced-interaction APIs differ.",
          "Until reviewed listing URLs are final, use the store search links below. A newly assigned Chrome or Edge item ID must be registered once with conduit extension trust <extension-id>, then the browser must be restarted.",
        ],
        code: "Chrome + Brave: https://chromewebstore.google.com/search/conduit\nEdge: https://microsoftedge.microsoft.com/addons/search/conduit\nFirefox: https://addons.mozilla.org/firefox/search/?q=Conduit",
      },
      {
        heading: "3. Install SKILL.md",
        paragraphs: [
          "Add the portable Conduit skill to any Agent Skills-compatible AI harness. Install the complete directory when possible so future sibling references remain available.",
        ],
        code: "https://github.com/err0rgod/skills/tree/main/conduit\nhttps://raw.githubusercontent.com/err0rgod/skills/main/conduit/SKILL.md",
      },
      {
        heading: "From source",
        code: "git clone https://github.com/err0rgod/conduit.git\ngit clone https://github.com/err0rgod/conduit-extension.git\ncd conduit\ncorepack enable\npnpm install --frozen-lockfile\npnpm build",
      },
    ],
  },
  {
    slug: "quick-start",
    title: "Quick Start",
    summary:
      "Connect the extension, allow a test origin, and exercise the CLI-to-browser path.",
    blocks: [
      {
        heading: "1. Confirm the three installations",
        bullets: [
          "The backend installer completed and conduit doctor can run.",
          "Conduit Extension is installed from Chrome Web Store, Edge Add-ons, or Firefox Add-ons.",
          "The Conduit skill directory or SKILL.md is installed in the AI harness.",
          "Pin the Conduit extension so its status is always visible.",
        ],
      },
      {
        heading: "2. Grant a test site",
        paragraphs: [
          "Open https://example.com, open the Conduit popup, and choose Allow this site. Accept the browser's native permission prompt. This grant is separate from the daemon domain policy. The popup also offers an explicit Allow all sites action for local workflows; it requests only http://*/* and https://*/* after the user's click.",
        ],
      },
      {
        heading: "3. Run a read-only flow",
        code: "conduit status\nconduit browser tabs\nconduit browser open https://example.com\nconduit browser snapshot --mode interactive\nconduit browser screenshot",
        note: "Navigation also needs browser.navigate and an allowed domain. Add permissions deliberately; do not enable every capability for convenience.",
      },
    ],
  },
  {
    slug: "architecture",
    title: "Architecture",
    summary:
      "Follow a validated request across the CLI or MCP adapter, daemon, extension, and browser tab.",
    blocks: [
      {
        heading: "Vertical slice",
        code: "AI agent\n  ↓ MCP or CLI\nConduit daemon\n  ↓ authentication · policy · confirmation · audit\nChromium extension\n  ↓ tabs · scripting · optional browser APIs\nBrowser tab\n  ↓\nStructured result",
      },
      {
        heading: "Ownership boundaries",
        bullets: [
          "conduit owns the daemon, protocol authority, security policy, CLI, MCP adapter, and release installer.",
          "conduit-extension owns browser execution and the Manifest V3 user interface.",
          "conduit-web owns this static GitHub Pages site.",
          "Backend CI and releases pin external repositories to immutable commits.",
        ],
      },
      {
        heading: "Trust boundaries",
        paragraphs: [
          "Every inbound message is runtime validated. The daemon is the policy enforcement point. Page content and element metadata remain untrusted data even after a request is authorized.",
        ],
      },
    ],
  },
  {
    slug: "browser-extension",
    title: "Browser Extension",
    summary:
      "Load, connect, grant per-origin or explicitly broad access, and disconnect the least-privilege MV3 extension.",
    blocks: [
      {
        heading: "Connection",
        paragraphs: [
          "The extension discovers the local backend through the registered Native Messaging host. The host returns a bounded, versioned connection description; the extension then authenticates to the loopback daemon. Tokens are not pasted into the popup.",
        ],
      },
      {
        heading: "Site access",
        paragraphs: [
          "The production manifests declare HTTP and HTTPS origins as optional host permissions. Inspecting, scripting, or capturing a page fails until the browser grants the origin. Per-site access is the normal path. The popup can also request exactly http://*/* and https://*/* through a user click and the browser's native permission prompt; Conduit does not persist a second broad-access flag, and the browser owns the resulting permission state.",
        ],
        bullets: [
          "Allow this site requests only the current origin.",
          "Revoke this site removes that origin grant.",
          "Allow all sites is an explicit popup-only opt-in for both HTTP and HTTPS host patterns; it is never requested by the background service worker.",
          "Revoke all sites removes those two broad patterns and leaves per-site grants and daemon policy unchanged.",
          "Emergency disconnect closes the daemon connection without changing browser permissions.",
        ],
      },
      {
        heading: "Browser APIs",
        paragraphs: [
          "Core actions use tabs and scripting. The published extension is v0.1.3. One key-free Chromium store package serves Chrome, Edge, and Brave. Firefox has a separate package and omits Chromium's debugger permission, so hover, physical key input, and approved file uploads are unavailable there. Broad host access remains optional, user-initiated, and independent from daemon authorization.",
        ],
      },
    ],
  },
  {
    slug: "daemon",
    title: "Daemon",
    summary:
      "Operate the authenticated local service and understand its safe network defaults.",
    blocks: [
      {
        heading: "Lifecycle",
        code: "conduit start\nconduit status\nconduit logs\nconduit restart\nconduit stop",
      },
      {
        heading: "Diagnostics",
        paragraphs: [
          "conduit doctor checks the Node runtime, configuration, storage, daemon, extension connection, Native Messaging registration, MCP build, remote safety, and local documentation build when present.",
        ],
        code: "conduit --json doctor",
      },
      {
        heading: "Network safety",
        paragraphs: [
          "The default bind is 127.0.0.1:9222. A non-loopback address is rejected unless remote mode is explicitly enabled and both a TLS certificate and key are configured.",
        ],
      },
    ],
  },
  {
    slug: "mcp-server",
    title: "MCP Server",
    summary:
      "Expose the validated browser tools to any MCP client through the installed conduit command.",
    blocks: [
      {
        heading: "Client configuration",
        code: '{\n  "mcpServers": {\n    "conduit": {\n      "command": "conduit",\n      "args": ["mcp"]\n    }\n  }\n}',
      },
      {
        heading: "Available tools",
        bullets: [
          "conduit_status",
          "browser_list_tabs, browser_get_active_tab, browser_open_tab, browser_close_tab, browser_focus_tab",
          "browser_navigate, browser_go_back, browser_go_forward, browser_reload",
          "browser_snapshot, browser_get_visible_text, browser_screenshot",
          "browser_click, browser_type, browser_clear, browser_select, browser_hover, browser_scroll, browser_press_key, browser_wait_for",
          "browser_upload_file and browser_get_downloads",
        ],
        note: "MCP does not bypass extension site access, daemon permissions, domain policy, or confirmation requirements.",
      },
    ],
  },
  {
    slug: "cli",
    title: "CLI",
    summary:
      "Manage Conduit and issue direct browser requests with readable or JSON output.",
    blocks: [
      {
        heading: "Management commands",
        code: "conduit setup\nconduit service status\nconduit doctor\nconduit config path\nconduit permissions\nconduit devices\nconduit upgrade --check\nconduit uninstall",
      },
      {
        heading: "Machine-readable output",
        paragraphs: [
          "Place --json before the subcommand. Failures use a non-zero exit status and structured error details where available.",
        ],
        code: "conduit --json status\nconduit --json browser tabs",
      },
      {
        heading: "Browser commands",
        code: 'conduit browser active\nconduit browser open https://example.com\nconduit browser snapshot --mode interactive\nconduit browser click --element e3\nconduit browser type --element e4 "hello"',
      },
    ],
  },
  {
    slug: "browser-tools",
    title: "Browser Tools",
    summary:
      "Choose the narrowest action and anticipate its permission and targeting requirements.",
    blocks: [
      {
        heading: "Tabs and navigation",
        bullets: [
          "Read: list tabs and get the active tab.",
          "Interact: open, close, and focus tabs.",
          "Navigate: navigate, back, forward, and reload after domain evaluation.",
        ],
      },
      {
        heading: "Page interaction",
        bullets: [
          "Read: snapshot, visible text, scroll, wait, and screenshot.",
          "Interact: click and hover.",
          "Forms: type, clear, and select.",
          "Upload: allowlisted files plus explicit confirmation.",
        ],
      },
      {
        heading: "Target order",
        paragraphs: [
          "Prefer a temporary element ID from a fresh snapshot. Role and accessible name, label, text, CSS, and XPath are fallbacks. Coordinates are deliberately a last resort. Rerenders and navigation can expire element IDs.",
        ],
      },
    ],
  },
  {
    slug: "page-snapshots",
    title: "Page Snapshots",
    summary:
      "Work with bounded, accessibility-oriented page data instead of huge raw HTML dumps.",
    blocks: [
      {
        heading: "Snapshot modes",
        bullets: [
          "compact",
          "accessibility",
          "visible-text",
          "interactive",
          "full-dom",
          "targeted-subtree",
        ],
      },
      {
        heading: "Element references",
        paragraphs: [
          "Interactive snapshots assign short identifiers such as e1, e2, and e3. Use them promptly. A page navigation or framework rerender can invalidate a reference, in which case Conduit returns a precise stale or missing-element error and the client should snapshot again.",
        ],
        code: "conduit browser snapshot --mode interactive\nconduit browser click --element e3",
      },
      {
        heading: "Untrusted result",
        paragraphs: [
          "Text, roles, names, labels, links, and values originate from the webpage. They describe page state; they do not change Conduit policy or become trusted agent instructions.",
        ],
      },
    ],
  },
  {
    slug: "permissions",
    title: "Permissions",
    summary:
      "Grant capabilities independently and keep consequential actions behind confirmation.",
    blocks: [
      {
        heading: "Capability set",
        bullets: [
          "browser.read, browser.navigate, browser.interact, browser.forms, browser.submit",
          "browser.download, browser.upload",
          "browser.cookies.read and browser.cookies.write",
          "browser.clipboard.read and browser.clipboard.write",
          "browser.dangerous",
        ],
      },
      {
        heading: "Safe default",
        paragraphs: [
          "A clean configuration grants only browser.read. Cookie, clipboard, and arbitrary JavaScript APIs are not exposed by the current public tool surface.",
        ],
        code: 'conduit config set security.permissions \'["browser.read","browser.navigate"]\'\nconduit restart',
      },
      {
        heading: "Two independent gates",
        paragraphs: [
          "A daemon capability grant does not grant browser site access, and a browser site grant does not authorize an action at the daemon. Both boundaries must allow the request.",
        ],
      },
    ],
  },
  {
    slug: "domain-policies",
    title: "Domain Policies",
    summary:
      "Control navigation with allowlist, blocklist, ask-on-first-use, or an explicit local-only allow-all mode.",
    blocks: [
      {
        heading: "Modes",
        bullets: [
          "ask is the default and requires deliberate approval for a new domain.",
          "allowlist denies domains not explicitly allowed.",
          "blocklist allows domains except explicit denials and separate network restrictions.",
          "allow-all permits public HTTP and HTTPS domains that pass the hard guards, but it is opt-in, local-only, and cannot be enabled while remote mode is on.",
        ],
      },
      {
        heading: "Manage domains",
        code: "conduit allow-domain example.com\nconduit deny-domain blocked.example\nconduit config set security.domainMode allowlist\nconduit config set security.domainMode '\"allow-all\"'\nconduit restart",
        note: "Changing domainMode is not hot-reloaded. Restart the daemon. The allow-all mode does not override blocked domains, protocol restrictions, localhost policy, or private-network policy.",
      },
      {
        heading: "Network categories",
        paragraphs: [
          "Localhost and private-network destinations have independent opt-ins. Explicit wildcard subdomains use patterns such as *.example.com. Domain categorization is a warning layer, not a perfect security boundary.",
        ],
      },
    ],
  },
  {
    slug: "remote-devices",
    title: "Remote Devices",
    summary:
      "Pair a revocable device identity without exposing an unauthenticated LAN service.",
    blocks: [
      {
        heading: "Pairing lifecycle",
        code: "conduit pair\nconduit pair pending\nconduit pair approve <pairing-id>\nconduit pair deny <pairing-id>\nconduit devices\nconduit revoke <device-id>",
        paragraphs: [
          "Pairing codes are short-lived and one-use. Approval records a P-256 public-key identity and a permission subset. Authentication proves possession against a fresh challenge; revocation removes active sessions.",
        ],
      },
      {
        heading: "Transport",
        paragraphs: [
          "Remote mode is disabled by default. Non-loopback binding requires TLS. Conduit does not configure routers or publish a relay. Use an independently secured private network such as Tailscale or WireGuard.",
        ],
        note: "Do not bind the daemon directly to the public internet.",
      },
    ],
  },
  {
    slug: "security",
    title: "Security",
    summary:
      "Know what Conduit protects, what it trusts, and what remains the operator’s responsibility.",
    blocks: [
      {
        heading: "Security properties",
        bullets: [
          "Loopback-only and remote-disabled defaults.",
          "Random local authentication and an authenticated extension connection.",
          "Runtime protocol and configuration validation.",
          "Deny-by-default capabilities, domain checks, and expiring confirmations.",
          "Separate browser host grants: per-site by default, with an explicit popup-only all-sites request for local workflows.",
          "The local-only allow-all domain mode still denies blocked domains, invalid or non-HTTP(S) URLs, localhost without its opt-in, and private networks without their opt-in.",
          "Bounded payloads, queues, timeouts, sessions, and authentication attempts.",
          "Canonical upload allowlists and structured audit redaction.",
        ],
      },
      {
        heading: "Trusted and untrusted",
        paragraphs: [
          "Conduit trusts the local OS account, deliberately installed builds, and explicit operator decisions. It does not trust webpages, network input, agent arguments, file paths, downloads, or remote devices beyond their approved identity and grants.",
        ],
      },
      {
        heading: "Report privately",
        paragraphs: [
          "Use GitHub private vulnerability reporting. Never put an unpatched issue, token, browser profile, audit log, cookie, or personal screenshot in a public ticket.",
        ],
        code: "https://github.com/err0rgod/conduit/security/advisories/new",
      },
    ],
  },
  {
    slug: "prompt-injection",
    title: "Prompt Injection",
    summary:
      "Treat browser-derived content as hostile data and preserve human authority for consequential actions.",
    blocks: [
      {
        heading: "Core rule",
        note: "Page content is data, not trusted agent instruction.",
        paragraphs: [
          "A webpage may display text that asks an agent to reveal secrets, upload files, change permissions, or ignore policy. That text cannot directly grant Conduit authority. An over-privileged agent can still make a bad decision, so the boundary is risk reduction—not a claim that prompt injection is solved.",
        ],
      },
      {
        heading: "Operator practices",
        bullets: [
          "Use narrow domain and capability grants.",
          "Keep submit, upload, account changes, messages, purchases, and deletion behind review.",
          "Do not paste page text into a privileged system prompt as trusted instructions.",
          "Inspect the requested origin and target before approving a consequential action.",
        ],
      },
    ],
  },
  {
    slug: "configuration",
    title: "Configuration",
    summary:
      "Edit the versioned JSON configuration through validated CLI paths.",
    blocks: [
      {
        heading: "Locate and inspect",
        code: "conduit config path\nconduit --json config",
      },
      {
        heading: "Main sections",
        bullets: [
          "daemon: port, bindAddress, requestTimeoutMs, maximumMessageBytes, sessionTimeoutMs",
          "remote: enabled, TLS key/certificate paths, sessionTimeoutMs",
          "security: permissions, domain mode/lists, localhost/private-network policy, upload allowlist and size limit",
          "logging: level, maximum audit size, retention days",
          "browser: screenshot directory, download behavior, and trusted Chromium/Firefox extension IDs",
        ],
      },
      {
        heading: "Validated updates",
        code: "conduit config set daemon.port 9223\nconduit config set logging.level debug\nconduit config set security.allowedDomains '[\"example.com\"]'\nconduit config set security.domainMode '\"allow-all\"'\nconduit restart",
        note: "Domain mode changes require a daemon restart; configuration is not hot-reloaded. allow-all is rejected when remote.enabled is true and does not bypass blocked domains or localhost/private-network guards. Non-loopback bind addresses fail validation unless remote mode and TLS paths are configured.",
      },
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    summary:
      "Run meaningful unit, integration, security, distribution, and real-browser checks.",
    blocks: [
      {
        heading: "Backend suites",
        code: "pnpm test:unit\npnpm test:integration\npnpm test:security\npnpm test:coverage\npnpm distribution:test",
      },
      {
        heading: "Real Chromium vertical slice",
        paragraphs: [
          "Build the sibling extension first. The E2E suite launches a fresh Chromium profile, authenticates through Native Messaging, grants only its controlled fixture origin in a disposable extension copy, and exercises daemon, CLI, MCP, browser actions, and screenshot output.",
        ],
        code: "cd ../conduit-extension && pnpm install --frozen-lockfile && pnpm build\ncd ../conduit\nCONDUIT_EXTENSION_PATH=../conduit-extension/apps/extension/dist pnpm test:e2e",
      },
      {
        heading: "Cross-platform CI",
        paragraphs: [
          "Backend validation runs on Ubuntu, Windows, and macOS. Real extension E2E runs on Ubuntu Chromium.",
        ],
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    summary:
      "Diagnose setup, extension connection, permissions, domains, and stale browser references.",
    blocks: [
      {
        heading: "Start with doctor",
        code: "conduit doctor\nconduit status\nconduit logs",
      },
      {
        heading: "Extension is disconnected",
        bullets: [
          "Run conduit setup again to repair the current-user Native Messaging registration.",
          "Confirm the daemon is running and restart the browser after installing the extension.",
          "For Chrome or Edge, copy the store item ID and run conduit extension trust <extension-id> once.",
          "The ID jkdlmcpkgkooilffjegfjmkanoelbmbl applies only to the unpacked development build.",
          "Firefox uses the fixed add-on ID conduit@err0rgod.github.io.",
        ],
      },
      {
        heading: "Permission or domain denied",
        bullets: [
          "Open the extension popup on the target tab and allow that origin. Per-site access is the recommended first fix.",
          "If the operator deliberately chose broad local access, use Allow all sites in the popup and accept the browser's prompt; denial falls back to per-site authorization.",
          "Check conduit permissions and the configured domain mode. allow-all still cannot bypass blocked domains or network guards.",
          "Grant only the missing daemon capability, then restart.",
          "Localhost and private networks require separate policy flags.",
        ],
      },
      {
        heading: "Element reference expired",
        paragraphs: [
          "Take a new interactive snapshot after navigation or a dynamic rerender, then retry with the new element ID.",
        ],
      },
    ],
  },
  {
    slug: "development",
    title: "Development",
    summary:
      "Work across the backend, extension, and documentation repositories with reproducible commands.",
    blocks: [
      {
        heading: "Repository layout",
        code: "conduit/            # daemon, security, CLI, MCP, release\nconduit-extension/  # browser core and MV3 extension\nconduit-web/        # React/Vite documentation site",
      },
      {
        heading: "Backend quality gate",
        code: "pnpm format\npnpm lint\npnpm typecheck\npnpm test\npnpm build\npnpm docs:build",
      },
      {
        heading: "Documentation workflow",
        paragraphs: [
          "Backend docs commands locate a nested CI checkout, a sibling conduit-web checkout, or CONDUIT_DOCS_PATH. The site repository has its own lint and build workflow and deploys independently to Pages.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contributing",
    summary:
      "Make focused changes with security impact, limitations, and real validation made explicit.",
    blocks: [
      {
        heading: "Before coding",
        paragraphs: [
          "Search existing issues and pull requests. Open a design issue before protocol changes, mandatory browser permissions, remote transports, credential storage, or any behavior that increases agent authority.",
        ],
      },
      {
        heading: "Pull request checklist",
        bullets: [
          "Keep commits coherent and avoid secrets, browser data, and personal screenshots.",
          "Explain user-visible and security impact.",
          "Add a regression at the smallest meaningful layer.",
          "Run format, lint, typecheck, tests, build, and relevant browser/docs checks.",
          "State unsupported scenarios instead of faking success.",
        ],
      },
      {
        heading: "Project policies",
        paragraphs: [
          "Contributions are MIT licensed and follow the repository Code of Conduct and private security-reporting policy.",
        ],
      },
    ],
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    summary:
      "See what is reliable today and the highest-value work that remains before a stable release.",
    blocks: [
      {
        heading: "Working today",
        bullets: [
          "Checksummed backend and multi-browser extension GitHub Release artifacts.",
          "No-admin setup and Native Messaging auto-discovery.",
          "Authenticated CLI/MCP-to-daemon-to-extension vertical slice.",
          "Tabs, navigation, snapshots, interactions, screenshots, allowlisted upload, download observation, and opt-in all-sites host controls.",
          "Independent per-site browser access and local-only backend allow-all domain mode; both preserve their enforcement guards.",
          "Domain/capability policy, confirmations, pairing identity, redacted audits, and cross-platform CI.",
        ],
      },
      {
        heading: "Before 1.0",
        bullets: [
          "Complete confirmation and audit management UI in the extension.",
          "Improve iframe, shadow DOM, popup, dialog, and dynamic-page coverage.",
          "Exercise remote networking on a documented private-network deployment.",
          "Complete Chrome Web Store, Edge Add-ons, and Firefox Add-ons review and replace search links with final listing URLs.",
          "Define a compatibility policy and supported release line.",
        ],
      },
    ],
  },
  {
    slug: "changelog",
    title: "Changelog",
    summary:
      "Review the public release history and security-relevant behavior changes.",
    blocks: [
      {
        heading: "v0.1.2 backend · v0.1.3 extension · 23 August 2026",
        bullets: [
          "The extension adds a key-free Chromium store package for Chrome, Edge, and Brave plus a Firefox-specific package.",
          "The backend adds the opt-in local-only security.domainMode allow-all value; default ask behavior and hard domain/network guards remain unchanged.",
          "Native Messaging supports explicitly trusted Chrome, Edge, Brave, Chromium, and Firefox identities.",
          "Installers now install only the backend, then direct users to a browser store and the portable Conduit Agent Skill.",
        ],
      },
      {
        heading: "v0.1.1 · 20 August 2026",
        bullets: [
          "Production extension changed from broad host access to explicit per-origin permission prompts.",
          "Page inspection, interaction, and screenshots now reject ungranted origins.",
          "Backend E2E validates a fresh Native Messaging connection with the standalone extension repository.",
          "Release builds pin the compatible extension to an immutable validated commit.",
        ],
      },
      {
        heading: "v0.1.0 · 20 August 2026",
        paragraphs: [
          "Initial pre-1.0 foundation with the typed protocol, authenticated daemon, browser extension, CLI, MCP adapter, policy and pairing primitives, real Chromium E2E, cross-platform CI, and checksummed user installers.",
        ],
        code: "https://github.com/err0rgod/conduit/releases",
      },
    ],
  },
];

export const defaultDoc = docs[0];

export function findDoc(slug: string | undefined): DocPage | undefined {
  return docs.find((page) => page.slug === slug);
}
