import { deleteTask } from "./deleteTask.js";

export let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    category.value = selectedTask.children[3].innerHTML;
    try {
      deleteTask(e);
    } catch(e) {
      console.log(e);
    }
  };