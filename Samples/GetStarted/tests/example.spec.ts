import { test, expect } from "@playwright/test";
import { runSimplePageTest } from "../util";

for (let i = 0; i < 200; i++) {
  test(`Run scalable Test ${i}`, async () => {
    let serviceRunId = process.en.PLAYWRIGHT_SERVICE_RUN_ID;
    const wsEndpoint = `${process.env.PLAYWRIGHT_SERVICE_URL}?cap={"os":"${'linux'}","runId":"${serviceRunId}"}`;
    const _browser = await playwright["chromium"].connect(wsEndpoint, { headers: { 'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN } });
    expect(_browser.isConnected()).toBe(true);
    const userAgent = await runSimplePageTest(_browser);
    expect(userAgent).toContain("HeadlessChrome");
    _browser.close();
  });
}
