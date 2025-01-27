const { signupLocators } = require('../locators/signup-locators');

class CirculaSignUpPage {

    constructor(page) {
        this.page = page;
    }

    async gotoSignUpPage() {
        await this.page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');
    }

    async setupAndSelectCountry(country) {
        await this.gotoSignUpPage();

        await this.page.locator(signupLocators.emailInput).fill('muhammadrafay+911@live.co.uk');;
        await this.page.locator(signupLocators.passwordInput).fill('abcd1234');

        const termsAndConditionsCheck = this.page.locator(signupLocators.termsAndConditions);
        await termsAndConditionsCheck.click({ force: true });

        await this.page.locator(signupLocators.tryForFreeButton).click();
        await this.page.locator(signupLocators.firstName).fill('Muhammad');;
        await this.page.locator(signupLocators.lastName).fill('Rafay');
        await this.page.locator(signupLocators.mobileNumber).fill('123456789');
        await this.page.locator(signupLocators.nextStepButton).click();
        await this.page.locator(signupLocators.companyName).fill('QA test');

        const countryInput = this.page.locator(signupLocators.ddCountry);
        await countryInput.fill(country);
        const selectedValue = await countryInput.inputValue();
        return selectedValue;
    }

    async selectHowYouHeared(value) {
        await this.page.locator(signupLocators.ddHowYouHear).click();
        const valueToSelect = await this.page.locator(`//div[contains(text(), '${value}')]`);
        await valueToSelect.click();
    }

    async clickCreateAccount() {
        await this.page.locator(signupLocators.btnCreateAccount).click();
    }

    async verifySuccessMessage() {
        const successMessage = await this.page.locator(signupLocators.successfulSignUp).textContent();
        return successMessage;
    }
}
module.exports = { CirculaSignUpPage };