function initDb() {
  const request = indexedDB.open("astroOS", 1);
  request.onerror = function (event) {
    // Handle errors
    console.log("Database open ERROR");
  };

  request.onsuccess = function (event) {
    // Database connection opened successfully
    const db = event.target.result;
    //    initializeDataDb(_ROOT_);
    console.log("Database opened successfully");
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const directoriesObjectStore = db.createObjectStore("directories", {
      keyPath: "id",
    });
    const fileObjectStore = db.createObjectStore("files", {
      keyPath: "id",
    });
    const usersObjectStore = db.createObjectStore("users", {
      keyPath: "username",
    });

    //fetchDataDB();
    console.log("Database created successfully");
  };
}
export async function initOS() {
  // create database
  initDb();
  
  // add User


  // @TODO
  //return username
  
  console.log("AstroOS has been launched! ✨");
}
