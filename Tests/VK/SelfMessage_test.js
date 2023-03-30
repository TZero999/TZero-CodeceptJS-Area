Feature('VK self message with authorization');

// Before(({ login }) => {
//     login('user1'); // login using user session
//  });


Scenario('Login on VK.ru', async ({ I }) => {
    I.amOnPage("https://vk.com");
    I.fillField("input[name='login']", "jaroslawandolegskoro@mail.ru");
    I.click("label[for*='save_user_checkbox']");

    I.click('button[type="submit"]');
    
    I.fillField("[autocomplete='current-password']", secret("IT58+iU24+TS72-LK912"));
    I.click('button[type="submit"]');

    I.waitForElement("div[class*='ResendCode']");
    I.click("div[class*='ResendCode']");
    I.click("div[class*='ResendCode']");
    
        I.amOnPage("https://mail.google.com/");
        I.see("Перейти в Gmail");

            I.fillField("input[type='email']","skarabahatyyaroslav@gmail.com");
            I.click("#identifierNext > div > button > span");

               
            tryTo( ()=> {
                I.click('a[href*="restart"]');
                pause();
                I.click("a.button[data-action='sign in']");   
                I.fillField("input[type='email']","skarabahatyyaroslav@gmail.com");
                I.click("#identifierNext > div > button > span");
            });
               
            I.fillField("input[type='password']", secret("Gmail_Yaroslaw_58-24-72"));
            I.waitForNavigation("load");

        I.click('div[aria-label="Соцсети"]');
        I.click('span[name="ВКонтакте"]');
        let passcode = I.grabTextFrom('//div//table//b');
        I.closeCurrentTab();

    I.fillField("input[class*='codeInput']",passcode);

    I.seeElement("img[class*='profileImg']");
})

/*Scenario('Write message to myself on VK.ru', ({ I }) => {})

jaroslawandolegskoro@gmail.com
66Jq^wg6c^

skarabahatyyaroslav@gmail.com
Gmail_Yaroslaw_58-24-72





    gmailPasscode();
    
    I.fillField("input[class*='codeInput']",passcode);

    I.seeElement("img[class*='profileImg']");

    
    function gmailPasscode() {
        I.amOnPage("https://mail.google.com/");
        I.see("Перейти в Gmail");

            I.fillField("input[type='email']","jaroslawandolegskoro@gmail.com");
            I.click("#identifierNext > div > button > span");

                 tryTo( ()=> {
                I.click('a[href*="restart"]');
                    I.click("a.button[data-action='sign in']");   
                    I.fillField("input[type='email']","jaroslawandolegskoro@gmail.com");
                    I.click("#identifierNext > div > button > span");
                })

            I.fillField("input[type='password']", secret("66Jq^wg6c^"));
            I.waitForNavigation();

        I.click('div[aria-label="Соцсети"]');
        I.click('span[name="ВКонтакте"]');
        let passcode = I.grabTextFrom('//div//table//b');
        I.closeCurrentTab();
    return passcode;
    }

*/