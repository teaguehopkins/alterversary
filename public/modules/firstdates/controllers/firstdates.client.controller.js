'use strict';

// Firstdates controller
angular.module('firstdates').controller('FirstdatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Firstdates',
    function($scope, $stateParams, $location, Authentication, Firstdates) {
        $scope.authentication = Authentication;

        // Create new Firstdate
        $scope.create = function() {
        	// Create new Firstdate object
            var firstdate = new Firstdates({
                name: this.name,
                firstdate: this.firstdate
            });

            // Redirect after save
            firstdate.$save(function(response) {
                $location.path('firstdates/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Firstdate
        $scope.remove = function(firstdate) {
            if (firstdate) {
                firstdate.$remove();

                for (var i in $scope.firstdates) {
                    if ($scope.firstdates[i] === firstdate) {
                        $scope.firstdates.splice(i, 1);
                    }
                }
            } else {
                $scope.firstdate.$remove(function() {
                    $location.path('firstdates');
                });
            }
        };

        // Update existing Firstdate
        $scope.update = function() {
            var firstdate = $scope.firstdate;

            firstdate.$update(function() {
                $location.path('firstdates/' + firstdate._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Firstdates
        $scope.find = function() {
            $scope.firstdates = Firstdates.query();
        };

        // Find existing Firstdate
        $scope.findOne = function() {
            $scope.firstdate = Firstdates.get({
                firstdateId: $stateParams.firstdateId
            });
        };
    }
]);
