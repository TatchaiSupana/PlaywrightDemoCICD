import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class HomePage extends BasePage{
    readonly topupButtonLocator: Locator = this.page.getByTestId('nok-more-nok-cash-icon')
    readonly notloginModalLocator: Locator = this.page.getByTestId('global-modal')
    constructor(page: Page) {
        super(page);
      }

    async topupNokCash(){
        await this.topupButtonLocator.click();
    }

    async notLoginModal(){
        await expect(this.notloginModalLocator).toHaveText(/กรุณาล็อกอินเพื่อเข้าใช้งาน/)
    }
}