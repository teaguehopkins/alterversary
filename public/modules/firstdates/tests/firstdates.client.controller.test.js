'use strict';

(function() {
	// Firstdates Controller Spec
	describe('Firstdates Controller Tests', function() {
		// Initialize global variables
		var FirstdatesController,
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

			// Initialize the Firstdates controller.
			FirstdatesController = $controller('FirstdatesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Firstdate object fetched from XHR', inject(function(Firstdates) {
			// Create sample Firstdate using the Firstdates service
			var sampleFirstdate = new Firstdates({
				name: 'New Firstdate'
			});

			// Create a sample Firstdates array that includes the new Firstdate
			var sampleFirstdates = [sampleFirstdate];

			// Set GET response
			$httpBackend.expectGET('firstdates').respond(sampleFirstdates);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.firstdates).toEqualData(sampleFirstdates);
		}));

		it('$scope.findOne() should create an array with one Firstdate object fetched from XHR using a firstdateId URL parameter', inject(function(Firstdates) {
			// Define a sample Firstdate object
			var sampleFirstdate = new Firstdates({
				name: 'New Firstdate'
			});

			// Set the URL parameter
			$stateParams.firstdateId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/firstdates\/([0-9a-fA-F]{24})$/).respond(sampleFirstdate);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.firstdate).toEqualData(sampleFirstdate);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Firstdates) {
			// Create a sample Firstdate object
			var sampleFirstdatePostData = new Firstdates({
				name: 'New Firstdate'
			});

			// Create a sample Firstdate response
			var sampleFirstdateResponse = new Firstdates({
				_id: '525cf20451979dea2c000001',
				name: 'New Firstdate'
			});

			// Fixture mock form input values
			scope.name = 'New Firstdate';

			// Set POST response
			$httpBackend.expectPOST('firstdates', sampleFirstdatePostData).respond(sampleFirstdateResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Firstdate was created
			expect($location.path()).toBe('/firstdates/' + sampleFirstdateResponse._id);
		}));

		it('$scope.update() should update a valid Firstdate', inject(function(Firstdates) {
			// Define a sample Firstdate put data
			var sampleFirstdatePutData = new Firstdates({
				_id: '525cf20451979dea2c000001',
				name: 'New Firstdate'
			});

			// Mock Firstdate in scope
			scope.firstdate = sampleFirstdatePutData;

			// Set PUT response
			$httpBackend.expectPUT(/firstdates\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/firstdates/' + sampleFirstdatePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid firstdateId and remove the Firstdate from the scope', inject(function(Firstdates) {
			// Create new Firstdate object
			var sampleFirstdate = new Firstdates({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Firstdates array and include the Firstdate
			scope.firstdates = [sampleFirstdate];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/firstdates\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFirstdate);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.firstdates.length).toBe(0);
		}));
	});
}());