import { parseAndExecuteCommand } from "./cli_controller";
import { Shell } from "./models/shell_model";

// init Data()
//initDb()
///
import { rootDirectory } from "./models/directory_model";

let shell = new Shell();

let dirLabel = document.getElementById("dir-label");
let upperDoc = document.querySelector(".terminal-upper");
shell.dirStack.on("valueChanged", (newValue) => {
  // Update the <div> with the new value
  dirLabel.textContent = shell.dirStack.address;
});

dirLabel.textContent = shell.dirStack.address;
let terminal = document
  .getElementById("terminal-id")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const textNode = document.createTextNode("\n");
      shell.pushHistory(this.value);
      parseAndExecuteCommand(this.value, upperDoc, shell);
      this.value = "";
    } else if (event.key == "ArrowUp") {
      event.preventDefault();
      this.value = shell.getPreviousCommand();
    } else if (event.key == "ArrowDown") {
      event.preventDefault();
      this.value = shell.getNextCommand();
    }
  });
