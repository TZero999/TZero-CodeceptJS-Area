Feature('mvideo.ru');

Scenario('Registration / Login on mvideo.ru', ({ I }) => {

    I.amOnPage('https://www.mvideo.ru/');
    I.click('Войти');
    I.see("Вход или регистрация",'h2');
    I.fillField({ css: 'input[type=tel]' }, secret('9313543081'));
    I.click('Продолжить');
    pause();
});
