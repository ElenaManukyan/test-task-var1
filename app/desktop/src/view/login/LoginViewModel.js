// Модель представления, хранит данные для 
// определенного view здесь и сейчас
Ext.define('MyExtGenApp.view.login.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginviewmodel',

    data: {
        userLogin: null,
        userPassword: null
    },
    
    /*
    formulas: {
        formValid: function(get) {
            return !!(get('userLogin') && get('userPassword'));
        }
    },

    isValidLogAndPass: function() {
        var login = this.get('userLogin');
        var password = this.get('userPassword');

        return login === 'admin' && password === 'padmin';
    }
    */
});