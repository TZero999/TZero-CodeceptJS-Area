Feature('Eldorado Login');

Scenario('Login of an existing user on Eldorado.ru', ({ I }) => {

    I.amOnPage('https://www.eldorado.ru/');
    I.waitForNavigation("Вход или регистрация");
      
    I.click("Вход или регистрация");
    I.click("Вход по e-mail/логину");
    
    I.fillField({ css: 'input[name=login]'},'ff8thebestgame@mail.ru');
    I.fillField({ css: 'input[name=password]'}, secret('crdjkkkexibquthj'));
    
    I.click("Войти");
    
    //На случай, если всплывающее окно загружается с задержкой
    I.retry({ retries: 3}).see("отправлено письмо со ссылкой подтверждения.");
});