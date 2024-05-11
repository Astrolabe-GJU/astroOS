/*
SHELL API:
1. acts as a layer between the ui-related controller & other APIs.
2. Instruction Logic that doesn't relate to UI
*/
import { createDirectoryDb } from "./directories_api";
import { Response } from "./../utils/response";
import { Directory } from "./../models/directory_model";
import { getCurrentTime } from "./../utils/date_service";
export function makeDirectory(args, currentDirectory) {

  // mkdir test
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    const res= new Response(400, "Please specify Directory Name");
    return res;
  }
  if (!(args[1] == "" || args[1] == undefined)) {
    const res= new Response(
      400,
      "Please fix the Naming, Only 1 argument is allowed\nDid you mean: `mkdir " +
        args[0] +
        "/" +
        args[1] +
        "`"
      );
      return res;
  }

  // TestCASE: 2 Dir with same name & address
  let notUnique = () => {
    for (const directory of currentDirectory.directories) {
      // If the name matches the target, return the directory object
      if (directory.name === args[0]) {
        return true;
      }
    }
    return false;
  };
  if (notUnique()) {
    const res= new Response(400, "A Directory with matching Name already Exists");
    return res;
  }

  try {
    // create directory
    let newDirectory = new Directory({
      id: currentDirectory.id + '/' + args[0],
      name: args[0],
      path: currentDirectory.id,
      directories: [],
      files: [],
      dateCreated: getCurrentTime(),
      dateModified: getCurrentTime(),
    });

    
    // update parent
    
    // Save to IndexedDB
    createDirectoryDb(newDirectory, currentDirectory.id);
    
    // add to parent children
    currentDirectory.addDirectory(newDirectory, currentDirectory);
    
    // Edit data.json, this will serve as a changes pointer

    const res= new Response(200, "");
    return res;
  } catch (error) {
    console.log("Error Creating Directory: ", error);
  }
  const res= new Response(400, "Error Creating Directory");
  return res;
}
