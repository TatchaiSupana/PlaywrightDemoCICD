import path from 'path';
import { RegisPage } from '../elements/page/regispage';
import { Configuration } from '../services/configuration';
import { test as base } from '@playwright/test';
import * as appSettings from '../configurations/app-settings.json';

const fs = require('fs');
const APP_SETTING_LOCAL_PATH = '../configurations/app-settings.local.json';

interface TestFixtures {
  isTabletView: boolean;
  isWebView: boolean;
  isMobileView: boolean;
  regisPage: RegisPage;
  configuration: Configuration;
}
const test = base.extend<TestFixtures>({

  configuration: async ({}, use, context) => {
    let settings = appSettings;
    if (fs.existsSync(path.resolve(__dirname, APP_SETTING_LOCAL_PATH))) {
      const dataObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, APP_SETTING_LOCAL_PATH)));
      settings = { ...settings, ...dataObject };
    }
    const configuration = new Configuration(settings, context.parallelIndex);
    context.setTimeout(configuration.appSettings.timeout);
    await use(configuration);
  },
  regisPage: async ({ page, configuration }, use) => {
    page.setDefaultTimeout(configuration.appSettings.timeout);
    await page.goto(configuration.appSettings.baseUrl);
    const loginPage = new RegisPage(page);
    await use(loginPage);
  },
});
export { test };
