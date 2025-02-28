import path from 'path';
import { HomePage } from '../elements/page/homepage';
import { Configuration } from '../services/configuration';
import { test as base } from '@playwright/test';
import * as appSettings from '../configurations/app-settings.json';

const fs = require('fs');
const APP_SETTING_LOCAL_PATH = '../configurations/app-settings.local.json';

interface TestFixtures {
  isTabletView: boolean;
  isWebView: boolean;
  isMobileView: boolean;
  homePage: HomePage;
  configuration: Configuration;
}
const test = base.extend<TestFixtures>({
//   isWebView: ({ isMobile }, use) => {
//     use(!isMobile);
//   },
//   isMobileView: ({ isMobile, isTabletView }, use) => {
//     let isMobileView = false;
//     if (isMobile) {
//       isMobileView = !isTabletView;
//     }
//     use(isMobileView);
//   },
  // eslint-disable-next-line no-empty-pattern
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
  homePage: async ({ page, configuration }, use) => {
    page.setDefaultTimeout(configuration.appSettings.timeout);
    await page.goto(configuration.appSettings.baseUrl);
    const loginPage = new HomePage(page);
    await use(loginPage);
  },
});
export { test };
