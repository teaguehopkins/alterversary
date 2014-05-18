'use strict';

//Dates service used to communicate Dates REST endpoints
angular.module('dates').factory('Dates', ['$resource', function($resource) {
    return $resource('dates/:dateId', {
        dateId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);