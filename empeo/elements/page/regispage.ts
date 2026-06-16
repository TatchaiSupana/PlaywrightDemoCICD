import { expect, Locator, Page, FrameLocator } from '@playwright/test';
import { BasePage } from '../base-page';

export class RegisPage extends BasePage {
    readonly assentButtonLocator: Locator = this.page.getByRole('button', { name: 'ยินยอม' });
    readonly videoButtonLocator: Locator;
    readonly closeVideoButtonLocator: Locator;
    readonly registerFrame: FrameLocator;
    readonly taxIdInputLocator: Locator;
    readonly emailInputLocator: Locator;
    readonly firstNameInputLocator: Locator;
    readonly lastNameInputLocator: Locator;
    readonly mobileInputLocator: Locator;
    readonly submitTryForFreeButtonLocator: Locator;
    readonly couponCodeInputLocator: Locator;
    readonly applyCouponButtonLocator: Locator;
    readonly acceptPolicyCheckboxLocator: Locator;
    readonly tryFreeButtonLocator: Locator;
    readonly companyThaiRadioLocator: Locator;
    readonly companyOthersRadioLocator: Locator;
    readonly businessTypeDropdownLocator: Locator;
    readonly userAmountDropdownLocator: Locator;
    // readonly businessTypeSelectLocator: Locator;
    // readonly userSelectLocator: Locator;


    constructor(page: Page) {
        super(page);
        this.registerFrame = page.frameLocator('#empeoRegister');
        this.taxIdInputLocator = this.registerFrame.getByTestId('input_textfield_input_registration_tax_id');
        this.emailInputLocator = this.registerFrame.getByTestId('input_textfield_input_registration_email');
        this.firstNameInputLocator = this.registerFrame.getByTestId('input_textfield_input_register_first_name');
        this.lastNameInputLocator = this.registerFrame.getByTestId('input_textfield_input_register_last_name');
        this.mobileInputLocator = this.registerFrame.getByRole('textbox', { name: 'เบอร์มือถือ*' });
        this.submitTryForFreeButtonLocator = this.registerFrame.getByTestId('button_submit_registration_try_for_free');
        this.acceptPolicyCheckboxLocator = this.registerFrame.getByTestId('input_checkbox_registration_checkbox');
        this.tryFreeButtonLocator = this.registerFrame.getByRole('button', { name: 'ทดลองใช้ฟรี' });
        this.couponCodeInputLocator = this.registerFrame.getByTestId('input_text_registration_coupon_code');
        this.applyCouponButtonLocator = this.registerFrame.getByTestId('input_button_registration_btn_apply');
        this.videoButtonLocator = this.registerFrame.getByTestId('button_button');
        this.closeVideoButtonLocator = this.registerFrame.getByTestId('icon_close_video');
        this.companyThaiRadioLocator = this.registerFrame.getByTestId('input_radio_registration_company_thai');
        this.companyOthersRadioLocator = this.registerFrame.getByTestId('input_radio_registration_company_others');
        this.businessTypeDropdownLocator = this.registerFrame.getByTestId('dropdown_selection_registration_company_type');
        this.userAmountDropdownLocator = this.registerFrame.getByTestId('dropdown_selection_registration_user_amount');
        // this.businessTypeSelectLocator;
        // this.userSelectLocator;

    }

    async registerFieldEmpty() {
        await this.assentButtonLocator.click();
        await this.tryFreeButtonLocator.click();
    }

    async acceptCookie() {
        await expect(this.registerFrame.getByRole('button', { name: 'ทดลองใช้ฟรี' })).toBeVisible();
        await this.assentButtonLocator.click();
    }

    async couponVerify(coupon: string) {
        await this.registerFrame.getByText('ใช้โค้ดส่วนลด').click();
        await this.couponCodeInputLocator.fill(coupon);
        await this.applyCouponButtonLocator.click();
    }

    async businessType(businessType: string) {
        await this.businessTypeDropdownLocator.click();

        await this.registerFrame
            .getByText(businessType, { exact: true })
            .click();
    }

    async userAmount(userAmount: string) {
        await this.userAmountDropdownLocator.click();
        await this.registerFrame
            .getByText(userAmount, { exact: true })
            .click();
    }

}