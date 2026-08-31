import { describe, expect, it } from "vitest";
import { defaultDoc, docs, findDoc } from "./docs";

const requiredPages = [
  "getting-started",
  "installation",
  "quick-start",
  "architecture",
  "browser-extension",
  "daemon",
  "mcp-server",
  "cli",
  "browser-tools",
  "page-snapshots",
  "permissions",
  "domain-policies",
  "remote-devices",
  "security",
  "prompt-injection",
  "configuration",
  "testing",
  "troubleshooting",
  "development",
  "contributing",
  "roadmap",
  "changelog",
];

describe("documentation catalog", () => {
  it("contains every required page exactly once", () => {
    expect(docs.map((page) => page.slug)).toEqual(requiredPages);
    expect(new Set(docs.map((page) => page.slug)).size).toBe(docs.length);
  });

  it("contains substantive content and resolves routes", () => {
    for (const page of docs) {
      expect(page.title.length).toBeGreaterThan(2);
      expect(page.summary.length).toBeGreaterThan(20);
      expect(page.blocks.length).toBeGreaterThan(0);
      expect(findDoc(page.slug)).toBe(page);
      expect(
        page.blocks.every((block) =>
          Boolean(
            block.paragraphs || block.bullets || block.code || block.note,
          ),
        ),
      ).toBe(true);
    }
    expect(defaultDoc.slug).toBe("getting-started");
    expect(findDoc("missing")).toBeUndefined();
  });

  it("documents broad browser access and daemon allow-all as separate opt-ins", () => {
    const extension = JSON.stringify(findDoc("browser-extension"));
    const permissions = JSON.stringify(findDoc("permissions"));
    const domains = JSON.stringify(findDoc("domain-policies"));
    const configuration = JSON.stringify(findDoc("configuration"));

    expect(extension).toContain("http://*/*");
    expect(extension).toContain("https://*/*");
    expect(extension).toContain("user click");
    expect(extension).toContain("browser owns");
    expect(permissions).toContain("Both boundaries must allow");

    expect(domains).toContain("ask is the default");
    expect(domains).toContain("local-only");
    expect(domains).toContain("does not override blocked domains");
    expect(configuration).toContain("remote.enabled is true");
    expect(configuration).toContain("not hot-reloaded");
  });

  it("documents backend, GitHub extension fallback, and skill installation in order", () => {
    const installation = JSON.stringify(findDoc("installation"));

    const backendIndex = installation.indexOf("1. Install the backend");
    const extensionIndex = installation.indexOf(
      "2. Install the browser extension",
    );
    const skillIndex = installation.indexOf("3. Install SKILL.md");
    expect(backendIndex).toBeGreaterThanOrEqual(0);
    expect(extensionIndex).toBeGreaterThan(backendIndex);
    expect(skillIndex).toBeGreaterThan(extensionIndex);
    expect(installation).toContain("conduit-extension-unpacked-v0.1.3.zip");
    expect(installation).toContain("chrome://extensions");
    expect(installation).toContain("Developer mode");
    expect(installation).toContain("jkdlmcpkgkooilffjegfjmkanoelbmbl");
    expect(installation).toContain(
      "https://addons.mozilla.org/en-US/firefox/addon/conduit/",
    );
    expect(installation).toContain("conduit extension trust");
    expect(installation).not.toContain("--extension-version");
    expect(installation).toContain(
      "https://github.com/err0rgod/skills/tree/main/conduit",
    );
    expect(installation).toContain(
      "https://raw.githubusercontent.com/err0rgod/skills/main/conduit/SKILL.md",
    );
  });
});
