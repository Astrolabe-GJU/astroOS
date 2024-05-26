function saveUserAccount(username, password) {
  const request = indexedDB.open("astroOS", 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", { keyPath: "username" });
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    const account = { username: username, password: password };
    const addRequest = store.add(account);

    addRequest.onsuccess = function () {
      console.log("User account added successfully");
      displayAccountInfo(account);
    };

    addRequest.onerror = function (event) {
      console.error("Error adding user account: " + event.target.errorCode);
    };
  };

  request.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
  };
}

function checkUserAccounts() {
  const request = indexedDB.open("astroOS", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function (event) {
      const users = event.target.result;
      if (users.length > 1) {
        displayAccountInfo(users[0]); // Display the first non-guest user
      } else {
        displayAccountInfo({ username: "guest", email: "guest@example.com" });
        document.getElementById("signup-form").style.display = "block";
      }
    };

    getAllRequest.onerror = function (event) {
      console.error(
        "Error retrieving user accounts: " + event.target.errorCode
      );
    };
  };

  request.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
  };
}

function displayAccountInfo(user) {
  document.getElementById("account-info").style.display = "block";
  document.getElementById("display-username").textContent = user.username;
  document.getElementById(
    "display-email"
  ).textContent = `${user.username}@gju.edu.jo`;
  document.getElementById("signup-form").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  checkUserAccounts();

  document
    .getElementById("user-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      saveUserAccount(username, password);
    });

  document
    .getElementById("logout-button")
    .addEventListener("click", function () {
      const username = document.getElementById("display-username").textContent;
      deleteUserAccount(username);
    });
});
function deleteUserAccount(username) {
  const request = indexedDB.open("astroOS", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    const deleteRequest = store.delete(username);

    deleteRequest.onsuccess = function () {
      console.log("User account deleted successfully");
      location.reload();
    };

    deleteRequest.onerror = function (event) {
      console.error("Error deleting user account: " + event.target.errorCode);
    };
  };

  request.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
  };
}
