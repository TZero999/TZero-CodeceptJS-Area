Feature ('Registration: No phone number');

Scenario('Registration Form without number', async ({ I }) => {

    // Открываем страницу и ждём конечной навигации
    I.amOnPage('https://www.eldorado.ru/');
    I.waitForNavigation("Вход или регистрация", 10);
    wait(2);

    // Совершаем необходимые клики для открытия форму регистрации юридических лиц
    I.click("Вход или регистрация");
    I.click("Вход или регистрация для юридических лиц");
    I.click("Регистрация для юридического лица");
    I.click('Я юридическое лицо','label');

    // Начинаем заполнять поля
    I.fillField( {css: 'input[name=email]'},'ff8thebestgame@mail.ru')

    I.click( {xpath: '//*[@id="modalPortal"]/div/div/form/div[1]/span[5]/div/input'} );
    I.type('ff8thebestgame@mail.ru');
    
    I.fillField('name','Скволл');
    I.fillField('lastName','Леонхарт');

    I.fillField( {css: 'input[inputmode=numeric]'}, '23081998');
    
    I.fillField('password', secret('crdjkkkexibquthj') );
    I.fillField('passwordConfirm', secret('crdjkkkexibquthj') );
    
    I.click("Зарегистрироваться");
    pause();
    
    // Осуществляем поиск сообщения, указывающего нам на пустое поле с номером телефона
    I.see('Мобильный телефон не указан') 
});