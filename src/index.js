import { initOS } from "./init_os";

await initOS();

 function saveUserAccount(username, password) {
    // Open or create IndexedDB database
    const request = indexedDB.open('astroOS', 1);

    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        // Create transaction and object store
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        // Add user account data
        const account = { username: username, password: password };
        const addRequest = store.add(account);

        addRequest.onsuccess = function(event) {
            console.log("User account added successfully");
        };

        addRequest.onerror = function(event) {
            console.error("Error adding user account: " + event.target.errorCode);
        };
    };

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        // Create object store for user accounts
        const objectStore = db.createObjectStore("users", { keyPath: "username" });
    };
}

// Event listener for form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Save user account
    saveUserAccount(username, password);
    // You can also add authentication logic here
});
