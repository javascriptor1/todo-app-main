"use strict";
const middleStatusDiv = document
  .querySelector(".status-div__middle-div")
  .cloneNode(true);
const form = document.getElementById("form");
const todoInputEl = document.getElementById("todo");
const todoList = document.querySelector(".todosList");
let todoArray = [];
const counterSpanEl = document.querySelector("[data-counter]");
const emptyMsg = document.querySelector(".empty-message");

function initializeFilterDiv() {
  if (window.innerWidth >= 768) {
    const desktopStatusDiv = document.querySelector(".middle-div");
    // we can update the class of cloned element in two different methods:
    // - First method:
    // middleStatusDiv.classList.remove('status-div__middle-div')
    // middleStatusDiv.classList.add('status-div__middle-div--flex')
    // - Second method by overriding original class name using className property:
    middleStatusDiv.className = "status-div__middle-div--flex";
    desktopStatusDiv.appendChild(middleStatusDiv);
  }
}

function removeFilterDiv() {
  if (window.innerWidth < 768) {
    if (middleStatusDiv) {
      middleStatusDiv.remove();
    }
  }
}

window.addEventListener("resize", initializeFilterDiv);
window.addEventListener("resize", removeFilterDiv);

initializeFilterDiv();

form.addEventListener("submit", addTodo);

function displayTodo(todoArray) {
  let todoText = "";
  todoArray.forEach((todo, index) => {
    todoText += `
        <li class="todo-item" data-id="${index}">
            <div class="checkbox-div">
                <label for="checkbox${index}" class="label">checkbox</label>
                <input type="checkbox" id="checkbox${index}" class="checkbox-round" />
                <p class="todo-text">${todo.todoItem}</p>
            </div>
            <button type="button">
                <img src="images/icon-cross.svg" alt="delete todo item" />
            </button>
        </li>

        `;
  });
  todoList.innerHTML = todoText;
  handleEmptyMessage();
}

function addTodo(e) {
  e.preventDefault();
  if (todoInputEl.value === "") {
    alert("Enter todo...");
    return;
  }

  let todoItem = todoInputEl.value.trim();
  let todoStatus = false;
  todoArray.push({
    todoItem,
    todoStatus,
  });

  todoInputEl.value = "";

  displayTodo(todoArray);
  handleEmptyMessage();
  getTodoCount();
}

function handleTodo(e) {
  if (e.target.nodeName === "IMG") {
    const removedItem =
      e.target.parentNode.previousElementSibling.children[2].textContent;
    todoArray = todoArray.filter((todo) => {
      if (todo.todoItem !== removedItem) return todo;
    });
    e.target.parentNode.parentNode.remove();
    handleEmptyMessage();
    getTodoCount();
  }
}

todoList.addEventListener("click", handleTodo);

function handleEmptyMessage() {
  if (todoList.children.length > 0) {
    emptyMsg.classList.add("hide");
  } else {
    emptyMsg.classList.remove("hide");
  }
}

function getTodoCount() {
  let countArray = todoArray.filter((element) => {
    if (element.todoStatus === false) return element;
  });
  counterSpanEl.textContent = countArray.length;
}

function updateTodoStatus(event) {
  const status = event.target.checked;
  const targetElText = event.target.nextElementSibling.textContent;
  todoArray.forEach((element) => {
    if (element.todoItem === targetElText) {
      element.todoStatus = status;
    }
  });
  getTodoCount();
}

todoList.addEventListener("change", updateTodoStatus);

function init() {
  todoInputEl.focus();
}

init();
