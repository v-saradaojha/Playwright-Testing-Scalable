import { test, expect } from "@playwright/test";
import * as playwright from "@playwright/test";
import { runSimplePageTest } from "../util";
import { v4 as uuid } from 'uuid';
import * as dotenv from "dotenv";
dotenv.config();
for (let i = 1; i <= 10; i++) {
  test(`Run scalable Test linux  ${i}`, async () => {
    let serviceRunId = uuid();
    const wsEndpoint = `${process.env.PLAYWRIGHT_SERVICE_URL}?cap={"os":"${'linux'}","runId":"${serviceRunId}"}`;
    const _browser = await playwright["chromium"].connect(wsEndpoint, { headers: { 'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN } });
    expect(_browser.isConnected()).toBe(true);
    const userAgent = await runSimplePageTest(_browser);
    expect(userAgent).toContain("HeadlessChrome");
    _browser.close();
  });
  test(`Run scalable Test windows  ${i}`, async () => {
    let serviceRunId = uuid();
    const wsEndpoint = `${process.env.PLAYWRIGHT_SERVICE_URL}?cap={"os":"${'windows'}","runId":"${serviceRunId}"}`;
    const _browser = await playwright["chromium"].connect(wsEndpoint, { headers: { 'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN } });
    expect(_browser.isConnected()).toBe(true);
    const userAgent = await runSimplePageTest(_browser);
    expect(userAgent).toContain("HeadlessChrome");
    _browser.close();
  });
}
