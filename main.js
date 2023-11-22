const TOAST_TYPES = {
  success: "success",
  warning: "warning",
  error: "error",
};

const STATUS = {
  _ADD: "add",
  _EDIT: "edit",
};

const TIME =  {
  _3_SECOND: 3* 1000 
}

let todos = [];
let currentEditIndex = -1;

const toastSoundSuccess = document.getElementById("toastSoundSuccess");
const toastSoundError = document.getElementById("toastSoundError");


const renderTodoList = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.innerHTML = `
    <span>${todo}</span>
    <div>
        <button class="btn btn-primary" onclick="openPopup('edit', ${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTodo(${index})">Delete</button>
    </div>
    `;
    todoList.appendChild(listItem);
  });
};

const openPopup = (action, index = -1) => {
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const todoText = document.getElementById("todo-text");

  if (action === STATUS._ADD) {
    popupTitle.innerText = "Add Todo";
    todoText.value = "";
    currentEditIndex = -1;
  } else if (action === STATUS._EDIT) {
    popupTitle.innerText = "Edit Todo";
    todoText.value = todos[index];
    currentEditIndex = index;
  }

  popup.style.display = "flex";
};

const closePopup = () => {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
};

const saveTodo = () => {
  const todoText = document.getElementById("todo-text").value;

  if (todoText === "") {
    ToastError("Please enter input !!!")
    toastSoundError.play();
  }

  if (currentEditIndex === -1) {
    // Add new todo
    todos.push(todoText);
    ToastSuccess(`Add Todo ${currentEditIndex} ✅`)
    toastSoundSuccess.play();
  } else {
    // Edit existing todo
    todos[currentEditIndex] = todoText;
    ToastSuccess(`edit Todo ${todoText} ✅`)
    toastSoundSuccess.play();
  }

  renderTodoList();
  closePopup();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  toastSoundSuccess.play();
  renderTodoList();
};

const showToast = (message, type) => {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "toast";

    switch (type) {
        case TOAST_TYPES.success:
          toast.classList.add("success");
          break;
        case TOAST_TYPES.error:
          toast.classList.add("error");
          break;
        default:
          break;
      }

    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, TIME._3_SECOND);
  };

  const ToastError = (message) => {
    showToast(message,TOAST_TYPES.error );
  };

  const ToastSuccess = (message) => {
    showToast(message, TOAST_TYPES.success);
  };

renderTodoList();