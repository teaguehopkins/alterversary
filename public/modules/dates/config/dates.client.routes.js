'use strict';

//Setting up route
angular.module('dates').config(['$stateProvider',
	function($stateProvider) {
		// Dates state routing
		$stateProvider.
		state('listDates', {
			url: '/dates',
			templateUrl: 'modules/dates/views/list-dates.client.view.html'
		}).
		state('createDate', {
			url: '/dates/create',
			templateUrl: 'modules/dates/views/create-date.client.view.html'
		}).
		state('viewDate', {
			url: '/dates/:dateId',
			templateUrl: 'modules/dates/views/view-date.client.view.html'
		}).
		state('editDate', {
			url: '/dates/:dateId/edit',
			templateUrl: 'modules/dates/views/edit-date.client.view.html'
		});
	}
]);