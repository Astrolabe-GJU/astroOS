import {
    svgMyGJU,
    svgAppStore,
    svgCode,
    svgGJU,
    svgKrunker,
    svgLichess,
    svgNotepad,
    svgPhotopea,
    svgExplorer,
    svgTerminal,
    svgUser,
  } from "./utils/svg";
  export function createTaskBar() {
    const taskBar = document.getElementById("task-bar");
  
    // const appIconAppStore = document.createElement("div");
    // appIconAppStore.className = "app-icon-app-store";
    // appIconAppStore.innerHTML = svgAppStore;
    // taskBar.appendChild(appIconAppStore);
  
    const taskIconExplorer = document.createElement("div");
    taskIconExplorer.className = "task-icon";
    taskIconExplorer.innerHTML =svgExplorer;
    taskBar.appendChild(taskIconExplorer);
  
    const taskIconTerminal = document.createElement("div");
    taskIconTerminal.className = "task-icon";
    taskIconTerminal.innerHTML = svgTerminal;
    taskBar.appendChild(taskIconTerminal);
  
    const taskIconUser = document.createElement("div");
    taskIconUser.className = "task-icon";
    taskIconUser.innerHTML = svgUser;
    taskBar.appendChild(taskIconUser);
  
    
  }
  