//selectors
const inputField = document.querySelector("#toDoDescription");
const inputTitle = document.querySelector("#toDoTitle");
const formToDo = document.querySelector("form");
const toDoList = document.querySelector("#toDoList");
const addBtn = document.querySelector("#addButton");
const updateBtn = document.querySelector("#updateButton");

//event listeners
formToDo.addEventListener("submit", addToDo);

addBtn.addEventListener("click", addToDo);

//id for each todo
let id = 0;
toDoArray = []; //array to save each todo object(title, text, id)

function showDetails(id) {
  const el = document.querySelector("#text" + id);
  const classes = el.classList;
  if (classes.contains("hidden")) {
    classes.remove("hidden");
  } else {
    classes.add("hidden");
  }
}

function displayTodos() {
  let list = "";
  toDoArray.forEach((el) => {
    list += `
  <li todo-id="${el.id}" class="liElements" onClick="showDetails(${el.id})">
    <div id="liSpan" class="spanDiv">
      <p id="title${el.id}" class="toDoTitle">${el.title}</p>
      <i class="updateButton fas fa-pen" id="pen" onClick="editToDo(${el.id})"></i>
      <i class="deleteButton fas fa-trash-alt" id="trash-can" onClick="deleteToDo(${el.id})"></i>
    </div>
    <div class="dropdown" id="">
      <p id="text${el.id}" class="toDoContent hidden">${el.text}</p>
    </div>
  </li>
  `;
  });

  toDoList.innerHTML = list;
}

//functions
function addToDo(e) {
  e.preventDefault();
  console.log("adding");

  //retrieving the inputted values
  const inputTitled = inputTitle.value;
  const inputText = inputField.value;

  //ensuring that title and description are not empty
  if (inputTitled.trim() == "" || inputText.trim() == "") return;

  //giving elements random IDs
  const toDoId = Math.floor(Math.random() * 1000000);
  console.log(toDoId);

  //creating new todo object
  const newToDo = { id: toDoId, text: inputText, title: inputTitled };
  //pushing new todo object to todo list array
  toDoArray.push(newToDo);

  displayTodos();

  //clearing fields
  inputTitle.value = "";
  inputField.value = "";
  inputTitle.focus();
  inputTitle.removeAttribute("readonly");

  // if (addUpdateBtn.textContent === "Update") {
  //   addUpdateBtn.textContent = "Add";
  // }

  disableForm();

  // if (addUpdateBtn.classList.contains("update")) {
  //   return;
  // }
}

function editToDo(id) {
  if ((inputTitle.disabled = true) && (inputField.disabled = true)) {
    inputTitle.disabled = false;
    inputField.disabled = false;
  }

  const foundTodo = toDoArray.find((todo) => {
    if (todo.id == id) {
      return true;
    } else {
      return false;
    }
  });

  inputTitle.value = foundTodo.title;
  inputField.value = foundTodo.text;

  document.querySelector("#addButton").classList.add("hidden");
  document.querySelector("#updateButton").classList.remove("hidden");

  updateBtn.addEventListener("click", function () {
    console.log("update id:", id);
    color_text(id);
    console.log("Update");
  });

  // addUpdateBtn.textContent = "Update";
  // addUpdateBtn.classList.add("update");
  // liItem.style.backgroundColor = "rgb(151, 151, 183)";

  // if (addUpdateBtn.classList.contains("update")) {
  //   addUpdateBtn.addEventListener("click", function () {
  //     color_text(id);
  //     console.log("Update");
  //   });
  // } else {
  //   console.log("im an add button");
  //   addUpdateBtn.addEventListener("click", addToDo);
  // }
}

function color_text(id) {
  console.log("color text");
  // liItem.style.backgroundColor = "white";
  toDoArray.forEach((todo) => {
    if (todo.id == id) {
      console.log(todo);
      todo.title = inputTitle.value;
      todo.text = inputField.value;
      document.querySelector("#title" + id).innerHTML = inputTitle.value;
      document.querySelector("#text" + id).innerHTML = inputField.value;
    }
  });
  console.log(toDoArray);

  // inputTitle.value = "";
  // inputField.value = "";
  inputTitle.focus();
  inputTitle.removeAttribute("readonly");
  document.querySelector("#updateButton").classList.add("hidden");
  document.querySelector("#addButton").classList.remove("hidden");
  // addUpdateBtn.textContent = "Add";
  // addUpdateBtn.classList.remove("update");
}

function deleteToDo(e) {
  let item = e.target;
  const spanElem = item.parentElement;
  const liElem = spanElem.parentElement;
  identity = liElem.getAttribute("todo-id");

  let confirmDel = confirm("Delete this To-Do?");
  if (confirmDel) {
    if (item.classList.contains("deleteButton")) {
      var items = toDoList.getElementsByTagName("li");
      for (let index = 0; index < items.length; index++) {
        console.log(index);
        arrayElem = toDoArray[index];
        console.log(identity);
        const arrayId = arrayElem.id;
        if (arrayId == identity) {
          toDoArray.splice(index, 1);
          console.log(toDoArray);
        }
        liElem.remove();
      }
    }
  }
  disableForm();
}

function disableForm() {
  for (let index = 0; index < 9; index++) {
    if (toDoArray.length > 9) {
      inputTitle.disabled = true;
      inputField.disabled = true;
    } else {
      inputTitle.disabled = false;
      inputField.disabled = false;
    }
  }
  console.log(toDoArray);
}

function show_hide(e) {
  let item = e.target;
  const spanElem = item.parentElement;
  const liElem = spanElem.parentElement;
  let identity = null;

  if (item.classList.contains("liElements")) {
    identity = item.getAttribute("todo-id");
  }
  if (item.classList.contains("spanDiv")) {
    identity = spanElem.getAttribute("todo-id");
  }
  if (item.classList.contains("toDoTitle")) {
    identity = liElem.getAttribute("todo-id");
  }

  console.log(identity);

  //selectors
  dropdown = document.querySelector("#myDropdown");
  dropdownDiv = document.querySelector(".dropdown");
  dropdownTitle = document.querySelector("#titleP");
  penIcon = document.querySelector("#pen");
  trashIcon = document.querySelector("#trash-can");

  function dropdownFunc() {
    if (dropdown.classList.contains("hidden")) {
      //DOM CSS Manipulations
      dropdown.classList.remove("hidden");

      dropdownTitle.style.overflow = "visible";
      dropdownTitle.style.whiteSpace = "normal";
      dropdownTitle.style.wordWrap = "wrap";

      penIcon.classList.add("hidden");
      trashIcon.classList.add("hidden");
    } else {
      dropdown.classList.add("hidden");

      dropdownTitle.style.overflow = "hidden";
      dropdownTitle.style.whiteSpace = "nowrap";
      dropdownTitle.style.textOverflow = "ellipsis";

      penIcon.classList.remove("hidden");
      trashIcon.classList.remove("hidden");
    }
  }

  var items = toDoList.getElementsByTagName("li");
  for (let index = 0; index < items.length; index++) {
    console.log("array index " + index);
    arrayElem = toDoArray[index];
    console.log(arrayElem);
    const arrayId = arrayElem.id;

    if (arrayId == identity) {
      console.log("id in array ", arrayId, identity);
      if (arrayId == dropdownDiv.getAttribute("id")) {
        dropdownFunc();
      }
    }
  }
}
