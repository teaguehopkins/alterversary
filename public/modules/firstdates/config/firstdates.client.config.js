'use strict';

// Configuring the Articles module
angular.module('firstdates').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Firstdates', 'firstdates');
		Menus.addMenuItem('topbar', 'New Firstdate', 'firstdates/create');
	}
]);