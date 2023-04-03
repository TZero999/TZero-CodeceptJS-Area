const { assert } = require("@vue/compiler-core");

Feature('Testing Challenges.org Testing automatization');

Scenario('Complition 18 test cases: ', async ({ I }) => {

// Подготовливаем входные данные и переменные:
    
    // Массив тестовых данных:
    let testsDataArray = [
        'Smith',                                // Позитивный тест
        ' Smith',                               // Пробел перед именем
        'Smith ',                               // Пробел после имени
        'Smith Wesson',                         // 2 слова (пробел посередине)
        'S',                                    // Минимальное число символов
        ' ',                                    // Пробел
        '',                                     // Ничего не введено 
        '<img src="logo.png">',                  // HTML-тег
        '👍',                                   // Non ASCII
        'Кирилл',                               // Кириллические символы
        '@!_',                                  // Специальные символы
        'SmithAndWessonCorporationProduct',     // 32 символа
        'SmithAndWessonCorporationAgent',       // 30 символов
        "'SQL-injection'",                      // SQL-инъекция
        '<script>alert("Aaaaaa!")</script>',    // XSS-атака
                                                // Сюда добавится код из комментария
                                                // Сюда добавится код из Cookie
                                                // Сюда добавится имя недостающего CSS
    ];

    // Открываем страницу и проверяем, что мы попали на неё:
        I.amOnPage('http://testingchallenges.thetestingmap.org/index.php');
        I.seeTitleEquals('Testing Challenges');

    // Объявляем "быстрые" переменные:
        let input = 'input[id="firstname"]';
        let enter = async function(){I.click('input[type="submit"]')};

    // Выполняем функции добавления в массив данных из комментария, лога и cookie-са:
        await grabCommentCode();
        await grabCookieValue();
        await grabInputFromLogs();
// Выполняем в браузере скрипт изменения аттрибута скрытого элемента input:
    I.executeScript(userAsAdmin);

//  Счётчик обнаруженных деффектов обнуляется при полном обновлении страницы.
//  Убеждаемся, что счётчик действительно обнулен:
    I.seeTextEquals('0', 'span[class="values-tested"]');
    
// Запускаем основную тест-функцию
    await start();

    // Функция проработки тестовых случаев с заданными ранее входными данными:
    async function start(){
        for (value of testsDataArray) {
            I.fillField(input, value); enter()
        }
    }

// Проверяем, что счётчик обнаруженных деффектов установился на значение 18:
    I.seeTextEquals('18', 'span[class="values-tested"]');

    // Функция извлечения необходимого значения Cookie-са:
    async function grabCookieValue() {
        let cookie = await I.grabCookie('TestingChallenge');
        let cookieSTR = JSON.stringify(cookie).slice(77, 96);
        console.log('Код из Cookie: ', cookieSTR);
        testsDataArray.push(cookieSTR);
    }

    // Функция извлечения имени отсутствующего css-файла из логов:
    async function grabInputFromLogs() {
        let allLogs = await I.grabBrowserLogs()
        allLogs = JSON.stringify(allLogs);
        
        if (allLogs.includes('Failed to load resource') && allLogs.includes('.css')){
            let pos = allLogs.indexOf('.css')+4;
            
            allLogs = allLogs.slice(pos-100,pos);
            
            let missingCSS = allLogs.split('/');
            missingCSS = missingCSS[missingCSS.length-1];
            testsDataArray.push(missingCSS);
        } else {
            console.log('No CSS missing');
        }
    }

    // Функция извлечения комментария:
    async function grabCommentCode() {
        let pageSource = await I.grabSource();
        let comment = pageSource.split(' ').slice(-150);
        comment = comment[comment.length-1];
        comment = comment.split('-->');
        testsDataArray.push(comment[0]);
    }

    // Функция получения прав админа путём изменения аттрибута скрытого элемента input:
    async function userAsAdmin(){
        let hint = document.getElementsByName('user_right_as_admin')[0];
        hint.setAttribute('value','1');
        console.log('Done! You have received administrator rights!');
    };
});

/* Комментарии:
    Добавляемые элементы массива:
    oi32jnxd42390slk345
    dfjwGGe82H43g3uRiy53h
    detailsoverviewnow.css
*/