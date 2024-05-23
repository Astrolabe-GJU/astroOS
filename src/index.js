//import { initOS } from "./init_os";
import { saveUserAccount } from "./user/user_api";


import { createAppBar } from './appbar';
import { createTaskBar } from './taskbar';
import { WindowManager } from './window_manager';

document.addEventListener('DOMContentLoaded', () => {
  createAppBar();
  createTaskBar();
  const windowManager = new WindowManager();
  // windowManager.createWindow('MyGJU', 'https://mygju.gju.edu.jo/faces/index.xhtml');

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'y') {
      const shell = document.querySelector('.shell');
      shell.classList.toggle('hidden');
    }
  });
  
  document.querySelectorAll('.task-icon').forEach((icon, index) => {
    icon.addEventListener('click', () => {
      console.log('✨✨✨✨');
      windowManager.createWindow(`MyGJU`, '../src/apps/mygju/mygju.html');
    });
  });
  
  document.querySelectorAll('.app-icon-mygju').forEach((icon, index) => {
    icon.addEventListener('click', () => {
      console.log('📄📄📄📄📄📄📄');
      windowManager.createWindow(`MyGJU`, '../src/apps/mygju/mygju.html');
    });
  });
  
  document.querySelectorAll('.app-icon-photopea').forEach((icon, index) => {
    icon.addEventListener('click', () => {
      console.log('📄📄📄📄📄📄📄');
      windowManager.createWindow(`Photopea`, `https://photopea.com`);
    });
  });
  
  document.querySelectorAll('.app-icon-notepad').forEach((icon, index) => {
    icon.addEventListener('click', () => {
      windowManager.createWindow(`Notepad`, `../src/apps/notepad/index.html`);
    });
  });
});

//await initOS();


// @toBeDeleted later
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
  
//     // # From User API
//     saveUserAccount(username, password);
    
// });