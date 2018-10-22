$(document).ready(() => {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(event => {
        if(event.which == 13) {
            createTodo();
        }
    })

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        deleteTodo($(this).parent());
    })

    $('.list').on('click', 'li', function() {
        completeTodo($(this));
    })
});

function addTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    })
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
        .then(newTodo => {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(err => {
            console.log(err);
        })
}

function addTodo(todo){
    var newTodo = $('<li class="task">' + todo.name + ' <span>x</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function deleteTodo(todo){
    var id = todo.data('id');

    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + id,
    })
    .then(data => {
        todo.remove();
        console.log(data);
    })
}

function getTodo(){

}

function completeTodo(todo){
    var id = todo.data('id');
    var isDone = todo.data('completed');
    var updateData = {completed: !isDone};
    $.ajax({
        method: 'PUT',
        url: '/api/todos/' + id,
        data: updateData
    })
    .then(data => {
        console.log(data);
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}