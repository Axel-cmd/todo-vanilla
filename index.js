const TODO_LIST = [];
var TODO_ID = 0;

class Todo {

    constructor(id, label) {
        this.id = id;
        this.label = label;
    }

}

function removeTodoFromLocalStorage(todo) {
    let todoStore = JSON.parse(localStorage.getItem("todo-list"));
    
    if(todoStore) {
        let newTodoStore = todoStore.filter(t => { 
            return t.id !== todo.id
        });
        localStorage.setItem("todo-list", JSON.stringify(newTodoStore))
    }
}

function addToLocalStorage(todo) {

    const todoStore = JSON.parse(localStorage.getItem("todo-list"));

    let todoList = [];

    if(todoStore) {
        todoList = [...todoStore]
    }

    todoList.push(todo)

    localStorage.setItem("todo-list", JSON.stringify(todoList))

}

function addTodoInTemplate (todo) {
    const container = document.querySelector("#todo-list-container");

    container.innerHTML = container.innerHTML + `
        <div class="todo-element" id="todo-${todo.id}">
            <input type="checkbox" class="todo-check"/>
            <input type="text" class="todo-label" value="${todo.label}">
            <button class="add-todo-button" onclick="deleteTodo(${todo.id})">supprimer</button>
        </div>
    `
}

function addTodo() {

    const input = document.querySelector("#todo-input");

    if(input.value) {
        TODO_ID++
        const todo = new Todo(TODO_ID, input.value)

        TODO_LIST.push(todo);
        addToLocalStorage(todo)
        addTodoInTemplate(todo);
    }

    input.value = "";
}

function deleteTodo(id) {
    const todo = TODO_LIST.find( t => t.id == id);
    if(todo) removeTodoFromLocalStorage(todo);

    const todoView = document.querySelector('#todo-'+id).remove();
    
}

function handleCheckbox() {
    console.log('checked')
}

document.addEventListener("DOMContentLoaded", () => {
    const todoStore = JSON.parse(localStorage.getItem("todo-list"));

    if(todoStore) {
        for(const todo of todoStore){

            if(todo.id > TODO_ID){
                TODO_ID = todo.id
            }

            TODO_LIST.push(todo);
            addTodoInTemplate(todo);
        }
    }
})