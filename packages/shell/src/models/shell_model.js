import { DirectoryStack } from "../memory/directory_stack";
import { makeDirectory } from "../repo/shell_api";

export class Shell {
  // Shell stack initilaized @ROOT ---> // currentDirectory

  // access to Shell API
  //  Auth
  constructor() {
    this.dirStack = new DirectoryStack();
    this.commandHistory = [];
    this.currentHistoryIndex = -1;
  }
  addAccount() {}
  pushHistory(command) {
    const addedCommand = this.commandHistory.push(command);
    console.log("@push history: ", command);
    this.currentHistoryIndex = this.commandHistory.length = 1;
    return addedCommand;
  }
  getPreviousCommand() {
    if (this.currentHistoryIndex > 0) {
      this.currentHistoryIndex--;
      return this.commandHistory[this.currentHistoryIndex];
    } else {
      return null; // No previous command
    }
  }

  
  getNextCommand() {
    if (this.currentHistoryIndex < this.commandHistory.length - 1) {
      this.currentHistoryIndex++;
      return this.commandHistory[this.currentHistoryIndex];
    } else {
      return null; // No next command
    }
  }

  isEmpty() {
    return this.commandHistory.length == 0 ? true : false;
  }
  executeCommand() {}
}
