Ext.define('MyExtGenApp.view.main.MainView', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    controller: 'mainviewcontroller',
    viewModel: {
        type: 'mainviewmodel'
    },
    requires: [
        'Ext.layout.Fit',
        'Ext.tab.Panel',
        'Ext.tab.Bar',
        'Ext.tab.Tab',
        'Ext.field.Text',
        'Ext.grid.Grid',
        'Ext.window.Window',
        'Ext.form.Panel'
    ],
    layout: 'fit',

    items: [{
        xtype: 'container',
        layout: 'vbox',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            height: 60,
            width: '100%',
            style: {
                backgroundColor: '#42a5f5',
                padding: '0 20px'
            },
            items: [{
                xtype: 'component',
                html: '<div style="font-size: 20px; color: white; font-weight: bold; letter-spacing: 0.5px;">Учет товаров</div>',
                flex: 1
            }, {
                xtype: 'button',
                text: 'Товары',
                handler: 'onProductsClick',
                margin: '0 10px',
                style: {
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none'
                }
            }, {
                xtype: 'button',
                text: 'Выход',
                handler: 'onExitClick',
                style: {
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none'
                }
            }]
        }, {
            xtype: 'tabpanel',
            reference: 'mainTabPanel',
            width: '100%',
            flex: 1,
            tabPosition: 'left',
            
            style: {
                backgroundColor: '#2c3e50'
            },
            
            tabBar: {
                layout: {
                    type: 'hbox',
                    pack: 'start'
                },
                style: {
                    backgroundColor: '#2c3e50'
                },
                defaults: {
                    style: {
                        backgroundColor: '#2c3e50',
                        color: '#ecf0f1',
                        border: 'none',
                        textAlign: 'left',
                        padding: '15px 20px'
                    }
                }
            },

            items: [{
                title: 'Товары',
                reference: 'productsTab',
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
                            color: '#ffffff',
                            fontWeight: 300,
                            letterSpacing: '1px',
                            textAlign: 'left',
                            fontSize: '20px',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }
                    },{
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
                                specialkey: 'onFilterSpecialKey'
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
                                specialkey: 'onFilterSpecialKey'
                            }
                                
                        }, 
                        {
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
                                fontWeight: 'normal',
                            }
                        }
                    ]}
                ]
            }, {
                    xtype: 'grid',
                    width: '90%',
                    reference: 'grid',
                    flex: 1,
                    bind: '{productsStore}',
                    listeners: {
                        childtap: 'onGridCellClick'
                    },
                    columns: [{
                        text: 'ID',
                        dataIndex: 'id',
                        width: 50
                    }, {
                        text: 'Имя',
                        dataIndex: 'name',
                        flex: 1
                    }, {
                        text: 'Описание',
                        dataIndex: 'description',
                        width: 100
                    }, {
                        text: 'Цена',
                        dataIndex: 'price',
                        width: 100,
                        renderer: function(value) {
                            return Ext.util.Format.number(value, '0.00');
                        }
                    }, {
                        text: 'Кол-во',
                        dataIndex: 'quantity',
                        width: 100,
                        cell: {
                            encodeHtml: false
                        },
                        renderer: function (value, record, dataIndex, cell) {
                            if (value === 0) {
                                cell.addCls('cell-red');
                            } else {
                                cell.removeCls('cell-red');
                            }
                            return value;
                        }
                    }]
                }]
            }]
        }]
    }]
});