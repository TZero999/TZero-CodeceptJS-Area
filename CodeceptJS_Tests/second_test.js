Feature('Gmail');

Scenario('Gmail new user registration test', ({ I }) => {

  I.amOnPage('https://mail.google.com/mail/u/0/#inbox');
  I.see('Вход', 'h1');
  I.seeElement('//*[@id="identifierId"]');
  I.fillField('//*[@id="identifierId"]','Browser');
  I.wait(1.5);
  I.clearField('//*[@id="identifierId"]');
  //I.click('Создать аккаунт');
  //I.click('Для личного использования');
  //I.fillField('div.Xb9hP','justfortest@gmail.com');
});
