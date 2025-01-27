const { test, expect } = require('@playwright/test');
const { CirculaSignUpPage } = require('../pages/signup-page');

test.describe('Dropdown functionality tests', () => {
    let circulaSignUp;

    test.beforeEach(async ({ page }) => {
        circulaSignUp = new CirculaSignUpPage(page);
    })

    test('Verify user can select Sweden from the dropdown', async () => {
        const selectedValue = await circulaSignUp.setupAndSelectCountry('Sweden')

        expect(selectedValue).toEqual('Sweden')
    });

    test('Verify successful form submission with Sweden selected', async () => {
        await circulaSignUp.setupAndSelectCountry('Sweden')
        await circulaSignUp.selectHowYouHeared('Tax Advisor')
        await circulaSignUp.clickCreateAccount();

        const successMessage = await circulaSignUp.verifySuccessMessage();
        expect(successMessage).toEqual('Great! Now please verify your email');
    });
});
