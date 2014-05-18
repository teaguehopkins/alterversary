'use strict';

// Configuring the Articles module
angular.module('dates').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dates', 'dates');
		Menus.addMenuItem('topbar', 'New Date', 'dates/create');
	}
]);