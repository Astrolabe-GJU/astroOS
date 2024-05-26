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
import {
  createFileDb,
  getFileDb,
  removeFileDb,
  updateFileContentDB,
} from "./file-api";
import { Response } from "./../utils/response";
import { Directory } from "./../models/directory_model";
import { getCurrentTime } from "./../utils/date_service";
import { FileHandle } from "../models/file_handle";

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
    console.log("@makeDirectory :: shell_api :: 😃", newDirectory);
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
  await updateDirectoryDb(directory, "");
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

// :::::::::::File API::::::::::::::::::::::::::::::::::::::::::::::::
export async function newFile(args, currentDirectory) {
  let res;
  // mkdir test
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    res = new Response(400, "Please specify File Name");
    return res;
  }
  if (!(args[1] == "" || args[1] == undefined)) {
    res = new Response(
      400,
      "Please fix the Naming, Only 1 argument is allowed\nDid you mean: `touch " +
        args[0] +
        args[1] +
        "`"
    );
    return res;
  }

  // TestCASE: 2 Dir with same name & address
  let notUnique = () => {
    for (const file of currentDirectory.files) {
      // If the name matches the target, return the file object
      if (file.name === args[0]) {
        return true;
      }
    }
    return false;
  };
  if (notUnique()) {
    res = new Response(400, "A File with matching Name already Exists");
    return res;
  }

  const extension = args[0].split(".")[1];
  try {
    // create file
    let newFileHandle = new FileHandle({
      id: currentDirectory.id + "/" + args[0],
      name: args[0],
      path: currentDirectory.id,
      type: determineType(extension),
      extension: extension,
      size: 0,
      dateCreated: getCurrentTime(),
      dateModified: getCurrentTime(),
    });
    const blob = new Blob();

    await createFileDb(newFileHandle.id, blob)
      .then((result) => {
        // add to parent children
        currentDirectory.addFile(newFileHandle);

        // then Update Parent Dir db
        updateDirectoryDb(currentDirectory, "");

        res = new Response(200, "Success");
      })
      .catch((error) => {
        console.error(
          "@newFile() :: shell_api.js: Error Creating File in DB",
          error
        );

        res = new Response(400, "OS Error: Error Creating File in DB");
      });
  } catch (error) {
    console.log("Error Creating File: ", error);
  }

  return res;
}
export async function removeFile(args, currentDirectory) {
  let res;
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    return new Response(300, "Please specify File Name");
  }
  if (!(args[1] == "" || args[1] == undefined)) {
    return new Response(
      300,
      "Please fix the Naming, Only 1 argument is allowed\nDid you mean: `rm " +
        args[0] +
        args[1] +
        "`"
    );
  }
  let targetFile = findFile(args[0], currentDirectory);
  if (targetFile != null) {
    // remove target
    await removeFileDb(targetFile._id)
      .then((res) => {
        // then U current on memory
        currentDirectory.removeFile(targetFile);
        // finally update Parent
        updateDirectoryDb(currentDirectory, "")
          .then((res) => {
            res = new Response(200, "Success");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return res;
}
export async function getFile(args, currentDirectory) {
  let res;
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    return new Response(300, "Please specify File Name");
  }
  if (!(args[1] == "" || args[1] == undefined)) {
    return new Response(
      300,
      "Please fix the Naming, Only 1 argument is allowed\nDid you mean: `cat " +
        args[0] +
        args[1] +
        "`"
    );
  }
  let targetFile = findFile(args[0], currentDirectory);
  if (targetFile != null) {
    // get target
    await getFileDb(targetFile)
      .then((blob) => {
        // then R current on memory

        const reader = new FileReader();
        reader.onload = function (event) {
          console.log(
            "@shellAPI :: getFile :: File data:",
            event.target.result
          );
        };
        reader.readAsText(blob);
        res = new Response(200, "Success");
        // // finally update Parent
        // updateDirectoryDb(currentDirectory, "")
        //   .then((res) => {})
        //   .catch((err) => {
        //     console.error(err);
        //   });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return res;
}

export async function updateFileContent(args, currentDirectory) {
  let res;
  if (args.isEmpty || args[0] == undefined || args[0] == "") {
    return new Response(300, "Please specify Directory Name");
  }
  if (!(args[3] == "" || args[3] == undefined)) {
    return new Response(
      300,
      "Please fix the Naming, Only 2 argument is allowed\nDid you mean: `edit " +
        args[0] +
        " " +
        args[1] +
        args[2] +
        "`"
    );
  }

  let content = args.slice(1);
  let blob = new Blob([content], { type: "text/plain" });

  let fileHandle = findFile(args[0], currentDirectory);
  if (fileHandle != null) {
    await updateFileContentDB(fileHandle, blob)
      .then((res) => {
        res = new Response(200, "Success");
      })
      .catch((err) => {
        res = new Response(400, err);
      });
  } else {
    res = new Response(300, "Directory not found");
  }
  return res;
}

// ::::::::::Helper Functions:::::::::::::::::::::::::::::::::::::::

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

// Helper function to find the fileHandle object based on its name
function findFile(target, currentDirectory) {
  // Loop through the directories in the current file
  for (const file of currentDirectory.files) {
    // If the name matches the target, return the FileHandle object
    if (file.name === target) {
      return file;
    }
  }
  // If no file is found, return null
  return null;
}
function determineType(extension) {
  // TODO: Complete THis Functions
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
      return "Image";
    case "mp4":
    case "mkv":
      return "video";
    case "c":
    case "python":
    case "js":
    case "dart":
      return;
      "Source Code";
    case "txt":
      return "Text File";
    default:
      break;
  }
}
