Feature('SignIn_Searching');

Scenario('When WindowSize = 640x480 I search buton "Sign in" in "Hamburger-menu" ', ({ I }) => {
    
    async function f(){ 

    I.amOnPage('https://github.com/');
    
    try {
        await page.waitForSelecror(span.Button-label);
        console.log ('Found this!');
        I.click('span.Button_label');
    } catch (error) {
        console.log ("The element didn't appea.r")
    }
        
    I.see('Sign in'); 
}})