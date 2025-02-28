import { Locator, Page } from '@playwright/test';

export class BasePage {

  loadingAnimation: Locator;

  protected page: Page;
  protected readonly endPoint: string;
  protected readonly timeoutBeforeRetry: number;
  protected readonly timeoutForAnimation: number;

  constructor(page: Page, endPoint: string = '') {
    this.page = page;
    this.endPoint = endPoint;
    this.timeoutBeforeRetry = 1000; // 1 sec
    this.timeoutForAnimation = 1000; // 1 sec
    this.loadingAnimation = this.page.locator('text=กำลังโหลดข้อมูล');
  }

  async visitPage(): Promise<this> {
    await this.page.goto(this.endPoint);

    return this;
  }
}
