$(document).ready(() => {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(event => {
        if(event.which == 13) {
            createTodo();
        }
    })

    $('.list').on('click', 'span', function() {
        deleteTodo($(this).parent());
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
    console.log(todo._id)
    newTodo.data('id', todo._id);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function deleteTodo(todo){
    var id = todo.data('id');
    console.log(todo.data.id)
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