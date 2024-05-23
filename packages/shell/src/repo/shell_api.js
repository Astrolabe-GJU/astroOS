/*
SHELL API:
1. acts as a layer between the ui-related controller & other OS  APIs.
2. Instruction Logic that doesn't relate to UI
*/
import {
  createDirectoryDb,
  removeDirectoryDb,
  updateDirectoryDb,
} from "./directories_api";
import { Response } from "./../utils/response";
import { Directory } from "./../models/directory_model";
import { getCurrentTime } from "./../utils/date_service";

export function changeDirectory(args, currentDirectory, dirStack) {
  dirStack.print();
  if (args.isEmpty) {
    return currentDirectory;
  }

  let target = args[0];
  if (target == "..") {
    dirStack.pop();
    return new Response(200, "Success");
  }
  //--------------
  // Find the directory object based on the target argument
  const targetDirectory = findDirectory(target, currentDirectory);
  console.log("@shell_API :: targetDirectory", targetDirectory);
  // If targetDirectory is found, push it to the dirStack
  if (targetDirectory) {
    dirStack.push(targetDirectory);
    return new Response(200, "Success");
  } else {
    return new Response(400, "No Directory with matching Name, " + target);
  }
}
export async function makeDirectory(args, currentDirectory) {
  let res;
  // mkdir test
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    res = new Response(400, "Please specify Directory Name");
    return res;
  }
  if (!(args[1] == "" || args[1] == undefined)) {
    res = new Response(
      400,
      "Please fix the Naming, Only 1 argument is allowed\nDid you mean: `mkdir " +
        args[0] +
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
    res = new Response(400, "A Directory with matching Name already Exists");
    return res;
  }

  try {
    // create directory
    let newDirectory = new Directory({
      id: currentDirectory.id + "/" + args[0],
      name: args[0],
      path: currentDirectory.id,
      directories: [],
      files: [],
      dateCreated: getCurrentTime(),
      dateModified: getCurrentTime(),
    });
    console.log("@makeDirectory :: shell_api :: 😃",newDirectory);
    await createDirectoryDb(newDirectory, currentDirectory.id)
      .then((result) => {
        // add to parent children
        currentDirectory.addDirectory(newDirectory, currentDirectory);
        res = new Response(200, "Success");
      })
      .catch((error) => {
        console.error(
          "@makeDirectory() :: shell_api.js: Error Creating Directory in DB",
          error
        );

        res = new Response(400, "OS Error: Error Creating Directory in DB");
      });
  } catch (error) {
    console.log("Error Creating Directory: ", error);
  }

  return res;
}
export async function updateDirectory(directory, pid) {
  await updateDirectoryDb(directory, '')
}
export async function removeDirectory(args, currentDirectory) {
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    return new Response(300, "Please specify Directory Name");
  }
  if (!(args[1] == "" || args[1] == undefined)) {
    return new Response(
      300,
      "Please fix the Naming, Only 1 argument is allowed\nDid you mean: `rmdir " +
        args[0] +
        args[1] +
        "`"
    );
  }
  let targetDirectory = findDirectory(args[0], currentDirectory);
  if (targetDirectory != null) {
    // TODO: fix this Hazard: when deleting dir, all of its children should be deleted

    
    // remove target
    await removeDirectoryDb(targetDirectory)
      .then((res) => {
        // then U current on memory
        currentDirectory.removeDirectory(targetDirectory);
        // finally update Parent
        updateDirectoryDb(currentDirectory, "")
          .then((res) => {})
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return null;
}

// Helper function to find the directory object based on its name
function findDirectory(target, currentDirectory) {
  console.log("@findDirectory ::");
  console.log("target ::", target);
  console.log("currentDirectory ::", currentDirectory);
  // Loop through the directories in the current directory
  for (const directory of currentDirectory.directories) {
    // If the name matches the target, return the directory object
    if (directory.name === target) {
      console.log("@@directory: ", directory);
      return directory;
    }
  }
  // If no directory is found, return null
  return null;
}
