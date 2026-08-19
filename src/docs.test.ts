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
});
