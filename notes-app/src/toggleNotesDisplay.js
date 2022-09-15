import { data } from "../index.js";

//main list
let notesList = document.querySelector(".notes-list");

export function toggleNotesDisplay() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isArchived) {
        notesList.children[i].classList.toggle("toggle-arc");
      } else if (!data[i].isArchived) {
        notesList.children[i].classList.toggle("toggle-arc");
      }
    }
};
  