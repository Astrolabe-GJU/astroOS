import { parseAndExecuteCommand } from "./cli_controller";
import { Shell } from "./models/shell_model";

// init Data()
//initDb()
///
import { rootDirectory, _ROOT_ } from "./models/directory_model";

const _rootDir = await _ROOT_(rootDirectory);

const shell = new Shell();



let dirLabel = document.getElementById("dir-label");
let upperDoc = document.querySelector(".terminal-upper");

upperDoc.appendChild(createAsciiArtDiv());

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
function createAsciiArtDiv() {
  const asciiArt = `
                      $$\\                          $$$$$$\\   $$$$$$\\  
                      $$ |                        $$  __$$\\ $$  __$$\\ 
 $$$$$$\\   $$$$$$$\\ $$$$$$\\    $$$$$$\\   $$$$$$\\  $$ /  $$ |$$ /  \\__|
 \\____$$\\ $$  _____|\\_$$  _|  $$  __$$\\ $$  __$$\\ $$ |  $$ |\\$$$$$$\\  
 $$$$$$$ |\\$$$$$$\\    $$ |    $$ |  \\__|$$ /  $$ |$$ |  $$ | \\____$$\\ 
$$  __$$ | \\____$$\\   $$ |$$\\ $$ |      $$ |  $$ |$$ |  $$ |$$\\   $$ |
\\$$$$$$$ |$$$$$$$  |  \\$$$$  |$$ |      \\$$$$$$  | $$$$$$  |\\$$$$$$  |
 \\_______|\\_______/    \\____/ \\__|       \\______/  \\______/  \\______/ 
                                                                      
                                                                      
                                                                      
`;

  const div = document.createElement("div");
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.color = "#c3e88d";
  div.textContent = asciiArt;

  return div;
}
