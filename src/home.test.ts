import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(import.meta.dirname, "pages", "Home.tsx"),
  "utf8",
);

describe("home page installation path", () => {
  it("shows the three required steps in order", () => {
    const backend = home.indexOf("Install the backend");
    const extension = home.indexOf("Install the published extension");
    const skill = home.indexOf("Install SKILL.md");

    expect(backend).toBeGreaterThanOrEqual(0);
    expect(extension).toBeGreaterThan(backend);
    expect(skill).toBeGreaterThan(extension);
  });

  it("links directly to the published extension and public skill", () => {
    expect(home).toContain("gjhipjgiapijcdnflldnoenafeegmfpc");
    expect(home).toContain(
      "chromewebstore.google.com/detail/conduit-extension",
    );
    expect(home).toContain("github.com/err0rgod/skills/tree/main/conduit");
    expect(home).toContain("Chrome extension published");
  });
});
