import { Response } from "./../utils/response";
export  function createDirectoryDb(directory, pid) {
    const response = new Response(200, "")
    const request = indexedDB.open("astroOS-Db");

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
      if (pid != ""){
        
        const requestGet = objectStore.get(pid)
        requestGet.onsuccess = function (event) {
          const existingFile = event.target.result;
          console.log("@updateDirectoryDb() - existingFile: ", existingFile);
          if (existingFile) {
            existingFile.directories = directory.directories; 
            existingFile.dateModified = getCurrentTime;
            

            const putRequest = objectStore.put(existingFile);
  
            putRequest.onsuccess = function (event) {
              console.log("Parent Data updated in IndexedDB");
            };
            putRequest.onerror = function (event) {
              console.error("Put request error:", event.target.error);
            };
          } else {
            console.error("Document not found:", directory.path);
          }
        }
      }

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
      response.status(400)
      response.payload("Database Error")
    };
    
    //TODO: @return success value
    return response
}