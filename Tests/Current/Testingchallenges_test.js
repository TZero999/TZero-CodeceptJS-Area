const { assert } = require("@vue/compiler-core");

Feature('Testing Challenges.org Testing automatization');

// Before((test) ) => {cookiesCleaner(); };

Scenario('All 17 available test', async ({ I }) => {

    // Массив тестовых случаев:
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
                                                // Сюда добавится код из Cookie
                                                // Сюда добавится код из комментария
                                                // Сюда добавится имя недостающего CSS                          
    ];

    // Открываем страницу
    I.amOnPage('http://testingchallenges.thetestingmap.org/index.php');
    I.seeTitleEquals('Testing Challenges');

    // Объявляем необходимые переменные
    let input = 'input[id="firstname"]';
    let enter = async function(){I.click('input[type="submit"]')};
        
    I.grabComment();
    await grabCookieValue();
    await grabInputFromLogs();

//  Счётчик обнаруженных деффектов обнуляется при полном обновлении страницы.

// На всякий случай убеждаемся, что счётчик обнулен.
    I.seeTextEquals('0', 'span[class="values-tested"]');
    
    // Запускаем основную тест-функцию
    await start();

    // Функция проработки тестовых случаев
    async function start(){
        // for (let i = 0; i <= testsDataArray.length-1; i++) {
        //     I.fillField(input, testsDataArray[i]);    enter();
        // }

        for (value of testsDataArray) {
            I.fillField(input, value); enter()
        }
        pause();
    }

    // Функция чтения необходимого Cookie-са
    async function grabCookieValue() {
        let cookie = await I.grabCookie('TestingChallenge');
        let cookieSTR = JSON.stringify(cookie).slice(77, 96);
        console.log('Код из Cookie: ', cookieSTR);
        testsDataArray.push(cookieSTR);
    }

    // Функция извлечения имени отсутствующего css-файла из логов
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

    // Функция подмены тела запроса
    //I.sendPostRequest('http://testingchallenges.thetestingmap.org/index.php',{'body':'firstname= Smith&firstexecution=1&found=2&golhart=1&sartepace=&tgrgr=&GGTTre=&preaprea=&listsoftests=%3Cli%3EAverage+value%3C%2Fli%3E%3Cli%3EEmpty+value%3C%2Fli%3E&mmmmret=1&mfmmfdmret=&hrgefed=&apo=&scrt=&httersv=&httdsfrgersv=&user_right_as_admin=1&sopedace=&hds3ref=&sctte75rt=&xcfetrwdst=&xfhqmsntowt=&httr3gfdersv=&formSubmit=Submit'});
});


//  tryTo(() => I.seeTextEquals((!'0'), 'span[class="values-tested"]'), 
//              cookiesCleaner(), 
//  );

// Функция очистки счётчика пройденных тестов - пока что просто затычка.
//    async function cookiesCleaner() {
//        I.clearCookie('PHPSESSID');
//        console.log('Cookies was clean!');
//    }


// oi32jnxd42390slk345    
// I.seeTextEquals(String(i+1), 'span[class="values-tested"]');

//    let comments = document.documentElement.innerHTML;
//comments = comments.split('<!--');


//temp1 = document.documentElement.innerHTML;
//temp1 = temp1.split('<!--');
//temp2 = temp1[temp1.length-1]; - получаем строку с нужным комментарием.
//temp3 = temp2.split(' ');
//temp3 = temp3[temp3.length-1].slice(SOMETHING); 

// Перехват трафика через fetch.
// Метод POST на адрес http://testingchallenges.thetestingmap.org/index.php
//	"user_right_as_admin": "1";


//await fetch("http://testingchallenges.thetestingmap.org/index.php", {
//    "credentials": "include",
//    "headers": {
//        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0",
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
//        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
//       "Content-Type": "application/x-www-form-urlencoded",
//        "Upgrade-Insecure-Requests": "1"
//    },
//    "referrer": "http://testingchallenges.thetestingmap.org/index.php",
//    "body": "firstname= Smith&firstexecution=1&found=2&golhart=1&sartepace=&tgrgr=&GGTTre=&preaprea=&listsoftests=%3Cli%3EAverage+value%3C%2Fli%3E%3Cli%3EEmpty+value%3C%2Fli%3E&mmmmret=1&mfmmfdmret=&hrgefed=&apo=&scrt=&httersv=&httdsfrgersv=&user_right_as_admin=1&sopedace=&hds3ref=&sctte75rt=&xcfetrwdst=&xfhqmsntowt=&httr3gfdersv=&formSubmit=Submit",
//    "method": "POST",
//    "mode": "cors"
// }); 