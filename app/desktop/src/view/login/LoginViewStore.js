// Хранилище
Ext.define('MyExtGenApp.view.login.LoginViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.loginviewstore',

    fields: ['login', 'password']
});