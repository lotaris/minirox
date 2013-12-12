//= minirox.client.notifications.containerview.js
//= minirox.client.notification.view.js
//= minirox.client.notification.statisticview.js
//= minirox.client.notification.messageview.js
//= minirox.client.notification.reconnectview.js
//= minirox.client.notification.testrunview.js
//= minirox.client.notification.testview.js

(function() {
	/**
	 * Initialize the view in the MiniRox application controller
	 */
	MiniRox.app.addInitializer(function (options) {
		// Configure the region
		this.addRegions({
			notifications: '.notifications-outer-container'
		});

		// Create the container notification
		var notificationContainerView = new MiniRox.NotificationContainerView(_.extend({el: $('.notifications-inner-container')}, options));

		// Show statistic notification
		notificationContainerView.listenTo(this, 'notify:stats', function(stats) {
			notificationContainerView.showNotification(new MiniRox.StatisticsNotificationView({model: new Backbone.Model(stats), title: 'Test results received'}));
		});

		// Show message
		notificationContainerView.listenTo(this, 'notify:message', function(message, type) {
			notificationContainerView.showNotification(new MiniRox.MessageNotificationView({model: new Backbone.Model({message: message}), type: type}));
		});

		// Show reconnect notification
		notificationContainerView.listenTo(this, 'notify:reconnect', function(message, duration) {
			notificationContainerView.showNotification(new MiniRox.ReconnectNotificationView({model: new Backbone.Model({message: message, duration: duration}), type: 'info'}));
		});

		// Show a notification when a test run starts
		notificationContainerView.listenTo(this, 'notify:run:start', function(data) {
			notificationContainerView.showNotification(new MiniRox.TestRunNotificationView({model: new Backbone.Model(_.extend(data, {start: true})), title: 'Test run started'}));
		});

		// Show a notification when a test run ends
		notificationContainerView.listenTo(this, 'notify:run:end', function(data) {
			notificationContainerView.showNotification(new MiniRox.TestRunNotificationView({model: new Backbone.Model(_.extend(data, {start: false})), title: 'Test run ended'}));
		});

		// Show a notification when a test is received
		notificationContainerView.listenTo(this, 'notify:run:test:result', function(data) {
			var notification = new MiniRox.TestNotificationView({model: new Backbone.Model(data)});

			// Listen to the show details event to show a test in the details view
			MiniRox.app.listenTo(notification, 'show:details', function(testKey) {
				this.trigger('add:test:details', testKey);
			}, MiniRox.app);

			// Listen to the filter to add filter by key in the filters view
			MiniRox.app.listenTo(notification, 'filter', function(filter) {
				this.trigger('filter:add', filter);
			}, MiniRox.app);

			// Show the view
			notificationContainerView.showNotification(notification);
		});

		// Render and show the notification container
		this.notifications.attachView(notificationContainerView.render());
	});
}).call(this);