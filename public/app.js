$(document).ready(() => {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(event => {
        if(event.which == 13) {
            createTodo();
        }
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
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}