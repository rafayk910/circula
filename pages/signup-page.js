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
        await this.firstStepPage('muhammadrafay@live.co.uk', 'abcd1234');
        await this.secondStepPage('Muhammad', 'Rafay', '12345678');
        return await this.finalStepPage('QA Test', country);
    }

    async firstStepPage(email, pass) {
        await this.page.locator(signupLocators.emailInput).fill(email);;
        await this.page.locator(signupLocators.passwordInput).fill(pass);
        await this.page.locator(signupLocators.termsAndConditions).click({ force: true });
        await this.page.locator(signupLocators.tryForFreeButton).click();

    }

    async secondStepPage(firstName, lastName, number) {
        await this.page.locator(signupLocators.firstName).fill(firstName);;
        await this.page.locator(signupLocators.lastName).fill(lastName);
        await this.page.locator(signupLocators.mobileNumber).fill(number);
        await this.page.locator(signupLocators.nextStepButton).click();
        
    }

    async finalStepPage(companyName, country) {
        await this.page.locator(signupLocators.companyName).fill(companyName);
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
