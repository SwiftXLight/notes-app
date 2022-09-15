import { data } from "../index.js";
import { countCategory } from "./countCategory.js";

export let archiveTask = (e) => {
    let element = e.parentElement.parentElement;
    if (data[element.id].isArchived !== null) {
      data[element.id] = {...data[element.id], isArchived: !data[element.id].isArchived};
    } 
    element.classList.toggle("toggle-arc");
  
    localStorage.setItem("data", JSON.stringify(data));
    try {
      countCategory();
    } catch(e) {
      console.log(e);
    }
};