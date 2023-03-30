const { I } = inject();

module.exports = {

  locators: {
    loginPanel: "div[id*='basket']",
    countryCode:"span[class*=checked]",
  },

  authorize(){
    I.waitForElement(this.locators.loginPanel);
    I.click('a[data-wba-header-name="Login"]');

    tryTo( ()=> {
        //I.dontSee(this.locators.countryCode, '+7');
        I.click(this.locators.countryCode);
        I.seeElement('div.drop-list');
        I.click('+7');
    })

    I.pressKey('Tab');
    I.type('9313543081')

    I.uncheckOption("span[class*='__decor']");
    //pause();
    //I.click('#requestCode');
  },
}
