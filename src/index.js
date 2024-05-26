//import { initOS } from "./init_os";
import { saveUserAccount } from "./user/user_api";

import { createAppBar } from "./appbar";
import { createTaskBar } from "./taskbar";
import { WindowManager } from "./window_manager";
import {
  getAccountPath,
  getAppStorePath,
  getCalculatorPath,
  getFileExplorerPath,
  getGJUPath,
  getLichessPath,
  getMyGJUPath,
  getNotePadPath,
  getPhotopeaPath,
  getTerminalPath,
  getVSCodePath,
  getWeatherAppPath,
} from "./apps-list";
document.addEventListener("DOMContentLoaded", () => {
  createAppBar();
  createTaskBar();
  const windowManager = new WindowManager();
  // windowManager.createWindow('MyGJU', 'https://mygju.gju.edu.jo/faces/index.xhtml');

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "y") {
      windowManager.createWindow("Terminal", getTerminalPath);
    }
  });

  // appBar Buttons
  document.querySelectorAll(".app-icon").forEach((icon, index) => {
    clickAppButton(windowManager, index, icon);
  });
  // taskBar Icon Buttons
  document.querySelectorAll(".task-icon").forEach((icon, index) => {
    clickTaskButton(windowManager, index, icon);
  });
});

export function clickAppButton(windowManager, index, icon) {
  switch (index) {
    // case 0:
    //   icon.addEventListener("click", () => {
    //     windowManager.createWindow(`AppStore`, getAppStorePath);
    //   });
    //   break;
    case 0:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`NotePad`, getNotePadPath);
      });
      break;
    case 1:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Calculator`, getCalculatorPath);
      });
      break;
    // case 3:
    //   icon.addEventListener("click", () => {
    //     windowManager.createWindow(`Weather`, getWeatherAppPath);
    //   });
    //   break;
    case 2:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Lichess`, getLichessPath);
      });
      break;
    case 3:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`MyGJU`, getMyGJUPath);
      });
      break;
    case 4:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`GJU`, getGJUPath);
      });
      break;
    case 5:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Code`, getVSCodePath);
      });
      break;
    case 6:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Photo Editor`, getPhotopeaPath);
      });
      break;

    default:
      break;
  }
}
export function clickTaskButton(windowManager, index, icon) {
  switch (index) {
    case 0:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`File Explorer`, getFileExplorerPath);
      });
      break;
    case 1:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Terminal`, getTerminalPath);
      });
      break;
    case 2:
      icon.addEventListener("click", () => {
        windowManager.createWindow(`Account`, getAccountPath);
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
