import { describe, expect, it } from "vitest";
import { privacyEffectiveDate, privacySections } from "./privacy";

describe("privacy policy", () => {
  it("discloses extension data handling and user controls", () => {
    const policy = JSON.stringify(privacySections);

    expect(privacyEffectiveDate).toBe("August 24, 2026");
    expect(policy).toContain(
      "does not include advertising, analytics, telemetry",
    );
    expect(policy).toContain("127.0.0.1");
    expect(policy).toContain("Allow all sites");
    expect(policy).toContain("Revoke all sites");
    expect(policy).toContain("Chrome Web Store User Data Policy");
    expect(policy).toContain("GitHub Pages");
    expect(policy).toContain("Cloudflare");
  });
});
