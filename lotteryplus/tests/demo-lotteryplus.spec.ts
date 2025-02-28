import { expect, Page } from '@playwright/test';
import { test } from '../fixtures/default-fixture';

test.describe('Top-up NokCash', () => {
  test('Unable to top-up NokCash when not log in lotteyplus.com', async ({ page, homePage }) => {
    await homePage.topupNokCash();
    await homePage.notLoginModal();
  });

});
