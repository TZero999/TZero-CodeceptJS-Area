Feature('IVI Sniffer Testing automatization');

Scenario('Get promocode for ivi.ru: ', async ({ I }) => {

  /* Часть первая:
    Первая часть теста требует от нас ввода валидных логина и пароля. Получить валидные значения логина и пароля нам предлагают 
    перейдя по ссылке, скрывающейся в заголовке ответа сервера "login-and-password". Ответ с нужным нам заголовком мы получим 
    только при условие отправки POST-запроса с корректными id-сессии и csrf-токеном. В случае, если POST-запрос будет сформулирован
    неверно в заголовках ответа сервера ключ "login-and-password" будет отсутствовать.

    Т.О. первым делом я получу значения id текущей сессии и csrf-токена, использую их для отправки корректного POST-запроса на сервер,
    в заголовках ответа сервера найду заголовок с ключом "login-and-password", извлеку из заголовка нужный нам url страницы с валидными
    логином и паролем.

    Затем я осуществлю переход по полученному url, сохраню значения валидных логина и пароля в переменные и использую их для перехода
    ко второй части теста.
  */
  
  // Переходим на страницу с первой частью теста и проверяем, что мы попали на нужную страницу: 
    I.amOnPage('http://task.test.ivi.ru/login');
    I.seeInTitle('Авторизация');

  // Подготавливаем переменные:
    // const endpoint = TARGET_URL + 'endpointName'
    let url = 'http://task.test.ivi.ru/'
    let login = 'Login';
    let pass = 'Password';
    
    let token = await I.grabAttributeFrom('input[id="csrf_token"]','value');
    let session = await I.grabCookie('session');
    session = 'session=' + session.value;

  // Используем функцию, чтобы заполнить поля login и password невалидными данными:
    fieldFilling(I, login, pass);
    // Логин и пароль не должны быть приняты, о чём будет гласить красная надпись. Проверяем:
    I.seeElement('[style*="red"]');

  // Подготавливаем данные для POST-запроса:
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": session,
    };

    let body = { 
      'csrf_token': token,
      'login':login,
      'password':pass 
    };
    
  // Отправляем Post-запрос на сервер для получения заголовка "login-and-password":
    let post = await I.sendPostRequest(url+'login', body, headers);
      
  // Отсекаем от ответа сервера значение заголовка "login-and-password":
    let curl = post.headers.get('login-and-password');
    curl = curl.split('/'); 
    curl = curl[1].split(' ')[0];

  // Открываем новую вкладку, переходим по ссылке из заголовка и копируем текст:
    I.openNewTab();
    I.amOnPage(url+curl);
    let arr = await I.grabTextFrom('//html/body');

  // Отсекаем от строки лишние символы и получаем валидные значения логина и пароля:
    let logpass = arr.split('"');
    login = logpass[5];
    pass = logpass[9];

  // Закрываем вторую вкладку и используем функцию ввода и подтверждения данных логина и пароля:
  I.closeCurrentTab();
  fieldFilling(I, login, pass);
    
  /* Часть вторая:
    
    Итак, мы на новой странице. Поставленная перед нами цель - подменить запрос, отправив вместо одного из трёх представленных
    вариантов ответов свой ответ "да". Можно было бы сделать это проще, предварительно изменив код страницы.

    Вариант с изменением кода страницы я представлю в виде функции после блока кода тестового сценария.
    Однако вызывать эту функцию я не буду и сделаю всё на условиях второго задания - отправлю POST-запрос с ответом "да".

    Затем в теле ответа сервера я отыщу ссылку для редиректа, почищу её от лишних символов и перейду по ней.
    На этом вторая часть теста будет завершена.
  */
  
  // Проверяем, что после выполнения функции с валидными данными мы перешли на новую страницу:
    I.seeInTitle('Второе задание');

  // Для начала выберем любой вариант ответа и убедимся, что веб-сайт выдаст ошибку:
    I.checkOption(`input[id="select-${getRandomInt(2)}"]`);
    I.click('input[type="submit"]');
    let errTxt = await I.grabHTMLFrom('[style*="red"]');

  // Подготавливаем тело нового POST-запроса. Заголовки изменять не будем.
    body = { 
      'csrf_token': token,
      'select':  errTxt.split('"')[1]
    }; 

  // Отправляем POST-запрос. Напрямую получить url после редиректа у меня не удалось, но не беда.
    post = await I.sendPostRequest(url+'second_task', body, headers);
  
  // Url для редиректа можем получить из объекта data ответа сервера:
    let curlPos = post.data.indexOf('name');
    curl = post.data.slice(curlPos,curlPos+50);
    curl = curl.split('"')[1];

  // Совершаем переход по новому url адресу и переходим к финальному этапу теста:
    I.amOnPage(url+curl);

  /* Часть третья
    
    В финальном задание нам предлагается найти в json-объекте платформы, на которых доступен некий контент, посчитать их количество и
    ввести цифру, соответсвующую количеству платформ в специальное поле, после чего нажать кнопку подтверждения. 
    
    Пробежав глазами по объекту можно быстро обнаружить, что платформы указаны в массиве значений ключа "subsites_availability".
    Однако заранее искать в объекте именно этот ключ, на мой взгляд, было бы откровенным читерством.
    
    Поэтому мы обнаружим нужный нам объект другим способом. Нынче ложно найти некий контент, недоступный для платформ iOS или Android.
    Потому я осуществлю поиск значений "ios" и "android". Затем произведу несколько операций над местом их обнаружения и 
    получу массив, являющийся значением ключа "subsites_availability", получу длину массива и введу её в нужное поле.
    Затем нажму кнопку "Получить код" и третья часть теста будет завершена.
  */
  
  // Поместим объект json в переменную txt, подготовим несколько новых переменных:
    let txt = await I.grabTextFrom('code')
  
    let posIos = 0;
    let posAndroid = 0;
    let start = 0;

  // Осуществим поиск в тексте названий двух самых распространённых платформ:
    posIos = txt.indexOf('ios' || 'iOS' || 'iOs');
    posAndroid = txt.indexOf('android' || 'Android');
  
  // Выполним функцию поиска стартовой позиции массива поддерживаемых платформ, узнаем и введём его длину:
    start = findStartPos(posIos, posAndroid);
    I.fillField('input[id="count"]' ,quantity(txt.slice(start-3,start+100)));
    I.click('input[type="submit"]');

  /* Финал.
  
    В данной части теста я произведу проверку на верное выполнение предыдущего задания, скопирую полученный нами код в буфер обмена и
    на этом тест можно будет считать заверщённым.
  */

  // Проверяем заголовок страницы, на которой мы оказались:
    I.seeInTitle('Готово!');
    I.dontSeeElement('[style*="red"]');
  
  // Выделяем "жирный" текст, копируем его в буфер обмена:
    I.doubleClick('b');
    I.pressKey(['Control','C']);
    let code = await I.grabTextFrom('b');

  // Выводим в консоль необязательные информирующие сообщения:
    console.log(`В результате выполнения теста мы получили код: ${code}.`);
    console.log('Код скопирован в буфер обмена. Тест успешно завершён.');
})

