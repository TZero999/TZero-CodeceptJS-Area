Feature ('Wildberries authorization');

Scenario ('Wildberries authorization', async ({ I, Wildberries_auth }) => {

    I.amOnPage('https://www.wildberries.ru/');

    Wildberries_auth.authorize();
})