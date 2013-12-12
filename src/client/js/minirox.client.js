var DEBUG = false;

/**
 * Define the main application object
 */
var MiniRox = window.MiniRox = {
	version: "0.0.2"
};

//= minirox.client.marionette.render.js
//= minirox.client.mixin.js

//= minirox.client.model.js

//= minirox.client.appcontroller.js
//= minirox.client.socket.js

//= minirox.client.commons.js
//= minirox.client.toolbar.js
//= minirox.client.filter.js

//= notifications/minirox.client.notification.js

//= minirox.client.summary.js
//= minirox.client.test.view.squares.js
//= minirox.client.test.view.tables.js
//= minirox.client.test.view.details.js


/**
 * Initialize the the MiniRox application controller
 */
MiniRox.app.addInitializer(function(options) {
//	var ShortcutKeys = Backbone.Shortcuts.extend({
//		shortcuts: {
//			"f" : "filterFocus"
//		},
//
//		filterFocus: function() {
//			minirox.trigger('filter:focus');
//			return false;
//		}
//	});
//
//	var shortcuts = new ShortcutKeys();
});

/**
 * Start the application when the page is loaded
 */
$(document).ready(function() {
	MiniRox.app.start();
});
