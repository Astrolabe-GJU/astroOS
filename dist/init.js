const request = indexedDB.open("astroOS", 1);
    request.onerror = function (event) {
      // Handle errors
      console.log("@initDb: Database open ERROR");
    };

    request.onsuccess = function (event) {
      // Database connection opened successfully
      const db = event.target.result;
      //    initializeDataDb(_ROOT_);
      console.log("Astro OS Database initialized successfully");
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
      console.log("AstroOS DB created successfully ✨");
    };
    setTimeout({}, 10000)