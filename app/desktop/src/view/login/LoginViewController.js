// Логика проверки логина и пароля
Ext.define('MyExtGenApp.view.login.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginviewcontroller',

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSubmit();
        }
    },

    onSubmit: function() {
        var view = this.getView();
        // var vm = this.getViewModel();
        var form = view;
        
        if (form.isValid()) {
            var values = form.getValues();
            var username = values.username;
            var password = values.password;
            
            /*
            if (vm.isValidLogAndPass()) {
                this.openMainWindow();
            }
                */

            if (username === 'admin' && password === 'padmin') {
                this.openMainWindow();
            } else {
                Ext.Msg.show({
                    title: 'Ошибка',
                    message: 'Неверный логин или пароль',
                    header: {
                        style: {
                            backgroundColor: '#42a5f5'
                        },
                        title: {
                            style: {
                                color: '#ffffff',
                                fontWeight: 300,
                                letterSpacing: '1px',
                                textAlign: 'left'
                            }
                        }
                    },
                });
            }
        }
    },

    openMainWindow: function() {
        Ext.create('MyExtGenApp.view.main.MainView', {
            fullscreen: true
        });
        
        this.getView().destroy();
    }
});