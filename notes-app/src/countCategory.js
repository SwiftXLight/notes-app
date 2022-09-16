import { data } from "../index.js";

let taskActive = document.querySelector("#task-active");
let taskArchived = document.querySelector("#task-archive");
let ideaActive = document.querySelector("#idea-active");
let ideaArchived = document.querySelector("#idea-archive");
let randomThoughtActive = document.querySelector("#random-thought-active");
let randomThoughtArchived = document.querySelector("#random-thought-archive");

export function countCategory () {
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