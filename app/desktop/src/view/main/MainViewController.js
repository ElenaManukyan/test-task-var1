Ext.define('MyExtGenApp.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewcontroller',

    onGridCellClick: function(grid, location, cell, rowIndex, colIndex, e, eOpts) {
        var record = location.record;
        var column = location.column;
        
        if (column && column._dataIndex === 'name') {
            this.showProductCard(record);
        }
    },

    showProductCard: function(record) {
        // console.log(record);
        var win = Ext.create('Ext.window.Window', {
            title: 'Карточка товара: ' + record.get('name'),
            width: 400,
            height: 300,
            modal: true,
            layout: 'fit',

            header: {
                style: {
                    backgroundColor: '#42a5f5'
                },
                title: {
                    style: {
                        color: '#ffffff',
                        fontWeight: 300,
                        letterSpacing: '1px'
                    }
                }
            },

            style: {
                backgroundColor: '#ffffff',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
                border: '2px solid #42a5f5'
            },

            items: [
                {
                xtype: 'formpanel',
                reference: 'productForm',
                bodyPadding: 10,
                defaults: {
                    xtype: 'textfield',
                    width: '100%',
                    labelWidth: 100,
                    labelAlign: 'left'
                },
                items: [{
                    label: 'ID:',
                    name: 'id',
                    readOnly: true,
                    value: record.get('id')
                }, {
                    label: 'Наименование:',
                    name: 'description',
                    readOnly: true,
                    value: record.get('description')
                }, {
                    label: 'Цена:',
                    name: 'price',
                    xtype: 'spinnerfield',
                    value: Ext.util.Format.number(record.get('price'), '0.00'),
                    minValue: 0,
                    stepValue: 0.1,
                    decimals: 2,
                    spinners: true,
                    clearable: false,
                    // required: true,
                    /*
                    validators: [{
                        type: 'number',
                        message: 'Введите число'
                    },{
                        type: 'range',
                        min: 0.01,
                        message: 'Цена не может быть меньше 0.01'
                    }],
                    listeners: {
                        change: function(field) {
                            let form = field.up('formpanel');
                            let btn  = form.down('button[text=Сохранить]');
                            btn.setDisabled(!form.isValid());
                        }
                    }
                        */
                }, {
                    label: 'Кол-во:',
                    name: 'quantity',
                    xtype: 'spinnerfield',
                    value: record.get('quantity'),
                    minValue: 0,
                    stepValue: 1,
                    spinners: true,
                    clearable: false
                }],
                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(button) {
                        var form = button.up('formpanel');

                        var values = form.getValues();
                        var changes = [];

                        var formatVal = function(val) {
                            if (Ext.isNumber(val)) {
                                return Ext.util.Format.number(val, '0.00');
                            }
                            return val;
                        };

                        Ext.Object.each(values, function(key, val) {
                            var oldVal = record.get(key);
                            if (oldVal != val) {
                                var field = form.down('[name=' + key + ']');
                                var label = field ? field.getLabel() : key;

                                changes.push(
                                    Ext.String.format(
                                        "<b>{0}</b>: {1} → {2}",
                                        label,
                                        formatVal(oldVal),
                                        formatVal(val)
                                    )
                                );
                            }
                        });

                        if (changes.length > 0) {
                            Ext.Msg.show({
                                title: 'Подтверждение сохранения',
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
                                message: 'Есть измененные данные:<br><br>' + changes.join('<br>') + '<br><br>Сохранить?',
                                buttons: [
                                    {
                                        text: 'Да, сохранить',
                                        itemId: 'yes',
                                    },
                                    {
                                        text: 'Отмена',
                                        itemId: 'no',
                                        ui: 'decline'
                                    }
                                ],
                                fn: function (buttonId) {
                                    if (buttonId === 'yes') {
                                        record.set(values);
                                        win.close();
                                    }
                                }
                            });
                        } else {
                            Ext.Msg.show({
                                title: 'Информация',
                                message: 'Изменений нет',
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
                }, {
                    text: 'Отмена',
                    handler: function() {
                        win.close();
                    }
                }]
            }],
        });

        win.show();
    },

    onProductsClick: function() {
        var view = this.getView();
        var tabPanel = view.down('tabpanel[reference=mainTabPanel]');

        if (!tabPanel) return;

        var productsTab = tabPanel.down('panel[reference=productsTab]');
        if (!productsTab) {
            // Создаю отдельный store для каждой вкладки
            var tabStore = Ext.create('Ext.data.Store', {
                fields: [
                    {name: 'id', type: 'int'},
                    {name: 'name', type: 'string'},
                    {name: 'description', type: 'string'},
                    {name: 'price', type: 'float'},
                    {name: 'quantity', type: 'int'}
                ],
                data: [
                    {id: 1, name: 'Notebook Lenovo', description: 'Ноутбук ThinkPad T460', price: 100.50, quantity: 2},
                    {id: 2, name: 'Keyboard OKLICK', description: 'Клавиатура OKLICK 140M, USB, черный', price: 50.00, quantity: 8},
                    {id: 3, name: 'Network adapter', description: 'Сетевой адаптер WiFi D-Link', price: 7.99, quantity: 0},
                    {id: 4, name: 'Mouse Logitech', description: 'Мышь беспроводная', price: 25.75, quantity: 5},
                    {id: 5, name: 'Monitor Samsung', description: 'Монитор 24 дюйма', price: 299.99, quantity: 0},
                    {id: 6, name: 'Monoblock Apple', description: `Моноблок 31.5''`, price: 299.99, quantity: 0}
                ]
            });

            productsTab = tabPanel.add({
                title: 'Товары',
                itemId: 'productsTab',
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                items: [{
                    xtype: 'container',
                    layout: 'vbox',
                    margin: '0 0 10px 0',
                    width: '90%',
                    items: [{
                        xtype: 'component',
                        html: 'Список товаров',
                        width: '100%',
                        style: {
                            padding: '10px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }
                    }, {
                        xtype: 'container',
                        layout: 'vbox',
                        margin: '0 0 10px 0',
                        items: [{
                            xtype: 'textfield',
                            reference: 'idFilterField',
                            label: 'ID:',
                            labelAlign: 'left',
                            margin: '0 10px 0 0',
                            width: '350px',
                            placeholder: 'Введите фильтр...',
                            listeners: {
                                specialkey: (field, e) => {
                                    if (e.getKey() === e.ENTER) this.applyFilters(productsTab);
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            reference: 'descriptionFilterField',
                            label: 'Описание:',
                            labelAlign: 'left',
                            margin: '0 10px 0 0',
                            width: '350px',
                            placeholder: 'Введите фильтр...',
                            listeners: {
                                specialkey: (field, e) => {
                                    if (e.getKey() === e.ENTER) this.applyFilters(productsTab);
                                }
                            }
                        }, {
                            xtype: 'button',
                            text: 'Сбросить фильтр',
                            margin: '25 0 0 10px',
                            handler: 'clearFilters',
                            style: {
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                width: '150px',
                                fontSize: '12px',
                                fontWeight: 'normal'
                            }
                        }]
                    }]
                }, {
                    xtype: 'grid',
                    width: '90%',
                    reference: 'grid',
                    flex: 1,
                    store: tabStore,
                    columns: [
                        {text: 'ID', dataIndex: 'id', width: 50},
                        {text: 'Имя', dataIndex: 'name', flex: 1},
                        {text: 'Описание', dataIndex: 'description', width: 100},
                        {
                            text: 'Цена',
                            dataIndex: 'price',
                            width: 100,
                            renderer: value => Ext.util.Format.number(value, '0.00')
                        },
                        {
                            text: 'Кол-во',
                            dataIndex: 'quantity',
                            width: 100,
                            cell: {encodeHtml: false},
                            renderer: function(value, record, dataIndex, cell) {
                                if (value === 0) cell.addCls('cell-red');
                                else cell.removeCls('cell-red');
                                return value;
                            }
                        }
                    ],
                    listeners: {
                        childtap: 'onGridCellClick'
                    },
                }]
            });
        }

        tabPanel.setActiveItem(productsTab);
    },


    onExitClick: function() {
        Ext.Msg.show({
            title: 'Выход',
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
            message: 'Вы уверены, что хотите выйти?',
            buttons: [
                {
                    text: 'Да',
                    itemId: 'yes',
                },
                {
                    text: 'Нет',
                    itemId: 'no'
                }
            ],
            fn: function(choice) {
                if (choice === 'yes') {
                    this.getView().destroy();
                    Ext.create('MyExtGenApp.view.login.LoginView', {
                        fullscreen: true
                    });
                }
            },
            scope: this
        });
    },

    onFilterSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            var tab = field.up('[reference=productsTab]');
            this.applyFilters(tab);
        }
    },

    applyFilters: function(tab) {

        if (!tab) return;

        var idField = tab.down('[reference=idFilterField]');
        var descField = tab.down('[reference=descriptionFilterField]');
        var grid = tab.down('[reference=grid]');

        if (!idField || !descField || !grid) return;

        var idFilter = (idField.getValue() || '').trim();
        var descriptionFilter = (descField.getValue() || '').trim();

        var store = grid.getStore();

        store.clearFilter();

        var filters = [];

        if (idFilter) {
            filters.push({
                property: 'id',
                value: idFilter,
                operator: '='
            });
        }

        if (descriptionFilter) {
            filters.push({
                property: 'description',
                value: descriptionFilter,
                anyMatch: true,
                caseSensitive: false
            });
        }

        if (filters.length > 0) {
            filters.forEach((f) => store.addFilter(f));
        }
    },


    clearFilters: function(button) {
        
        if (!button || !button.isButton) return;

        var tab = button.up('[reference=productsTab]') || button.up('[itemId=productsTab]'); 
        
        if (!tab) return;

        var idField = tab.down('[reference=idFilterField]');
        var descField = tab.down('[reference=descriptionFilterField]');
        if (idField) idField.setValue('');
        if (descField) descField.setValue('');

        var grid = tab.down('[reference=grid]') || tab.down('grid');
        if (grid) {
            var store = grid.getStore();
            if (store) store.clearFilter();
        }
    }
});