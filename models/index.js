var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://admin:@ds113402.mlab.com:13402/todo-api');
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');

