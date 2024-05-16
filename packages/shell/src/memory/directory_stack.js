import EventEmitter from "events";
// IsEmpty operation: Checks if the stack is empty
export class DirectoryStack extends EventEmitter {
  constructor(_ROOT_) {
    super();
    
    this._ROOT = _ROOT_; // Root directory symbol
    this.directories = [_ROOT_]; // Array to hold directories
    this.address = this._ROOT.name; // Current address
   
  }

  // Method to push a directory onto the stack
  push(directory) {
    this.directories.push(directory);
    this.updateAddress();
    this.emit('valueChanged', directory);
  }

  // Method to pop a directory from the stack
  pop() {
    const poppedDirectory = this.directories.pop();
    this.updateAddress();
    this.emit('valueChanged', poppedDirectory);
    return poppedDirectory;
  }

  // Method to peek at the current directory
  peek() {
    return this.isEmpty()
      ? this._ROOT
      : this.directories[this.directories.length - 1];

  }

  // Method to get the number of directories in the stack
  size() {
    return this.directories.length;
  }

  // Method to check if the Stack is empty
  isEmpty() {
    return this.directories.length == 1 ? true : false;
  }

  // Method to clear the stack (remove all directories)
  clear() {
    this.directories = [];
    this.address = this._ROOT.name;
  }

  // Method to update the address based on the current stack
  updateAddress() {
    const directoryNames = this.directories.map((directory) => directory.name);
    this.address = directoryNames.join("/");
    return this.address
  }

  // Method to print the address and all elements in the stack
  print() {
    console.log("Address:", this.address);
    console.log("Stack:");
    this.directories.forEach((directory) => console.log(directory));
  }
  
}
