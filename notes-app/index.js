let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let notesList = document.querySelector(".notes-list");
let add = document.getElementById("add");
let taskActive = document.querySelector("#task-active");
let taskArchived = document.querySelector("#task-archive");
let ideaActive = document.querySelector("#idea-active");
let ideaArchived = document.querySelector("#idea-archive");
let randomThoughtActive = document.querySelector("#random-thought-active");
let randomThoughtArchived = document.querySelector("#random-thought-archive");
let toggleNotes = document.querySelector(".toggle-notes");

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
    category: category.value,
    isArchived: false
  });

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
    notesList.innerHTML = "";
    data.map((x, y) => {
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
        console.log(x.description.match(reg));
        x.date = x.description.match(reg);
      }
      return (notesList.innerHTML += `
        <li id=${y} class="list-item ${checkArc()}">
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${utc}</span>
          <span class="fw-bold">${x.category}</span>
          <span class="small text-secondary">${x.description}</span>
          <span class="small text-secondary">${x.date}</span>
  
          <span class="options">
            <i onClick="archiveTask(this)">arc</i>
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </li>
      `
      );
    });
    countCategory();
    resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  countCategory();
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
  if (data[element.id].isArchived === true) {
    data[element.id].isArchived = false;
  } else if (data[element.id].isArchived === false) {
    data[element.id].isArchived = true;
    
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
