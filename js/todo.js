var todoRawInput, todoRandomId;
var todoListKeys = Object.keys(localStorage);

function todoMakeRandomId() {
  todoRandomId = "t" + Date.now();
}

function todoListenToSubmit() {
  var todoForm = document.getElementById("todoInputForm");
  todoForm.addEventListener("submit", function(event) {
    todoRawInput = document.getElementById("todoInputField").value;
    todoConstructItem(todoRawInput);
    todoStore();
    todoForm.reset();
    event.preventDefault();
  });
}

function todoConstructItem() {
  var todoTextNode = document.createTextNode(todoRawInput);

  if (todoRawInput) {
    var todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.setAttribute("name", "todoItemCheckbox");
    todoCheckbox.setAttribute("id", "todoItemCheckbox");
    todoCheckbox.addEventListener("click", todoCheckoff);

    var todoTextWrap = document.createElement("p");
    todoTextWrap.setAttribute("id", "todoItemName");
    todoTextWrap.appendChild(todoTextNode);

    var todoItemWrap = document.createElement("li");
    todoMakeRandomId();
    todoItemWrap.setAttribute("id", todoRandomId);

    todoItemWrap.appendChild(todoCheckbox);
    todoItemWrap.appendChild(todoTextWrap);

    var todoList = document.getElementById("todoList");
    todoList.appendChild(todoItemWrap);

    todoCount();
  }
}

//This function should give the stored item a timestamp to be used for erasing items at a certain interval.
function todoCheckoff() {
  var x = this.nextElementSibling;
  x.classList.toggle("todoItemDone");
  todoCount();
}

//Function to erase crossed out todos after certain interval.
//All crossed off items should be erased at the same time, e.g., at 00:00.
//Upon loading extension, before stored todo items are displayed, this function runs, erasing any checked off todo items that have lapsed the time interval.
function todoEraseDoneItems() {
  var x = "";
  console.log("'" + x + "' = output of todoEraseDoneItems function.");
}

//Function to retrieve & display stored todo items.
function todoRetrieve() {
  var x = "";
  console.log("'" + x + "' = output of todoRetrieve function.")
}

//Function to count number of todo items left, not counting those checked off.
function todoCount() {
  var x = "";
  console.log("'" + x + "' = output of todoCount function.")
}

//Function to store todo items, potentially using window.localStorage.
function todoStore() {
  var x = "This is the output of the todoStore function."
  console.log(x)
}

window.onload = function(){
  todoEraseDoneItems();
  todoRetrieve();
  todoCount();
  todoSubmitListen();
}
