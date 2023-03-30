Feature('VK self message with authorization');

Scenario('Login on GMail and VK, sending vk message to myself', async ({ I, VK_auth, GMail_auth }) => {

    // Заходим на VK.com, вводим логин, пароль и отправляем код подтверждения на GMail почту
    // I.amOnPage("https://vk.com");
    // I.fillField("input[name='login']", "jaroslawandolegskoro@mail.ru");
    // I.click("label[for*='save_user_checkbox']");

    // VK_auth.authorize();
    
    // I.fillField("[autocomplete='current-password']", secret("IT58+iU24+TS72-LK912"));
    // VK_auth.authorize();
    // VK_auth.codeResend();

    {
        // Заходим на страницу GMail, логинимся и получаем код подтверждения из письма
        I.amOnPage("https://mail.google.com/");
        I.see("Перейти в Gmail");

            I.fillField("input[type='email']","skarabahatyyaroslav@gmail.com");
            I.click("#identifierNext > div > button > span");
            
            if (I.dontSeeElement("input[type='password']")){
                tryTo( async ()=> {
                    GMail_auth.retry()
                });
            };

            I.fillField("input[type='password']", secret("Gmail_Yaroslaw_58-24-72"));
            
            // Я жму какую-то кнопку подтверждения
            pause();

            I.waitForNavigation("load");

            // Я вижу что-то, что даёт мне понять, что я нахожусь на нужной странице
            pause();

        I.click('div[aria-label="Соцсети"]');
        I.click('span[name="ВКонтакте"]');
        let passcode = I.grabTextFrom('//div//table//b');

    // Возвращаемся на страницу VK, вводим код подтверждения и заканчиваем авторизацию
    I.switchToPreviousTab();
    I.fillField("input[class*='codeInput']",passcode);

    //Я жму какую-то кнопку подтверждения
    
    VK_auth.validate();
    }
})

/*

*/