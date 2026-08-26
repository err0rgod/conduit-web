import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(import.meta.dirname, "pages", "Home.tsx"),
  "utf8",
);

describe("home page installation path", () => {
  it("shows the four required steps in order", () => {
    const backend = home.indexOf("Install the backend");
    const extension = home.indexOf("Download the extension from GitHub");
    const load = home.indexOf("Load it in Chrome");
    const skill = home.indexOf("Install SKILL.md");

    expect(backend).toBeGreaterThanOrEqual(0);
    expect(extension).toBeGreaterThan(backend);
    expect(load).toBeGreaterThan(extension);
    expect(skill).toBeGreaterThan(load);
  });

  it("links directly to the GitHub extension fallback and public skill", () => {
    expect(home).toContain("conduit-extension-unpacked-v0.1.3.zip");
    expect(home).toContain("Chrome Web Store temporarily");
    expect(home).toContain("chrome://extensions");
    expect(home).toContain("github.com/err0rgod/skills/tree/main/conduit");
    expect(home).toContain(
      "The Chrome Web Store listing is temporarily unavailable",
    );
  });
});
