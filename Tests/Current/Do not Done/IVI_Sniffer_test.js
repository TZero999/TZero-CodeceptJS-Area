Feature('IVI Sniffer Testing automatization');

Scenario('Get promocode for ivi.ru: ', async ({ I }) => {

  /* Часть первая */
    /* Предисловие:
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
  
  I.amOnPage('http://task.test.ivi.ru/login');
  I.see('Привет!');

    // Подготавливаем переменные:
    let url = 'http://task.test.ivi.ru/'
    const login = 'Login';
    const pass = 'Password';
    let token = await I.grabAttributeFrom('input[id="csrf_token"]','value');
    let session = await I.grabCookie('session');
    session = 'session='+session.value;

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
    let trueLogin = logpass[5];
    let truePass = logpass[9];

  // Вводим полученные значения логина и пароля в предназначенные для них поля и жмём кнопку подтверждения.
  I.closeCurrentTab();
  I.fillField('input[id="login"]',trueLogin);
  I.fillField('input[id="password"]', truePass);
  I.click('input[type="submit"]');
    
  /* Часть вторая */
    /* Предисловие:
    Итак, мы на новой странице. Поставленная перед нами цель - подменить запрос, отправив вместо одного из трёх представленных
    вариантов ответов свой ответ "да". Можно было бы сделать это проще, предварительно изменив код страницы.

    Вариант с изменением кода страницы я представлю в виде функции после блока кода тестового сценария.
    Однако вызывать эту функцию я не буду и сделаю всё на условиях второго задания - отправлю POST-запрос с ответом "да".

    Затем в теле ответа сервера я отыщу ссылку для редиректа, почищу её от лишних символов и перейду по ней.
    На этом вторая часть теста будет завершена.
    */
  
  I.seeInTitle('Второе задание');
    
    // Подготавливаем тело нового POST-запроса. Заголовки изменять не будем.
    body = { 
      'csrf_token': token,
      'select':  'да'
    }; 

  // Отправляем POST-запрос. Напрямую получить url после редиректа у меня не удалось, но не беда.
  post = await I.sendPostRequest(url+'second_task', body, headers);
  
    // Url для редиректа можем получить из объекта data ответа сервера:
    let curlPos = post.data.indexOf('name');
    curl = post.data.slice(curlPos,curlPos+50);
    curl = curl.split('"')[1];

  // Совершаем переход по новому url адресу и переходим к финальному этапу теста:
  I.amOnPage(url+curl);

  /* Часть третья */
    /* Предисловие:
    В финальном задание нам предлагается найти в json-объекте платформы, на которых доступен некий контент, посчитать их количество и
    ввести цифру, соответсвующую количеству платформ в специальное поле, после чего нажать кнопку подтверждения. 
    
    Пробежав глазами по объекту можно быстро обнаружить, что платформы указаны в массиве значений ключа "subsites_availability".
    Однако заранее искать в объекте именно этот ключ, на мой взгляд, было бы откровенным читерством.
    
    Поэтому мы обнаружим нужный нам объект другим способом. Нынче ложно найти некий контент, недоступный для платформ iOS или Android.
    Потому я осуществлю поиск значений "ios" и "android". Затем произведу несколько операций над местом их обнаружения и 
    получу массив, являющийся значением ключа "subsites_availability", получу его длину и введу её (ИЛИ её+1) в нужное
    поле. Затем нажму кнопку "Получить код" и третья часть теста будет завершена.
    */
  
  let txt = await I.grabTextFrom('code')
  console.log(txt);

    // Подготовим несколько переменных
    let posIos = 0;
    let posAndroid = 0;
    let start = 0;

  posIos = txt.indexOf('ios2');
  posAndroid = txt.indexOf('android');
  console.log('Номер символа для iOS: ' + posIos);
  console.log('Номер символа для Android: ' + posAndroid)
  
  start = findStartPos(posIos, posAndroid);
  console.log(start);

  pause();


  /* Финал. */
    /* Послесловие:
    В данной части теста я произведу проверку на верное выполнение предыдущего задания, скопирую полученный нами код в буфер обмена и
    на этом тест можно будет считать заверщённым.
    */


  function findStartPos(pos1, pos2){
      let start;
      if (pos1 == -1 && pos2 == -1){ return start = 'Контент не предназначен для платформ iOS и Android' };
      
      if (pos1 == -1) { return start = pos2 };
      if (pos2 == -1) { return start = pos1 };
      if (pos1 > pos2) { return start = pos2 
        } else {
          return start = pos1
      };
  }

})

/*
  Упаковать в функции действия с новыми переменными.
*/

/*

Нерабочий switch. Надо бы переработать.
  switch (pos1, pos2) {
    case (-1, pos2):
      start = pos2;
      console.log('pos1 = -1');
      break;
    
    case (pos1, -1):
      start = pos1;
      console.log('pos2 = -1');
      break;

    case (pos1 > pos2):
      start = pos2;
      console.log('pos1 > pos2');
      break;

    case (pos2 > pos1):
      start = pos1;
      console.log('pos2 > pos1');
      break;
  }
  
  */