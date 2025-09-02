Ext.define('MyExtGenApp.Application', {
	extend: 'Ext.app.Application',
	name: 'MyExtGenApp',
	requires: ['MyExtGenApp.*'],
	defaultToken: 'homeview',

	removeSplash: function () {
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)
	},

	launch: function () {
		
		this.removeSplash()

		Ext.create('MyExtGenApp.view.login.LoginView');
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
