import {
  Directory,
  rootDirectory,
} from "../packages/shell/src/models/directory_model";
import { updateDirectory } from "../packages/shell/src/repo/shell_api";
import { createIfGuestUser } from "./user/user_api";

document.addEventListener("DOMContentLoaded", async () => {
  const loadingElement = document.querySelector(".loading");
  const loadedContentElement = document.querySelector(".loaded-content");

  console.log("@app Loading App.... ");
  // Show loading animation
  loadingElement.style.display = "block";

  try {
    console.log("@app Creating DB.... ");
    await initDb();
    console.log("@app Created DB 💪");

    await createIfGuestUser()
      .then((result) => {
        let res = result;
        res == "user"
          ? console.log("Guest account exists")
          : res == "none"
          ? console.log("no Guest, Created a new Guest account")
          : console.log("@initOS -- Unexpected result: ", res);
      })
      .catch((error) => {
        console.error("@initOS :: init_os.js :: #promiseError.", error);
      });

    const directories = await fetchDirectoriesFromIndexedDB();

    console.log("@app  fetching Directories.... ");
    const directoryModels = directories.map(convertToDirectoryModel);
    console.log("@app fetched Directories 💪", directoryModels);

    console.log("@app  fetching nested Directories.... ");
    const nestedDirectories = nestDirectories(directoryModels);
    console.log("@app fetched nested Directories 💪", nestedDirectories);

    console.log("@app  get Root Directory.... ");
    const _rootDir = getRootDirectory(nestedDirectories);
    console.log("@app get Root Directory 💪", _rootDir);
    

    // @TODO: convert Files to File Handles Model ?
    // @TODO: Nest Sub-directories _/
    // @TODO: Find _ROOT_
    // @TODO: export default _ROOT_

    //await createDirectoryDb(root, '');

    // Hide loading animation
    loadingElement.style.display = "none";

    // Display loaded content
    loadedContentElement.style.display = "block";
    displayDirectories([_rootDir], loadedContentElement);
  } catch (error) {
    console.error("Error loading directories:", error);
    loadingElement.textContent = "Failed to load data";
  }
});

async function fetchDirectoriesFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("directories")) {
        db.createObjectStore("directories", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["directories"], "readonly");
      const objectStore = transaction.objectStore("directories");
      const directories = [];

      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          directories.push(cursor.value);
          cursor.continue();
        } else {
          resolve(directories);
        }
      };

      transaction.onerror = (event) => {
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
async function initDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS", 1);
    request.onerror = function (event) {
      // Handle errors
      console.log("@initDb: Database open ERROR");
      reject(event.target.error);
    };
    request.onsuccess = function (event) {
      resolve();
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("directories")) {
        db.createObjectStore("directories", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "username" });
      }
      //fetchDataDB();
      console.log("AstroOS DB created successfully ✨");
      resolve();
    };
  });
}
function nestDirectories(directories) {
  const directoryMap = new Map();

  // Initialize map
  directories.forEach((directory) => {
    directoryMap.set(directory.id, { ...directory, directories: [] });
  });

  // Nest directories
  directories.forEach((directory) => {
    const parentPath = directory.path;
    if (parentPath && directoryMap.has(parentPath)) {
      directoryMap
        .get(parentPath)
        .directories.push(directoryMap.get(directory.id));
    }
  });

  // Find root directories
  const nestedDirectories = [];
  directoryMap.forEach((directory) => {
    const parentPath = directory.path;
    if (!parentPath || !directoryMap.has(parentPath)) {
      nestedDirectories.push(directory);
    }
  });

  return nestedDirectories;
}

function convertToDirectoryModel(directory) {
  return new Directory({
    id: directory.id, // Absolute path
    path: directory.path, // Parent path
    name: directory.name,
    directories: directory.directories || [],
    files: directory.files || [],
    size: directory.size,
    dateCreated: directory.dateCreated,
    dateModified: directory.dateModified,
  });
}
// function getParentPath(path) {
//     const pathParts = path.split('/');
//     pathParts.pop(); // Remove the current directory
//     return pathParts.length > 0 ? pathParts.join('/') : null;
// }

