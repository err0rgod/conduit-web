export type PrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export const privacyEffectiveDate = "August 24, 2026";

export const privacySections: PrivacySection[] = [
  {
    title: "Summary",
    paragraphs: [
      "Conduit is an open-source, local-first browser-control bridge. The Conduit Extension does not include advertising, analytics, telemetry, or a Conduit-operated cloud service. Browser data is handled only to perform actions requested by the user through an authenticated Conduit client.",
      "The Conduit project does not sell personal information and does not receive browser data from the extension. By default, the extension communicates only with the Conduit daemon installed on the same device.",
    ],
  },
  {
    title: "Data the extension can handle",
    paragraphs: [
      "The extension can handle the following information when it is necessary for a user-approved browser action:",
    ],
    bullets: [
      "Tab information, including URLs, titles, active state, identifiers, and tab-group information.",
      "Page content made available after the user grants access to a specific HTTP or HTTPS site, including visible text, structured snapshots, element information, and page state.",
      "Interaction details supplied by an authorized client, such as navigation targets, clicks, keyboard input, form values, scrolling, and selection actions.",
      "Screenshots requested by an authorized client.",
      "Approved upload paths and bounded recent download metadata when the user separately enables the required optional browser capability.",
      "Operational information such as the local daemon port and authentication token, connection state, emergency-pause state, active session, and a bounded summary of recent control activity.",
    ],
  },
  {
    title: "How data is used",
    paragraphs: [
      "Conduit uses browser data only to provide the browser-control functionality requested by the user, enforce permissions and domain policy, return action results, show local connection and audit status, diagnose failures, and protect the authenticated control channel.",
      "Conduit does not use browser data for advertising, profiling, credit decisions, data brokerage, or unrelated product analytics. The extension does not request cookie access and does not intentionally collect browsing activity unrelated to requested Conduit operations.",
    ],
  },
  {
    title: "Where data goes",
    paragraphs: [
      "The extension sends action requests and results only to the authenticated Conduit daemon on the user's device through the loopback interface, normally 127.0.0.1. The daemon independently applies capability permissions, domain rules, confirmation requirements, audit redaction, and transport controls.",
      "If the user explicitly enables Conduit remote access or connects another trusted client, requested browser results may be returned to that user-configured client through the daemon. Remote access is disabled by default. Conduit project maintainers and unrelated third parties do not receive this data.",
    ],
  },
  {
    title: "Local storage and retention",
    paragraphs: [
      "The extension stores operational settings needed to authenticate and reconnect to the local daemon, represent connection and pause state, and show bounded privacy-safe activity metadata. Browser host-permission state is maintained by the browser; Conduit does not persist a separate flag for the Allow all sites grant.",
      "The extension does not intentionally persist page content, form values, screenshots, cookies, or arbitrary audit details. The daemon can store redacted audit records and configuration locally in the user's operating-system application-data directory. Removing the extension clears extension-local storage according to normal browser behavior; conduit uninstall removes the installed backend and its managed integration files.",
    ],
  },
  {
    title: "Permissions and user controls",
    paragraphs: [
      "Conduit requests browser permissions for tabs, scripting, storage, Native Messaging, and user-initiated active-tab operations. Website access is optional: per-site access is the recommended default, while Allow all sites requests only http://*/* and https://*/* after a direct click in the extension popup.",
    ],
    bullets: [
      "Revoke access for the current site or use Revoke all sites to remove the broad HTTP and HTTPS patterns.",
      "Revoke optional advanced-interaction or download capabilities from the extension popup.",
      "Pause all agent control using the emergency pause control.",
      "Restrict or deny domains and capabilities independently in the Conduit daemon.",
      "Remove the extension or run conduit uninstall when Conduit is no longer needed.",
    ],
  },
  {
    title: "Chrome Web Store Limited Use",
    paragraphs: [
      "Use of information received from Chrome APIs complies with the Chrome Web Store User Data Policy, including its Limited Use requirements. Information is used only to provide or improve the user-facing Conduit functionality. It is not transferred for advertising, profiling, sale, or unrelated purposes, and humans do not read browser content unless the user deliberately shares it for support or a disclosure is required for security or legal reasons.",
    ],
  },
  {
    title: "Website privacy",
    paragraphs: [
      "The Conduit website does not provide user accounts and does not include Conduit analytics, advertising trackers, or marketing cookies. It is hosted using GitHub Pages and delivered through Cloudflare DNS and network services. Those infrastructure providers may process standard request information, such as IP address, user agent, requested URL, and timestamps, under their own privacy policies and operational retention practices.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "Conduit uses authenticated local communication, explicit browser permission prompts, independent daemon policy, confirmation boundaries, and audit redaction. No software can eliminate every risk. Users should grant the narrowest practical site and capability access and avoid unattended use with sensitive accounts while Conduit remains pre-1.0.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      "Material changes to this policy will be published on this page with an updated effective date. Privacy questions can be opened in the Conduit Extension issue tracker as long as they do not contain tokens, browser data, screenshots, or other sensitive information. Security vulnerabilities should be reported privately through the repository's GitHub Security Advisories.",
    ],
  },
];
