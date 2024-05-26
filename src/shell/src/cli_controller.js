import {
  makeDirectory,
  removeDirectory,
  changeDirectory,
  newFile,
  removeFile,
  getFile,
  updateFileContent,
} from "./repo/shell_api";
import theme from "./theme.json";
export async function parseAndExecuteCommand(command, upperDoc, shell) {
  let tokens = command.toLowerCase().split(" ");
  let exe = tokens[0];
  let args = tokens.slice(1);
  let currentDirectory = shell.dirStack.peek();
  let output = "",
    res = "";

  switch (exe) {
    case "help":
      output = spanText(theme.white, _help(), "600");
      break;
    case "cd":
      res = await changeDirectory(args, currentDirectory, shell.dirStack);
      break;
    case "md":
    case "mkdir":
      res = await makeDirectory(args, currentDirectory);

      // console.log("@CLiController --mkdir", res);
      res.status == 200
        ? null
        : (output = spanText(theme.red, res.payload, "600"));
      break;
    case "rmdir":
      output = await removeDirectory(args, currentDirectory);
      break;
    case "touch":
    case "New-Item":
      res = await newFile(args, currentDirectory);
      res.status == 200
        ? null
        : (output = spanText(theme.red, res.payload, "600"));
      break;
    case "rm":
      res = await removeFile(args, currentDirectory);
      res.status == 200
        ? null
        : (output = spanText(theme.red, res.payload, "600"));
      break;
    case "cat":
      res = await getFile(args, currentDirectory);
      res.status == 200
        ? null
        : (output = spanText(theme.red, res.payload, "600"));
      break;

    case "edit":
      res = await updateFileContent(args, currentDirectory);
      res.status == 200
        ? null
        : (output = spanText(theme.red, res.payload, "600"));
      break;
    case "ls":
    case "dir":
      upperDoc.appendChild(currentDirectory.listItems(shell.dirStack.address));

      break;
    case "clear":
      upperDoc.innerHTML = "";
      break;
    default: {
      // TODO: implement proper Exceptions
      output =
        spanText(theme.red, "Unknown Command: ", "bold") +
        spanText(theme.white, exe, "300");
      break;
    }
  }
  output != "" ? displayOutput(output, upperDoc) : null;
}
function displayOutput(output, upperDoc) {
  let d = document.createElement("div");
  d.innerHTML = output;
  upperDoc.appendChild(d);
}
function spanText(color, text, boldness) {
  let weight = boldness == null ? "" : "font-weight:" + boldness + " ;";

  return (
    '<span style="color: ' + color + ";" + weight + ' ">' + text + "</span>"
  );
}


function _help(){
  
  return "Available commands:<br><br>" +
  "cd [directory] - Change directory<br>" +
  "md or mkdir [directory] - Make directory<br>" +
  "rmdir [directory] - Remove directory<br>" +
  "touch or New-Item [file] - Create a new file<br>" +
  "rm [file] - Remove file<br>" +
  "cat [file] - Display file content<br>" +
  "edit [file] - Update file content<br>" +
  "ls or dir - List directory contents<br>" +
  "clear - Clear the console screen";;
}