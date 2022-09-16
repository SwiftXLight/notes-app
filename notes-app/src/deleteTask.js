import { data } from "../index.js";
import { countCategory } from "./countCategory.js";

export let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    try {
      countCategory();
    } catch(e) {
      console.log(e);
    }
    console.log(data);
  };
  