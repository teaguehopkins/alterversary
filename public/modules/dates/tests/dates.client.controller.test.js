'use strict';

(function() {
	// Dates Controller Spec
	describe('Dates Controller Tests', function() {
		// Initialize global variables
		var DatesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Dates controller.
			DatesController = $controller('DatesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Date object fetched from XHR', inject(function(Dates) {
			// Create sample Date using the Dates service
			var sampleDate = new Dates({
				name: 'New Date'
			});

			// Create a sample Dates array that includes the new Date
			var sampleDates = [sampleDate];

			// Set GET response
			$httpBackend.expectGET('dates').respond(sampleDates);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.dates).toEqualData(sampleDates);
		}));

		it('$scope.findOne() should create an array with one Date object fetched from XHR using a dateId URL parameter', inject(function(Dates) {
			// Define a sample Date object
			var sampleDate = new Dates({
				name: 'New Date'
			});

			// Set the URL parameter
			$stateParams.dateId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/dates\/([0-9a-fA-F]{24})$/).respond(sampleDate);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.date).toEqualData(sampleDate);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Dates) {
			// Create a sample Date object
			var sampleDatePostData = new Dates({
				name: 'New Date'
			});

			// Create a sample Date response
			var sampleDateResponse = new Dates({
				_id: '525cf20451979dea2c000001',
				name: 'New Date'
			});

			// Fixture mock form input values
			scope.name = 'New Date';

			// Set POST response
			$httpBackend.expectPOST('dates', sampleDatePostData).respond(sampleDateResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Date was created
			expect($location.path()).toBe('/dates/' + sampleDateResponse._id);
		}));

		it('$scope.update() should update a valid Date', inject(function(Dates) {
			// Define a sample Date put data
			var sampleDatePutData = new Dates({
				_id: '525cf20451979dea2c000001',
				name: 'New Date'
			});

			// Mock Date in scope
			scope.date = sampleDatePutData;

			// Set PUT response
			$httpBackend.expectPUT(/dates\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/dates/' + sampleDatePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid dateId and remove the Date from the scope', inject(function(Dates) {
			// Create new Date object
			var sampleDate = new Dates({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Dates array and include the Date
			scope.dates = [sampleDate];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/dates\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDate);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.dates.length).toBe(0);
		}));
	});
}());