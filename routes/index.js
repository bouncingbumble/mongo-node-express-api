var express = require('express'),
    router  = express.Router(),
    x = require('./todos');

router.route('/')
    .get(x.getTodos)
    .post(x.createTodo)

router.route('/:todoId')
    .get(x.getTodo)
    .put(x.putTodo)
    .delete(x.deleteTodo)

module.exports = router;