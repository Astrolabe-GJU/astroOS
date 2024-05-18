import { createIfGuestUser } from "./user/user_api";
import { createIfRootDir } from "../packages/shell/src/repo/directories_api";

async function initDb() {
  
   
      //fetchDataDB();
      resolve("AstroOS DB created successfully ✨");
 
}

export async function initOS() {
  console.log("initializing AstroOS...");

 
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
