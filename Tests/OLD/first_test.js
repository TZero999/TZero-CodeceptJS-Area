const { pause } = require("codeceptjs");

Feature('first');

Scenario('Check Github main page', ({ I }) => {
  I.amOnPage('https://github.com/');
  I.see('Sign in');
});



/*
Когда размер окна меньше некого значения n - мы не видим пункт 'Sign in'.
Следовательно тест падает.
Он прячется в "Гамбургер-меню". Необходимо продумать зависимость:

"Если на странице есть Гамбургер-меню - раскрыть его и проверить наличие "Sign in" внутри него".

См. папку "Future_tests", файл "Github_future_test.js".
*/