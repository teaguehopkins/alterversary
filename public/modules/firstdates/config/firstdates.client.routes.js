'use strict';

//Setting up route
angular.module('firstdates').config(['$stateProvider',
	function($stateProvider) {
		// Firstdates state routing
		$stateProvider.
		state('listFirstdates', {
			url: '/firstdates',
			templateUrl: 'modules/firstdates/views/list-firstdates.client.view.html'
		}).
		state('createFirstdate', {
			url: '/firstdates/create',
			templateUrl: 'modules/firstdates/views/create-firstdate.client.view.html'
		}).
		state('viewFirstdate', {
			url: '/firstdates/:firstdateId',
			templateUrl: 'modules/firstdates/views/view-firstdate.client.view.html'
		}).
		state('editFirstdate', {
			url: '/firstdates/:firstdateId/edit',
			templateUrl: 'modules/firstdates/views/edit-firstdate.client.view.html'
		});
	}
]);