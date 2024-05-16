import { rootDirectory } from "./models/directory_model";

// Get ROOT Directory --> pushTOIndexedDB
export async function initData() {
    const request = indexedDB.open("astroOS");

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["directories"], "readwrite");
      const objectStore = transaction.objectStore("directories");
      const requestAdd = objectStore.add({
        id: rootDirectory.id,
        path: rootDirectory.path,
        name: rootDirectory.name,
        directories: rootDirectory.directories,
        files: rootDirectory.files,
        size: rootDirectory.size,
        dateCreated: rootDirectory.dateCreated,
        dateModified: rootDirectory.dateModified,
      });
      // Event listener for the add request
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

    // Event listener for any errors that occur when opening the database
    request.onerror = function (event) {
      console.error("Database error:", event.target.error);
      // TODO: @return fail object
    };
    

    console.log("@initData sucess✨ ");
}