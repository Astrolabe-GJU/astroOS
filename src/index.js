import { initOS } from "./init_os";
import { saveUserAccount } from "./user/user_api";

await initOS();


// @toBeDeleted later
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // # From User API
    saveUserAccount(username, password);
    
});