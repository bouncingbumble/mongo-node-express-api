var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('this is where your mongo conn string goes');
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');

