import { acceptData } from "./acceptData.js";

//add note button
let addNote = document.querySelector("#add");

//validation error message
let msg = document.querySelector("#msg");

export let formValidation = () => {
    if (textInput.value === "") {
      msg.innerHTML = "Task cannot be blank";
    } else {
      msg.innerHTML = "";
      acceptData();
      addNote.setAttribute("data-bs-dismiss", "modal");
      addNote.click();
      addNote.setAttribute("data-bs-dismiss", "");
    }
  };