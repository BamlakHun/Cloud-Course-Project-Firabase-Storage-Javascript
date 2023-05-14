import '/style.css';

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoOutput = document.querySelector(".todo-output");

const addTodo = (e) => {
  e.preventDefault();

  const todo = todoInput.value;

  if (todo) {
    const id = Date.now();
    addTodoToLocalStorage({ id, todo, completed: false });
    const todoItem = document.createElement("div");
    todoItem.className = `todo-item ${id}`;
    todoItem.innerHTML = `
    <input type="checkbox" class="todo-check">
    <input type="text" class="todo-text" value=${todo} disabled>
    <button class="todo-edit">Edit</button>
    <button class="todo-delete">Delete</button>`;
    todoOutput.appendChild(todoItem);
    todoInput.value = "";
  }
}

const addTodoToLocalStorage = (todo) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"))

  if (!tasks) {
    tasks = [];
  }

  tasks.push(todo);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const editTodo = (e) => {
  e.preventDefault();
}

const checkTodo = (e) => { //44:34
  e.preventDefault();
}

const deleteTodo = (e) => {
  if (e.target.className === "todo-delete") {
    deleteTodoFromLocalStorage(e.target.classList[0]);
    e.target.parentElement.remove();
  }

}

const deleteTodoFromLocalStorage = (id) => {

}

const getTodo = (e) => {
  let tasks = localStorage.getItem("tasks");

  if (tasks) {
    tasks = JSON.parse(tasks);
    tasks.forEach((task) => {
      const todoItem = document.createElement("div");
      todoItem.className = `todo-item ${id}`;
      todoItem.innerHTML = `
      <input type="checkbox" class="todo-check" ${task.completed ? "checked" : ""}>
      <input type="text" class="todo-text" ${task.completed ? "strike" : ""} value=${todo} disabled>
      <button class="todo-edit">Edit</button>
      <button class="todo-delete">Delete</button>`;
      todoOutput.appendChild(todoItem);
    });
  }
}

// Event listeners
todoForm.addEventListener("submit", addTodo);
todoOutput.addEventListener("click", editTodo);
todoOutput.addEventListener("click", checkTodo);
todoOutput.addEventListener("click", deleteTodo);
document.addEventListener("DOMContentLoaded", getTodo);