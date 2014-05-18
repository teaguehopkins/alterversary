'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Firstdate Schema
 */
var FirstdateSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Firstdate name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
  firstdate: {
    type: Date,
    default: Date.now,
    required: 'Please fill in the first date'
  },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Firstdate', FirstdateSchema);
