Feature('IVI Sniffer Testing automatization');

async function POST(url, login, pass, token) {
    let post = await fetch(url, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1"
        },
        "referrer": "http://task.test.ivi.ru/login",
        "body": `csrf_token=${token}&login=${login}&password=${pass}`,
        "method": "POST",
        "mode": "cors"
    });
    let curl = post.headers.get('login-and-password');
    console.log(curl);
}


Scenario('Get promocode for ivi.ru: ', async ({ I }) => {

    const url = 'http://task.test.ivi.ru/login';
    const login = 'Login?';
    const pass = 'Password?';
    
    I.amOnPage('http://task.test.ivi.ru/login');
    I.see('Привет!');

    const token = await I.grabAttributeFrom('input[id="csrf_token"]','value');
    console.log(token);

    I.executeScript(POST);
    //I.amOnPage(url2)
    // Необходимо решить вопрос: вернуть значение из функции выше.
    pause();
})
