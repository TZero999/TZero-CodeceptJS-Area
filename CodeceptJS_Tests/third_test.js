Feature('third');

Scenario("open ToDo's website", ({ I }) => {
  I.amOnPage('http://todomvc.com/examples/react/');
  I.see('todos');
});