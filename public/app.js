$(document).ready(() => {
    $.getJSON("/api/todos", data => {
        addTodos(data);
    })
});

function addTodos(todos){
    console.log(todos);
    for (let todo of todos) {
        listValue = document.createElement("li");
        listValue.textContent = todo.name;
        document.querySelector(".list").appendChild(listValue);
    }
}