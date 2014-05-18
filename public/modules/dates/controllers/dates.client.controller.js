'use strict';

// Dates controller
angular.module('dates').controller('DatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dates',
    function($scope, $stateParams, $location, Authentication, Dates) {
        $scope.authentication = Authentication;

        // Create new Date
        $scope.create = function() {
        	// Create new Date object
            var date = new Dates({
                name: this.name
            });

            // Redirect after save
            date.$save(function(response) {
                $location.path('dates/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Date
        $scope.remove = function(date) {
            if (date) {
                date.$remove();

                for (var i in $scope.dates) {
                    if ($scope.dates[i] === date) {
                        $scope.dates.splice(i, 1);
                    }
                }
            } else {
                $scope.date.$remove(function() {
                    $location.path('dates');
                });
            }
        };

        // Update existing Date
        $scope.update = function() {
            var date = $scope.date;

            date.$update(function() {
                $location.path('dates/' + date._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Dates
        $scope.find = function() {
            $scope.dates = Dates.query();
        };

        // Find existing Date
        $scope.findOne = function() {
            $scope.date = Dates.get({
                dateId: $stateParams.dateId
            });
        };
    }
]);