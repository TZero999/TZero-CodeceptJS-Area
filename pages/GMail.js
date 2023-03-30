const { I } = inject();

module.exports = {
  locators: {
    submit: "#identifierNext > div > button > span",
    restart: "a[href*='restart']",
  },


  

  async retry() {
    await I.click(this.locators.restart);
    //I.waitForNavigation();
    await I.click("a.button[data-action='sign in']");
    //I.waitForNavigation(); 
    I.fillField("input[type='email']","skarabahatyyaroslav@gmail.com");
    I.click(this.locators.submit);
  },

}
