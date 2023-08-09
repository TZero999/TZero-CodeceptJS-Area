const Helper = require('@codeceptjs/helper');

class SetAttribute extends Helper {

    async setAttributeAsAdmin() {
        
    let hint = document.getElementsByName('user_right_as_admin')[0];
    console.log(hint);
    hint.setAttribute('value','1');
    }
}

module.exports = SetAttribute;
