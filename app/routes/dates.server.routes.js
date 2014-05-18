'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var dates = require('../../app/controllers/dates');

	// Dates Routes
	app.route('/dates')
		.get(dates.list)
		.post(users.requiresLogin, dates.create);
	
	app.route('/dates/:dateId')
		.get(dates.read)
		.put(users.requiresLogin, dates.hasAuthorization, dates.update)
	    .delete(users.requiresLogin, dates.hasAuthorization, dates.delete);

	// Finish by binding the Date middleware
	app.param('dateId', dates.dateByID);
};