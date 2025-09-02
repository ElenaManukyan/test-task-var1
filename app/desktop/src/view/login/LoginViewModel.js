// Модель представления, хранит данные для 
// определенного view здесь и сейчас
Ext.define('MyExtGenApp.view.login.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginviewmodel',

    data: {
        userLogin: null,
        userPassword: null
    }
});