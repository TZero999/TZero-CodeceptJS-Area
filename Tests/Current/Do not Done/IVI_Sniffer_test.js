Feature('IVI Sniffer Testing automatization');

Scenario('Get promocode for ivi.ru: ', async ({ I }) => {

    I.amOnPage('http://task.test.ivi.ru/login');
    I.see('Привет!');

    // Подготавливаем переменные:
    let url = 'http://task.test.ivi.ru/'
    const login = 'Login';
    const pass = 'Password';
    let token = await I.grabAttributeFrom('input[id="csrf_token"]','value');
    let session = await I.grabCookie('session');
    session = 'session='+session.value;

    // Отправляем Post-запрос на сервер для получения заголовка "login-and-password":
    
    let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": session,
    };

    let body = { 
        'csrf_token': token,
        'login':login,
        'password':pass 
    };
    
    const post = await I.sendPostRequest(url+'login', body, headers);
    console.log(post);
    
    // Отсекаем от ответа сервера значение заголовка "login-and-password":
    let curl = post.headers.get('login-and-password');
    curl = curl.split('/'); 
    curl = curl[1].split(' ');

    // Открываем новую вкладку, переходим по ссылке из заголовка и копируем текст:
    I.openNewTab();
    I.amOnPage(url+curl[0]);
    let arr = await I.grabTextFrom('//html/body');

    // Отсекаем от строки всё лишнее и получаем валидные значения логина и пароля:
    let logpass = arr.split('"');
    let trueLogin = logpass[5];
    let truePass = logpass[9];

    console.log('Настоящий логин: '+trueLogin+'. Настоящий пароль: '+truePass+'.');
    pause();
    
})

/*
  Упаковать в функции действия с новыми переменными.
*/