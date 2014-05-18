'use strict';

//Firstdates service used to communicate Firstdates REST endpoints
angular.module('firstdates').factory('Firstdates', ['$resource', function($resource) {
    return $resource('firstdates/:firstdateId', {
        firstdateId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);