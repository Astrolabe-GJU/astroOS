import { Response } from "./../utils/response";

export function createFileDb(fileHanldeId, blob) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS");

    // Define what happens on a successful database open
    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["files"], "readwrite");
      const objectStore = transaction.objectStore("files");
      const requestAdd = objectStore.add({
        id: fileHanldeId,
        blob: blob,
      });

      // Event listener for the add request
      requestAdd.onsuccess = function (event) {
        console.log("File data added to IndexedDB");
        resolve("Success");
      };
      requestAdd.onerror = function (event) {
        reject("@createFileDB requestAdd error:", event.target.error);
      };
      transaction.oncomplete = function (event) {
        console.log("Transaction completed: file data saved to IndexedDB");
      };
      transaction.onerror = function (event) {
        console.error("Transaction error:", event.target.error);
      };
    };

    request.onerror = function (event) {
      console.error("Database error:", event.target.error);
    };
  });
}

export async function removeFileDb(fileHandle) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["files"], "readwrite");
      const objectStore = transaction.objectStore("files");
      const requestDelete = objectStore.delete(fileHandle);

      // @TODO: Handle Hazards such as updating dir name or path --- Parent doesn't change
      requestDelete.onsuccess = function (event) {
        console.log("File removed succesfully from IndexedDB");
        resolve("Success");
      };
      transaction.oncomplete = function (event) {
        console.log("Transaction completed: File data removed in IndexedDB");
      };
      transaction.onerror = function (event) {
        console.error("Transaction error:", event.target.error);
        reject("Transaction error:", event.target.error);
      };
    };
    request.onerror = function (event) {
      reject("Database error", event.target.error);
    };
  });
}
// :::::+++++++++++:::::::::::::::::::::::::::::::::::::::::
export function updateFileContentDB(fileHandle, blob) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS");
    // Define what happens on a successful database open
    request.onsuccess = function (event) {
      const db = event.target.result;
      // Start a new transaction
      const transaction = db.transaction(["files"], "readwrite");
      const objectStore = transaction.objectStore("files");

      // Retrieve the document by its Id
      const putRequest = objectStore.put({
        id: fileHandle._id,
        blob: blob,
      });

      putRequest.onsuccess = function (event) {
        // const existingFile = event.target.result;
        // if (existingFile) {
        //   existingFile.content = blob; // Update content
        //   // Put the updated document back into the object store
        //   const putRequest = objectStore.put(existingFile);
        //   putRequest.onsuccess = function (event) {
        //     console.log("File data updated in IndexedDB");
        //   };
        //   putRequest.onerror = function (event) {
        //     console.error("Put request error:", event.target.error);
        //   };
        // } else {
        //   console.error("Document not found:", fileHandle.path);
        // }
        console.log("File content updated  IndexedDB");
        resolve("Success");
      };

      putRequest.onerror = function (event) {
        console.error("Get request error:", event.target.error);
      };
      transaction.oncomplete = function (event) {
        console.log("Transaction completed: file data updated in IndexedDB");
        db.close(); // Close the database connection
      };
      transaction.onerror = function (event) {
        console.error("Transaction error:", event.target.error);
        db.close(); // Close the database connection
      };
    };
    request.onerror = function (event) {
      reject("Database error:", event.target.error);
    };
  });
}

export function getFileDb(fileHandle) {
  return new Promise((resolve, reject) => {
    // Open (or create) the database
    const request = indexedDB.open("astroOS");

    // Define what happens on a successful database open
    request.onsuccess = function (event) {
      const db = event.target.result;

      // Start a new transaction
      const transaction = db.transaction(["files"], "readonly");

      // Access the object store
      const objectStore = transaction.objectStore("files");

      // Retrieve the document by its path
      const getRequest = objectStore.get(fileHandle._id);

      // Event listener for the get request
      getRequest.onsuccess = function (event) {
        // Retrieve the document
        const file = event.target.result;

        // Check if the file exists
        if (file) {
          // Resolve the Promise with the file content
          resolve(file.blob);
        } else {
          // Reject the Promise with an error message
          reject("File not found");
        }
      };

      // Event listener for any errors that occur during the get operation
      getRequest.onerror = function (event) {
        // Reject the Promise with the error message
        reject("Error fetching file");
      };

      // Event listener for the transaction completion
      transaction.oncomplete = function (event) {
        db.close(); // Close the database connection
      };

      // Event listener for any errors that occur during the transaction
      transaction.onerror = function (event) {
        db.close(); // Close the database connection
        reject("Transaction error");
      };
    };

    // Event listener for any errors that occur when opening the database
    request.onerror = function (event) {
      reject("Database error");
    };
  });
}
