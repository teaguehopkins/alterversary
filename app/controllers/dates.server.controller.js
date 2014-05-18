'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Date = mongoose.model('Date'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Date already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Date
 */
exports.create = function(req, res) {
	var date = new Date(req.body);
	date.user = req.user;

	date.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(date);
		}
	});
};

/**
 * Show the current Date
 */
exports.read = function(req, res) {
	res.jsonp(req.date);
};

/**
 * Update a Date
 */
exports.update = function(req, res) {
	var date = req.date;

	date = _.extend(date, req.body);

	date.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(date);
		}
	});
};

/**
 * Delete an Date
 */
exports.delete = function(req, res) {
	var date = req.date;

	date.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(date);
		}
	});
};

/**
 * List of Dates
 */
exports.list = function(req, res) {
	Date.find().sort('-created').populate('user', 'displayName').exec(function(err, dates) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(dates);
		}
	});
};

/**
 * Date middleware
 */
exports.dateByID = function(req, res, next, id) {
	Date.findById(id).populate('user', 'displayName').exec(function(err, date) {
		if (err) return next(err);
		if (!date) return next(new Error('Failed to load Date ' + id));
		req.date = date;
		next();
	});
};

/**
 * Date authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.date.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};