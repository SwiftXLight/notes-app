import { data } from "../index.js";
import { createTasks } from "./createTasks.js";

export let acceptData = () => {
    let newItem = {
      text: textInput.value,
      description: textarea.value,
      category: category.value,
      isArchived: false
    };
    data.push(newItem);
    console.log(data);
  
    localStorage.setItem("data", JSON.stringify(data));
    try {
      createTasks();
    } catch(e) {
      console.log(e);
    }
};