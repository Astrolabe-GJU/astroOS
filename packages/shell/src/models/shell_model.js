
import { DirectoryStack } from "../memory/directory_stack";


import { Directory, rootDirectory } from "./directory_model";

export class Shell {
  // Shell stack initilaized @ROOT ---> // currentDirectory

  // access to Shell API
  //  Auth
  constructor() {
    
   
    this.dirStack = new DirectoryStack(rootDirectory);
    this.commandHistory = [];
    this.currentHistoryIndex = -1;
    this.account = rootDirectory.name;
  }
  
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