import {someVar} from "./src/someVar.js";
console.log(someVar);

//pop-up form
let form = document.querySelector("#form");
let msg = document.querySelector("#msg");

//main list
let notesList = document.querySelector(".notes-list");

//add note button
let addNote = document.querySelector("#add");

//toggle button for show active/archive notes
let toggleNotes = document.querySelector(".toggle-notes");

//active and archive counters
let taskActive = document.querySelector("#task-active");
let taskArchived = document.querySelector("#task-archive");
let ideaActive = document.querySelector("#idea-active");
let ideaArchived = document.querySelector("#idea-archive");
let randomThoughtActive = document.querySelector("#random-thought-active");
let randomThoughtArchived = document.querySelector("#random-thought-archive");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";
    acceptData();
    addNote.setAttribute("data-bs-dismiss", "modal");
    addNote.click();

    (() => {
      addNote.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  let newItem = {
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    category: category.value,
    isArchived: false
  };
  data.push(newItem);
  console.log(data);

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
  notesList.innerHTML = "";
  data.map((x, y) => {
    console.log(x)
    let checkArc = () => {
      if (data[y].isArchived) {
        return "toggle-arc";
      } else {
        return "";
      }
    };

    let utc = new Date().toJSON().slice(0,10);
    let reg = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
    if (x.description.match(reg)) {
      x.date = x.description.match(reg);
    }

    let newLi = document.createElement("li");
    newLi.setAttribute("class", `list-item ${checkArc()}`);
    newLi.setAttribute("id", y);

    let spanText = document.createElement("span");
    spanText.setAttribute("class", "fw-bold");
    spanText.innerHTML = x.text;
    console.log(spanText)
    newLi.appendChild(spanText);

    let spanUtc = document.createElement("span");
    spanUtc.setAttribute("class", "small text-secondary");
    spanUtc.innerHTML = utc;
    newLi.appendChild(spanUtc);

    let spanCategory = document.createElement("span");
    spanCategory.setAttribute("class", "fw-bold");
    spanCategory.innerHTML = x.category;
    newLi.appendChild(spanCategory);

    let spanDescription = document.createElement("span");
    spanDescription.setAttribute("class", "small text-secondary");
    spanDescription.innerHTML = x.description;
    newLi.appendChild(spanDescription);

    let spanDate = document.createElement("span");
    spanDate.setAttribute("class", "small text-secondary");
    spanDate.innerHTML = x.date;
    newLi.appendChild(spanDate);

    let spanOptions = document.createElement("span");
    spanOptions.setAttribute("class", "options");

    let archiveBtn = document.createElement("i");
    archiveBtn.setAttribute("class", "fa-solid fa-box-archive");
    archiveBtn.onclick = () => archiveTask(archiveBtn);
    spanOptions.appendChild(archiveBtn);

    let editBtn = document.createElement("i");
    editBtn.setAttribute("class", "fas fa-edit");
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#form");
    editBtn.onclick = ()=> editTask(editBtn)
    spanOptions.appendChild(editBtn);

    let deleteBtn = document.createElement("i");
    deleteBtn.setAttribute("class", "fas fa-trash-alt");
    deleteBtn.onclick = ()=> deleteTask(deleteBtn)
    spanOptions.appendChild(deleteBtn);

    newLi.appendChild(spanOptions);
    console.log(newLi);
    notesList.appendChild(newLi);
  });
  countCategory();
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  countCategory();
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  category.value = selectedTask.children[3].innerHTML;
  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  category.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);

  createTasks();
})();

function countCategory () {
  let idea = 0;
  let ideaArc = 0;
  let task = 0;
  let taskArc = 0;
  let randomThought = 0;
  let randomThoughtArc = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].category === "Idea" && !data[i].isArchived) {
      idea++;
    } 
    else if (data[i].category === "Idea" && data[i].isArchived) {
      ideaArc++;
    }
    else if (data[i].category === "Random Thought" && !data[i].isArchived) {
      randomThought++;
    }  
    else if (data[i].category === "Random Thought" && data[i].isArchived) {
      randomThoughtArc++;
    }
    else if (data[i].category === "Task" && !data[i].isArchived) {
      task++;
     } 
    else if (data[i].category === "Task" && data[i].isArchived) {
      taskArc++;
    }
  }

  taskActive.innerHTML = task;
  taskArchived.innerHTML = taskArc;
  ideaActive.innerHTML = idea;
  ideaArchived.innerHTML = ideaArc;
  randomThoughtActive.innerHTML = randomThought;
  randomThoughtArchived.innerHTML = randomThoughtArc;
};

let archiveTask = (e) => {
  let element = e.parentElement.parentElement;
  if (data[element.id].isArchived !== null) {
    data[element.id] = {...data[element.id], isArchived: !data[element.id].isArchived};
  } 
  element.classList.toggle("toggle-arc");

  localStorage.setItem("data", JSON.stringify(data));
  countCategory();
};

toggleNotes.addEventListener("click", toggleNotesDisplay);

function toggleNotesDisplay() {
  for (let i = 0; i < data.length; i++) {
    if (data[i].isArchived) {
      notesList.children[i].classList.toggle("toggle-arc");
    } else if (!data[i].isArchived) {
      notesList.children[i].classList.toggle("toggle-arc");
    }
  }
};
