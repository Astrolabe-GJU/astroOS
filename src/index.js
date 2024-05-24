//import { initOS } from "./init_os";
import { saveUserAccount } from "./user/user_api";

import { createAppBar } from "./appbar";
import { createTaskBar } from "./taskbar";
import { WindowManager } from "./window_manager";
import { getAppStorePath, getMyGJUPath } from "./apps-list";
document.addEventListener("DOMContentLoaded", () => {
  createAppBar();
  createTaskBar();
  const windowManager = new WindowManager();
  // windowManager.createWindow('MyGJU', 'https://mygju.gju.edu.jo/faces/index.xhtml');

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "y") {
      const shell = document.querySelector(".shell");
      shell.classList.toggle("hidden");
    }
  });

  // appBar Buttons
  document.querySelectorAll(".task-icon").forEach((icon, index) => {
    clickAppButton(windowManager, index, icon);
  });

  document.querySelectorAll(".app-icon-mygju").forEach((icon, index) => {
    icon.addEventListener("click", () => {
      console.log("📄📄📄📄📄📄📄");
      windowManager.createWindow(`MyGJU`, "../src/apps/mygju/mygju.html");
    });
  });

  document.querySelectorAll(".app-icon-photopea").forEach((icon, index) => {
    icon.addEventListener("click", () => {
      console.log("📄📄📄📄📄📄📄");
      windowManager.createWindow(`Photopea`, `https://photopea.com`);
    });
  });

  document.querySelectorAll(".app-icon-notepad").forEach((icon, index) => {
    icon.addEventListener("click", () => {
      windowManager.createWindow(`Notepad`, `../src/apps/notepad/index.html`);
    });
  });
});

export function clickAppButton(windowManager, index, icon) {
  switch (index) {
    case 0:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`AppStore`, getMyGJUPath);
      });
      break;
    case 1:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`NotePad`, getMyGJUPath);
      });
      break;
    case 2:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Calculator`, getMyGJUPath);
      });
      break;
    case 3:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Weather`, getMyGJUPath);
      });
      break;
    case 4:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Lichess`, getMyGJUPath);
      });
      break;
    case 5:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`MyGJU`, getMyGJUPath);
      });
      break;
    case 6:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`GJU`, getMyGJUPath);
      });
      break;
    case 7:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Code`, getMyGJUPath);
      });
      break;
    case 8:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Photo Editor`, getMyGJUPath);
      });
      break;

    default:
      break;
  }
}

//await initOS();

// @toBeDeleted later
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // # From User API
//     saveUserAccount(username, password);

// });
