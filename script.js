// showList();
const form = document.querySelector("#form");
let textInput = document.querySelector("#textInput");
let dateInput = document.querySelector("#dateInput");
let textArea = document.querySelector("#textarea");
let msg = document.querySelector("#msg");
let tasks = document.querySelector("#tasks");
let msgBox = true;
let add = document.querySelector("#add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  if (textInput.value == "" && dateInput.value == "" && textArea.value == "") {
    msg.innerHTML = "Title Cant blank";
  } else {
    msg.innerHTML = "";
    acceptData();
  clearForm();

    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
}

let taskList = [{}];

function acceptData() {
  taskList.push({
    TaskTitle: textInput.value,
    TaskDate: dateInput.value,
    TaskDescription: textArea.value,
  });
  localStorage.setItem("taskList", JSON.stringify(taskList));
  showList();
}

function showList() {
  tasks.innerHTML = "";
  taskList.map((task, id) => {
    return (tasks.innerHTML += `
      <div id=${id}>
        <h2>${task.TaskTitle}</h2>
        <small>${task.TaskDate}</small>
        <p>${task.TaskDescription}</p>
        <span class="actionBox">
        <i class="text-primary fas fa-edit" onclick=editItem(this,${id})  data-bs-toggle="modal" data-bs-target="#form"></i>
        <i class="text-danger fas fa-trash-alt ms-2" onclick=deleteItem(${id})></i>
        </span>
      </div>`);
  });
}

// Edit Item
function editItem(e, id) {
  let choosedItem = e.parentElement.parentElement;
  console.log(choosedItem);
  textInput.value = choosedItem.children[0].innerHTML;
  dateInput.value = choosedItem.children[1].innerHTML;
  textArea.value = choosedItem.children[2].innerHTML;
  taskList = localStorage.getItem("taskList");
  taskList = JSON.parse(taskList);
  // localStorage.setItem('taskList', JSON.stringify(taskList))
  setTimeout(()=>{
    deleteItem(id);
  },1000)
  showList();
}

// Delete Item
function deleteItem(id) {
  // console.log(e.parentElement.parentElement.remove());
  taskList = localStorage.getItem("taskList");
  taskList = JSON.parse(taskList);
  taskList.splice(id, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  showList();
}
function clearForm() {
  console.log("first");
  (textInput.value = ""), (dateInput.value = ""), (textArea.value = "");
}

(function () {
  taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  showList();
})();
