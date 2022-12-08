Feature('Eldorado Login');

Scenario('Login of an existing user on Eldorado.ru', ({ I }) => {

    I.amOnPage('https://www.eldorado.ru/');
    I.waitForNavigation("Вход или регистрация", 10);
    wait(2);

    I.click("Вход или регистрация");
    I.click("Вход по e-mail/логину");
    I.fillField({ css: 'input[name=login]'},'ff8thebestgame@mail.ru');
    I.fillField({ css: 'input[name=password]'}, secret('crdjkkkexibquthj'));
    I.click("Войти");
    I.see(" отправлено письмо со ссылкой подтверждения.");
});