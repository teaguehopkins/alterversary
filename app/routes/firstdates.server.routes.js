'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var firstdates = require('../../app/controllers/firstdates');

	// Firstdates Routes
	app.route('/firstdates')
		.get(firstdates.list)
		.post(users.requiresLogin, firstdates.create);
	
	app.route('/firstdates/:firstdateId')
		.get(firstdates.read)
		.put(users.requiresLogin, firstdates.hasAuthorization, firstdates.update)
	    .delete(users.requiresLogin, firstdates.hasAuthorization, firstdates.delete);

	// Finish by binding the Firstdate middleware
	app.param('firstdateId', firstdates.firstdateByID);
};