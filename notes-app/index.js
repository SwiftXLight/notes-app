import {createTasks} from "./src/createTasks.js";
import {formValidation} from "./src/formValidation.js"
import {toggleNotesDisplay} from "./src/toggleNotesDisplay.js"

let form = document.querySelector("#form");
let toggleNotes = document.querySelector(".toggle-notes");

export let data = [{}];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);

  createTasks();
})();

toggleNotes.addEventListener("click", toggleNotesDisplay);
