import { acceptData } from "./acceptData.js";

let addNote = document.querySelector("#add");
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