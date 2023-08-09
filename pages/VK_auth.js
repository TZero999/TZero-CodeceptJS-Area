const { I } = inject();

module.exports = {

  locators: {
    submit: "button[type='submit']",
    resend: "div[class*='ResendCode']",
    profile: "img[class*='profileImg']"
  },

  authorize(){
    I.click(this.locators.submit)

  },

  codeResend(){
    I.waitForElement(this.locators.resend);
    I.click(this.locators.resend);
    I.wait(0.5);
    I.click(this.locators.resend);
  },

  validate() {
    I.seeTitleEquals('Новости');
    I.seeElement(this.locators.profile);
  }
}