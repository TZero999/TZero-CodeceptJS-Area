const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './Tests/Current/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true,
      restart: false,
      windowSize: '1024x768',
      waitForNavigation: ["domcontentloaded", "networkidle0"],
      pressKeyDelay: 10,
      waitForAction: 20,
      waitForTimeout: 5000,
      uniqueScreenshotNames: true,
      ignoreHTTPSErrors: true,
      chrome: {
        args: [
          //'--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          //'--disable-web-security',
          //'--no-first-run',
          '--no-sandbox',
          //'--no-zygote',
          //'--deterministic-fetch',
          //'--disable-features=IsolateOrigins',
          //'--disable-site-isolation-trials',
          '--allow-insecure-localhost',
          '--ignore-certificate-errors',
          '--lang=ru-RU'
        ],
      slowMo: 10,
      defaultViewport: null,
      }
    },

    MailSlurp: {
      require: '@codeceptjs/mailslurp-helper',
      apiKey: '<cbf10b0e3500f1eaada464992bad7d75202768bdb41ad57bcfb2c48555da2269>'
    },
    
    REST: {
      url: 'http://task.test.ivi.ru/login',
      prettyPrintJson: true,
    },

    JSONResponse: {},
   
  },

  plugins: {

    autoDelay: {
      enabled: true,
      // delayAfter: click, amOnPage

    },

    pauseOnFail: {
      enabled: true
    },

    tryTo: {
      enabled: true
    },

  },

  include: {
    I: './steps_file.js',
    VK_auth: "./pages/VK_auth.js",
    GMail_auth: "./pages/GMail.js",
    Wildberries_auth: "./pages/Wildberries.js"
  },

  name: 'CodeceptJS',
  translation: 'ru-RU'
}

/* Autologin Users:
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
users: {
  gmail: {
    login: (I) => {
      I.amOnPage('https://mail.google.com/');
      I.fillField('input[type="email"]', "skarabahatyyaroslav@gmail.com");
      I.click('#identifierNext > div > button > span');
      I.fillField("input[type='password']", secret("Gmail_Yaroslaw_58-24-72"));
    },
  },

  vk: {
    login: (I) => {
      I.amOnPage('https://vk.com/');
      I.fillField("input[name='login']", "jaroslawandolegskoro@mail.ru");
      I.click("label[for*='save_user_checkbox']");

      I.click('button[type="submit"]');

      I.fillField("[autocomplete='current-password']", secret("IT58+iU24+TS72-LK912"));
      I.click('button[type="submit"]');

      I.waitForElement("div[class*='ResendCode']");
      I.click("div[class*='ResendCode']");
      I.click("div[class*='ResendCode']");
    },
  },
},
}
*/