// Функция заполнения полей для первой части теста:
  function fieldFilling(I, login, pass) {
    I.fillField('input[id="login"]', login);
    I.fillField('input[id="password"]', pass);
    I.click('input[type="submit"]');
  }

// Функция для выбора случайного чекбокса во второй части теста:
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Функция поиска стартовой позиции массива с доступными для контента платформами:
  function findStartPos(pos1, pos2){
    let start;
    if (pos1 == -1 && pos2 == -1){ return start = 'Контент не предназначен для платформ iOS и Android' };
          
    if (pos1 == -1) { return start = pos2 };
    if (pos2 == -1) { return start = pos1 };
    
    if (pos1 > pos2) { return start = pos2 
      } else {
      return start = pos1
    };
  };

// Функция вычисления длины массива доступных для контента платформ:
  function quantity(txt) {
    txt = txt.split('['); 
    txt = txt[1].split(']')[0];
    let qnt = txt.split(',').length;
    return qnt;
}

// Неиспользуемая функция - подмена значений HTML-элементов для прохождения второй части теста:
  async function attrChanger(I){
    I.executeScript(() => {
      let slct = document.querySelector('input[id="select-0"]');
      let slctTxt = document.querySelector('label[for="select-0"]');
      slctTxt.textContent='Да';
      slct.value="да";
    });
  I.checkOption('input[id="select-0"]');
  I.click('input[type="submit"]');
  };