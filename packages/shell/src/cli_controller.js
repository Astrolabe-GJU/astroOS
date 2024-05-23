import {
  makeDirectory,
  removeDirectory,
  changeDirectory,
} from "./repo/shell_api";
import theme from "./theme.json";
export async function parseAndExecuteCommand(command, upperDoc, shell) {
  console.log(shell);
  let tokens = command.toLowerCase().split(" ");
  let exe = tokens[0];
  let args = tokens.slice(1);
  let currentDirectory = shell.dirStack.peek();
  console.log("Current Directory: ", currentDirectory);
  let output = "",
    res = "";

  switch (exe) {
    case "help":
      break;
    case "cd":
      res = await changeDirectory(args, currentDirectory, shell.dirStack);
      //res.status;
      console.log("@cd --changeDirectory");
      console.log(currentDirectory);
      break;
      case "md":
      case "mkdir":
      console.log("@md --changeDirectory");
      console.log(currentDirectory);
      res = await makeDirectory(args, currentDirectory);
      
      // console.log("@CLiController --mkdir", res);
      res.status == 200
        ? null
        : (output = spanText(theme.red, res.payload, "600"));
      break;
    case "rmdir":
      output = await removeDirectory(args, currentDirectory);
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
  console.log("@displayOutput: ", output);
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
