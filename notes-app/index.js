let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let notesList = document.querySelector(".notes-list");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
    notesList.innerHTML = "";
    data.map((x, y) => {
        let utc = new Date().toJSON().slice(0,10);
        let reg = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
        if (x.description.match(reg)) {
            console.log(x.description.match(reg));
            x.date = x.description.match(reg);
        }
        return (notesList.innerHTML += `
        <li id=${y} class="list-item">
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${utc}</span>
            <span class="fw-bold">Category</span>
            <span class="small text-secondary">${x.description}</span>
            <span class="small text-secondary">${x.date}</span>
  
            <span class="options">
                <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </li>
        `
        );
    });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();