function getRootDirectory(nestedDirectories) {
  // Assuming there's only one root directory for simplicity
  return nestedDirectories.length > 0 ? nestedDirectories[0] : null;
}

function displayDirectories(directories, container) {
  directories.forEach((directory) => {
    const directoryElement = document.createElement("div");
    directoryElement.textContent = `Name: ${directory.name}, Path: ${directory.path}`;

    if (directory.directories.length > 0) {
      const nestedContainer = document.createElement("div");
      nestedContainer.style.marginLeft = "20px";
      displayDirectories(directory.directories, nestedContainer);
      directoryElement.appendChild(nestedContainer);
    }

    container.appendChild(directoryElement);
  });
}
// ----------------------------------------------
// async function createIfGuestUser() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open("astroOS", 1);

//     request.onerror = function (event) {
//       reject("Database error: " + event.target.errorCode);
//     };

//     request.onsuccess = function (event) {
//       const db = event.target.result;
//       // Create transaction and object store
//       const transaction = db.transaction(["users"], "readwrite");
//       const store = transaction.objectStore("users");

//       const getRequest = store.get("user");

//       getRequest.onsuccess = function (event) {
//         const guest = event.target.result;
//         if (guest) {
//           // Meaning there's a guest

//           resolve(guest.username);
//         } else {
//           saveUserAccount("user", "password");
//           resolve("none");
//         }
//       };

//       getRequest.onerror = function (event) {
//         reject(
//           "@createGuestUser() :: user_api.js Error: " + event.target.errorCode
//         );
//       };
//     };
//   });
// }

function saveUserAccount(username, password) {
  // Open or create IndexedDB database
  const request = indexedDB.open("astroOS", 1);

  request.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    // Create transaction and object store
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    // Add user account data
    const account = { username: username, password: password };
    const addRequest = store.add(account);

    addRequest.onsuccess = function (event) {
      console.log("User account added successfully");
    };

    addRequest.onerror = function (event) {
      console.error("Error adding user account: " + event.target.errorCode);
    };
  };
}
//--------------------------
function createDirectoryDb(directory, pid) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS");

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["directories"], "readwrite");
      const objectStore = transaction.objectStore("directories");
      const requestAdd = objectStore.add({
        id: directory.id,
        path: directory.path,
        name: directory.name,
        directories: directory.directories,
        files: directory.files,
        size: directory.size,
        dateCreated: directory.dateCreated,
        dateModified: directory.dateModified,
      });

      // @might-break
      if (pid != "") {
        // console.log("@pid", pid);
        const requestGet = objectStore.get(pid);
        requestGet.onsuccess = function (event) {
          const existingFile = event.target.result;
          //console.log("@updateDirectoryDb() - existingFile: ", existingFile);
          if (existingFile) {
            ///////
            let records = existingFile.directories;
            records.push(directory);

            existingFile.directories = records;
            /////////
            existingFile.dateModified = new Date().toISOString();

            const putRequest = objectStore.put(existingFile);

            console.log("@updateDirectoryDb() - putFile: ", existingFile);
            putRequest.onsuccess = function (event) {
              console.log("Parent Data updated in IndexedDB");
            };
            putRequest.onerror = function (event) {
              reject("Put request error:", event.target.error);
            };
          } else {
            reject("Document not found:", directory.path);
          }
          resolve("Success");
        };
      }

      requestAdd.onsuccess = function (event) {
        console.log("Directory data added to IndexedDB");
      };
      transaction.oncomplete = function (event) {
        console.log("Transaction completed: Directory data saved to IndexedDB");
      };
      transaction.onerror = function (event) {
        console.error("Transaction error:", event.target.error);
      };
    };

    request.onerror = function (event) {
      reject("Database error:", event.target.error);
    };
  });
}
