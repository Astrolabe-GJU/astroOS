import {makeDirectory  } from "./repo/shell_api";
export function parseAndExecuteCommand(command, upperDoc, shell) {
  

  let tokens = command.toLowerCase().split(" ");
  let exe = tokens[0];
  let args = tokens.slice(1);
  let currentDirectory = shell.dirStack.peek();
  let output = '';

  switch (exe) {
    case "help":
      break;
    case "cd":
      break;
    case "md":
      break;
    case "mkdir":
       output = makeDirectory(args, currentDirectory);
    //   if (res2 != null) {
    //     let d2 = document.createElement("div");
    //     d2.innerHTML = spanText(theme.red, res2);
    //     appendHistory(upperDoc, d2);
    //   }

      break;
    }
    output != "" ? displayOutput(output, upperDoc) : null;
}
export function displayOutput(output) {}
