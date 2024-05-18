import { createIfGuestUser } from "./user/user_api";
import { createIfRootDir } from "../packages/shell/src/repo/directories_api";

async function initDb() {
  return new Promise((resolve, reject) => { 
    const request = indexedDB.open("astroOS", 1);
    request.onerror = function (event) {
      // Handle errors
      reject("@initDb: Database open ERROR");
    };

    request.onsuccess = function (event) {
      // Database connection opened successfully
      const db = event.target.result;
      //    initializeDataDb(_ROOT_);
      resolve("Astro OS Database initialized successfully");
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
      resolve("AstroOS DB created successfully ✨");
    };
  }); 
}

export async function initOS() {
  console.log("initializing AstroOS...");

  // create database
  // await initDb()
  //   .then((res) => {
  //     console.log(res);


  //   })
  //   .catch((err) => {
  //     console.log("SSSSSSS");
  //     console.error(err);
  //   });
    setTimeout({}, 10000)
     createIfGuestUser()
      .then((result) => {
        let res = result;
        res == "user"
          ? console.log("Guest account exists")
          : res == "none"
          ? console.log("no Guest, Created a new Guest account")
          : console.log("@initOS -- Unexpected result: ", res);
          createIfRootDir();
      })
      .catch((error) => {
        console.error("@initOS :: init_os.js :: #promiseError.", error);
      });
  // add User
  // check for guest, if not create a guest
  // @TODO
  //return username

  console.log("✨ AstroOS has been initialized!");
}
