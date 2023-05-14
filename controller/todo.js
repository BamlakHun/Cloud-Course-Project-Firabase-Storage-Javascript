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
  if (e.target.className === "todo-edit") {
    const id = e.target.parentElement.classList[0];
    const todoText = e.target.parentElement.querySelector(".todo-text");

    if (todoText.disabled) {
      todoText.disabled = false;
      e.target.textContent = "Save";
    } else {
      todoText.disabled = true;
      e.target.textContent = "Edit";
      editTodoInLocalStorage(id, todoText.value);
    }
  }
}

const editTodoInLocalStorage = (id, todo) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks.map(task => {
    if (task.id === parseInt(id)) {
      task.todo = todo;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const checkTodo = (e) => {
  if (e.target.className === "todo-check") {
    const id = e.target.parentElement.classList[0];

    const checked = e.target.checked;

    if (checked) {
      e.target.nextElementSibling.style.textDecoration = "line-through";
    } else {
      e.target.nextElementSibling.style.textDecoration = "none";
    }

    let tasks = JSON.parse(localStorage.getItem(tasks));

    tasks = tasks.map(task => {
      if (task.id === parseInt(id)) {
        task.completed = checked;
      }
      return addTodoToLocalStorage;
    });
    localStorage.setItem("tasks", JSON.stringify);
  }
}

const deleteTodo = (e) => {
  if (e.target.className === "todo-delete") {
    deleteTodoFromLocalStorage(e.target.classList[0]);
    e.target.parentElement.remove();
  }

}

const deleteTodoFromLocalStorage = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
      <input type="text" class="todo-text" ${task.completed ? "strike" : ""} value=${task.todo} disabled>
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