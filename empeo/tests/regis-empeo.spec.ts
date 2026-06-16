import { expect, Page } from '@playwright/test';
import { test } from '../fixtures/default-fixture';

test.describe('Register empeo positive', () => {
  test('Landing Register page is success', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await expect(regisPage.registerFrame.getByText('ทดลองใช้งาน empeo ฟรี!')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('ไม่จำเป็นต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ')).toBeVisible();
    await expect(regisPage.taxIdInputLocator).toBeVisible();
    await expect(regisPage.firstNameInputLocator).toBeVisible();
    await expect(regisPage.lastNameInputLocator).toBeVisible();
    await expect(regisPage.emailInputLocator).toBeVisible();
    await expect(regisPage.tryFreeButtonLocator).toBeVisible();

  });

  test('Able to view video', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await expect(regisPage.registerFrame.getByText('ทดลองใช้งาน empeo ฟรี!')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('ไม่จำเป็นต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ')).toBeVisible();
    await regisPage.videoButtonLocator.click();
    await regisPage.closeVideoButtonLocator.click();

  });

  test('Able to accept policy', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await expect(regisPage.registerFrame.getByText('ทดลองใช้งาน empeo ฟรี!')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('ไม่จำเป็นต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ')).toBeVisible();
    await expect(regisPage.acceptPolicyCheckboxLocator).not.toBeChecked();
    await regisPage.acceptPolicyCheckboxLocator.click();
    await expect(regisPage.acceptPolicyCheckboxLocator).toBeChecked();

    });

    test('Able to select register without thai company', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await expect(regisPage.registerFrame.getByText('ทดลองใช้งาน empeo ฟรี!')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('ไม่จำเป็นต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ')).toBeVisible();
    await regisPage.companyOthersRadioLocator.click();
    
    });
  
    test('Able to select business and user amount', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await regisPage.businessType('ยานยนต์');
    await regisPage.userAmount('51-100');
    
    });
});


test.describe('Register empeo negative', () => {
  test('Unable to register empeo when field is empty', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await regisPage.tryFreeButtonLocator.click();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกเลขประจำตัวผู้เสียภาษีหรือชื่อบริษัท')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกประเภทธุรกิจ')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกผู้ใช้งาน')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกอีเมล')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกอีเมล')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกอีเมล')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณากรอกเบอร์โทรศัพท์มือถือ')).toBeVisible();
    await expect(regisPage.registerFrame.getByText('กรุณารับทราบนโยบายความเป็นส่วนตัว และข้อกำหนดและเงื่อนไขการใช้งาน')).toBeVisible();
    
  });

  test('Unable to register empeo when tax id is incorrect', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await regisPage.taxIdInputLocator.fill('Incorrect Tax ID');
    await regisPage.tryFreeButtonLocator.click();
    await expect(regisPage.registerFrame.getByText('ไม่พบบริษัทที่คุณค้นหา')).toBeVisible();

  });

  test('Unable to register empeo when email is invalid format', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await regisPage.emailInputLocator.fill('TEST');
    await regisPage.tryFreeButtonLocator.click();
    await expect(regisPage.registerFrame.getByText('กรุณาใส่อีเมลที่ถูกต้อง')).toBeVisible();

  });

  test('Unable to register empeo when mobile phone is invalid format', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await regisPage.mobileInputLocator.fill('2132');
    await regisPage.tryFreeButtonLocator.click();
    await expect(regisPage.registerFrame.getByText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')).toBeVisible();
    
  });

  test('Unable to register empeo when coupon is incorrect', async ({ page, regisPage }) => {
    await regisPage.acceptCookie();
    await regisPage.couponVerify('2132');
    await regisPage.tryFreeButtonLocator.click();
    await expect(regisPage.registerFrame.getByText('คูปองโค้ดไม่ถูกต้อง')).toBeVisible();
    
  });


});
