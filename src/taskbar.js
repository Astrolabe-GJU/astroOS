import {
    svgExplorer,
    svgTerminal,
    svgUser,
    svgSearch,
  } from "./utils/svg";
  export function createTaskBar() {
    const taskBar = document.getElementById("task-bar");
  
    const searchBar = document.createElement("div");
    searchBar.className = "search-bar"
    const taskIconSearch = document.createElement("div");
    taskIconSearch.className = "search-icon";
    taskIconSearch.innerHTML = svgSearch;
    
    const searchInput = document.createElement("input");
    searchInput.type ='text';
    searchInput.placeholder = 'What are you looking for?';
    searchInput.className = 'search-input';

    searchBar.appendChild(taskIconSearch);
    searchBar.appendChild(searchInput);

    taskBar.appendChild(searchBar);
  
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
  
 