Ext.define('MyExtGenApp.view.main.MainViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.mainviewmodel',
	
	stores: {
		menu: {
			type: "tree",
			proxy: {
				type: 'ajax',
				reader: 'json',
				url: 'resources/desktop/menu.json'
			},
			autoLoad: true
		},
		productsStore: {
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
        }
	}
});
