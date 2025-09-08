Ext.define('MyExtGenApp.view.login.LoginView', {
    extend: 'Ext.form.Panel',
    xtype: 'loginview',
    
    controller: 'loginviewcontroller',
    viewModel: {
        type: 'loginviewmodel'
    },
    
    fullscreen: true,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    
    items: [{
        xtype: 'container',
        width: 320,
        style: {
            backgroundColor: '#ffffff',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
            border: '2px solid #42a5f5'
        },
        items: [{
            xtype: 'component',
            html: '<div style="background-color: #42a5f5; padding: 18px; text-align: left; font-size: 20px; font-weight: 300; color: #ffffff; margin-bottom: 10px; letter-spacing: 1px;">Окно входа</div>'
        }, {
            xtype: 'textfield',
            name: 'username',
            label: 'Пользователь:',
            // bind: '{userLogin}',
            labelAlign: 'left',
            allowBlank: false,
            style: {
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
                height: '50px',
            },
            listeners: {
                specialkey: 'onSpecialKey'
            }
        }, {
            xtype: 'passwordfield',
            name: 'password',
            label: 'Пароль:',
            // bind: '{userPassword}',
            labelAlign: 'left',
            allowBlank: false,
            style: {
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
                height: '50px',
            },
            listeners: {
                specialkey: 'onSpecialKey'
            }
        }, {
            xtype: 'component',
            html: '<div style="font-size: 12px; color: #a5a5a5ff; margin: 10px 70px 15px 0; text-align: right; font-weight: 300; letter-spacing: 1px;">Введите Ваш пароль.</div>'
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'end'
            },
            width: '100%',
            style: {
                justifyContent: 'flex-end',
            },
            items: [{
                xtype: 'button',
                text: 'Войти',
                height: 35,
                handler: 'onSubmit',
                reference: 'loginButton',
                style: {
                    backgroundColor: '#42a5f5',
                    color: 'white',
                    border: 'none',
                    fontWeight: 300,
                    fontSize: '12px',
                    marginLeft: '225px',
                    marginBottom: '15px',
                },
                bind: {
                    disabled: '{!formValid}'
                }
            }]
        }]
    }]
});