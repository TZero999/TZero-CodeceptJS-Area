Feature('QA Engineeru 1st Visit');

Scenario('Visiting of QA Enginee.ru web-page', ({ I }) => {

    I.amOnPage('http://127.0.0.1:5500/qaengineeru.html');

    I.see("Энциклопедия типичного QA-инженера","div.Title2") 
    &&
    I.see("Обновлено",'#UpdateDate');
    
    let UpdateDate = I.grabTextFrom('#UpdateDate');
    
    alert(UpdateDate);
      
});

