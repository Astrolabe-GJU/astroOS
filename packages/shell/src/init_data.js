export function initDb() {
  const request = indexedDB.open("astroOS-Db", 1);
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
  
  //fetchDataDB();
  console.log("Database created successfully");
};
}