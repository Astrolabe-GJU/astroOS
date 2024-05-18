import { rootDirectory } from "../models/directory_model";
import { Response } from "./../utils/response";

export function createDirectoryDb(directory, pid) {
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
export async function createIfRootDir() {
  createDirectoryDb(rootDirectory, "")
    .then((res) => {
      console.log("Created The Root Direcotry");
    })
    .catch((error) => {
      console.error(error);
    });
}
export function updateDirectoryDb(directory, pid) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS");

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["directories"], "readwrite");
      const objectStore = transaction.objectStore("directories");
      const requestPut = objectStore.put({
        id: directory.id,
        path: directory.path,
        name: directory.name,
        directories: directory.directories,
        files: directory.files,
        size: directory.size,
        dateCreated: directory.dateCreated,
        dateModified: directory.dateModified,
      });
  
      // @TODO: Handle Hazards such as updating dir name or path --- Parent doesn't change
      requestPut.onsuccess = function (event) {
        console.log("Directory data updated IndexedDB");
        resolve("Success")
      };
      transaction.oncomplete = function (event) {
        console.log("Transaction completed: Directory data updated in IndexedDB");
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
export function removeDirectoryDb(directory) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("astroOS", 1);
    
    request.onsuccess = function(event){
      const db = event.target.result;

      const transaction = db.transaction(["directories"], "readwrite");
      const objectStore = transaction.objectStore("directories");
      const requestDelete = objectStore.delete(directory.id);
  
      // @TODO: Handle Hazards such as updating dir name or path --- Parent doesn't change
      requestDelete.onsuccess = function (event) {
        console.log("Directory removed succesfully from IndexedDB");
        resolve("Success")
      };
      transaction.oncomplete = function (event) {
        console.log("Transaction completed: Directory data updated in IndexedDB");
      };
      transaction.onerror = function (event) {
        console.error("Transaction error:", event.target.error);
        reject("Transaction error:", event.target.error);
        
      };

    }
    request.onerror = function(event){
      reject("Database error", event.target.error)
    }

  })
  
}