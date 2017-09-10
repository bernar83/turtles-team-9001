var todoLastPurge, todoListKeys, todoRawInput, todoRandomId, todoCurrentKey, todoCurrentKeyLastPlace;

function todoBoxDisplay() {
  document.getElementById("todoButton").addEventListener("click", function() {
    document.getElementById("todoBox").classList.toggle("todoBoxOff");
  })
}

function todoInitialize() {
  window.localStorage.setItem("initialization", true);

  todoSetPurgeTime();

  let todoItemsJSON = {};
  window.localStorage.setItem("todoItemsJSON", JSON.stringify(todoItemsJSON));
}

function todoSetPurgeTime() {
  let x = new Date();
  let d = x.getDate();
  let m = x.getMonth();
  let y = x.getFullYear();
  let z = new Date(y, m, d, 03, 00, 00, 0);

  let todoLastPurge = Date.parse("'" + z + "'");
  window.localStorage.setItem("lastPurge", todoLastPurge);
}

function todoRetrieve() {
  let todoItemsJSON = window.localStorage.getItem("todoItemsJSON");
  return JSON.parse(todoItemsJSON);
}

function todoEraseCheck() {
  let todoCurrentTime = Date.now();
  let todoLastPurge = window.localStorage.getItem("lastPurge");
  return todoCurrentTime - todoLastPurge > 86400000;
  //return todoCurrentTime - todoLastPurge > 30000;
}

function todoEraseDoneItems() {
  todoListKeysToPrint = todoListKeys;
  todoListItemsToPrint = todoListItems;
  for (let i = 0; i < todoListKeys.length; i) {
    console.log("Passing thru erasing items 'for' loop");
    let todoCurrentKeyLastPlace = todoListKeys[i].slice(-1);
    if (todoCurrentKeyLastPlace === "z") {
      todoListKeysToPrint.splice(i, 1);
      todoListItemsToPrint.splice(i, 1);
    } else {
      i++;
    }
  }
    window.localStorage.removeItem("zzlastPurge");
    todoSetPurgeTime();
    window.localStorage.setItem("zzLastPurge", todoLastPurge);
}

function todoRetrieve() {
  todoListKeys = Object.keys(localStorage);
  todoListKeys.sort();
  for (var i = 0; i < (todoListKeys.length - 2); i++) {
    todoCurrentKey = todoListKeys[i];
    todoCurrentKeyLastPlace = todoCurrentKey.slice(-1);
    todoRawInput = localStorage.getItem(todoCurrentKey);

    todoConstructItem(todoRawInput, todoCurrentKey, todoCurrentKeyLastPlace);
function todoPrintTodos() {
  for (let i = 0; i < todoListKeys.length; i++){
    todoRawInput = todoListItemsToPrint[i];
    todoCurrentKey = todoListKeysToPrint[i];
    todoCurrentKeyLastPlace = todoListKeys[i].slice(-1);

    todoConstructItem();
  }
}

//Function to count number of todo items left, not counting those checked off.
function todoCount() {
  todoListKeys = Object.keys(localStorage);

  var todoNumberOfItems = todoListKeys.filter(function(key){
    return key.length === 14;
  })
  document.getElementById("todoCounter").innerHTML = todoNumberOfItems.length;
}

function todoListenToSubmit() {
  let todoForm = document.getElementById("todoInputForm");
  todoForm.addEventListener("submit", function(event) {
    todoRawInput = document.getElementById("todoInputField").value;
    if (todoRawInput.search(/\S/) !== -1) {
      todoConstructItem(todoRawInput);
      todoListKeysToStore.push(todoRandomId);
      todoListItemsToStore.push(todoRawInput);
      todoStore();
      todoCount();
    }
    todoForm.reset();
    event.preventDefault();
  });
}

function todoMakeRandomId() {
  return "t" + Date.now();
}

function todoConstructItem() {
  var todoTextNode = document.createTextNode(todoRawInput);

  const todoCheckbox = document.createElement("input");
  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckbox.setAttribute("name", "todoItemCheckbox");
  todoCheckbox.setAttribute("id", "todoItemCheckbox");
  todoCheckbox.addEventListener("click", todoCheckoff);
  if (todoCurrentKeyLastPlace === "z") {
    todoCheckbox.setAttribute("checked", true);
  }

  const todoTextWrap = document.createElement("p");
  todoTextWrap.setAttribute("id", "todoItemName");
  todoTextWrap.appendChild(todoTextNode);
  if (todoCurrentKeyLastPlace === "z") {
    todoTextWrap.setAttribute("class", "todoItemDone");
  }

  const todoItemWrap = document.createElement("li");
  if (!todoCurrentKey || todoCurrentKey === "undefined") {
    todoRandomId = todoMakeRandomId();
    todoItemWrap.setAttribute("id", todoRandomId);
  } else {
    todoItemWrap.setAttribute("id", todoCurrentKey);
    todoCurrentKey = undefined;
  }

  todoItemWrap.appendChild(todoCheckbox);
  todoItemWrap.appendChild(todoTextWrap);

  const todoList = document.getElementById("todoList");
  todoList.appendChild(todoItemWrap);

  todoStore();
}

function todoCheckoff() {
  let todoSibling = this.nextElementSibling;
  todoSibling.classList.toggle("todoItemDone");

  let todoCurrentId = this.parentElement.getAttribute("id");
  let todoCurrentItem = todoSibling.innerHTML;

  let todoCurrentKeyLastPlace = todoCurrentId.slice(-1);
  let todoNewId;
  let idx = todoListKeysToStore.indexOf(todoCurrentId);

  if (todoCurrentKeyLastPlace === "z") {
    console.log(todoListKeysToStore);
    console.log(todoListKeysToPrint);
    todoNewId = todoCurrentId.split('');
    todoNewId.pop();
    todoNewId = todoNewId.join('');
    todoListKeysToStore.splice(idx, 1, todoNewId);
    todoListKeysToPrint.splice(idx, 1, todoNewId);
    this.parentElement.setAttribute("id", todoNewId);
  } else {
    todoNewId = todoCurrentId + "z";
    todoListKeysToStore.splice(idx, 1, todoNewId);
    todoListKeysToPrint.splice(idx, 1, todoNewId);
    this.parentElement.setAttribute("id", todoNewId);
  }

  console.log(todoListKeysToPrint);
  console.log(todoListKeysToStore);
  todoStore();
  todoCount();
}

window.onload = function(){
  todoLastPurge = window.localStorage.getItem("zzLastPurge");
  todoListKeys = Object.keys(localStorage);

  if (!todoLastPurge) {
    todoSetPurgeTime();
    window.localStorage.setItem("zzlastPurge", todoLastPurge);
  }
  if (todoListKeys.length > 1) {
    todoEraseDoneItems(todoLastPurge);
  }
  todoRetrieve();
  todoCount();
  todoListenToSubmit();
  todoBoxDisplay();
}
