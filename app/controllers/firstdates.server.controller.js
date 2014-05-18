'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Firstdate = mongoose.model('Firstdate'),
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
				message = 'Firstdate already exists';
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
 * Create a Firstdate
 */
exports.create = function(req, res) {
	var firstdate = new Firstdate(req.body);
	firstdate.user = req.user;

	firstdate.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(firstdate);
		}
	});
};

/**
 * Show the current Firstdate
 */
exports.read = function(req, res) {
	res.jsonp(req.firstdate);
};

/**
 * Update a Firstdate
 */
exports.update = function(req, res) {
	var firstdate = req.firstdate;

	firstdate = _.extend(firstdate, req.body);

	firstdate.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(firstdate);
		}
	});
};

/**
 * Delete an Firstdate
 */
exports.delete = function(req, res) {
	var firstdate = req.firstdate;

	firstdate.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(firstdate);
		}
	});
};

/**
 * List of Firstdates
 */
exports.list = function(req, res) {
	Firstdate.find().sort('-created').populate('user', 'displayName').exec(function(err, firstdates) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(firstdates);
		}
	});
};

/**
 * Firstdate middleware
 */
exports.firstdateByID = function(req, res, next, id) {
	Firstdate.findById(id).populate('user', 'displayName').exec(function(err, firstdate) {
		if (err) return next(err);
		if (!firstdate) return next(new Error('Failed to load Firstdate ' + id));
		req.firstdate = firstdate;
		next();
	});
};

/**
 * Firstdate authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.firstdate.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};