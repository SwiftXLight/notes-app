import { data } from "../index.js";
import { archiveTask } from "./archiveTask.js";
import { deleteTask } from "./deleteTask.js";
import { editTask } from "./editTask.js";
import {countCategory} from "./countCategory.js";
import {resetForm} from "./resetForm.js";

let notesList = document.querySelector(".notes-list");

export const createTasks = () => {
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
        let matchDate = "";
        if (x.description.match(reg)) {
            matchDate = x.description.match(reg);
        }
  
        let newLi = document.createElement("li");
        newLi.setAttribute("class", `list-item ${checkArc()}`);
        newLi.setAttribute("id", y);
  
        let spanText = document.createElement("span");
        spanText.setAttribute("class", "fw-bold");
        spanText.innerHTML = x.text;
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
        spanDate.innerHTML = matchDate;
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
        notesList.appendChild(newLi);
    });
    try {
        countCategory();
        resetForm();
    } catch(e) {
        console.log(e);
    }
}