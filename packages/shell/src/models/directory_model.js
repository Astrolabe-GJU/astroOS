import { getCurrentTime } from '../utils/date_service';
// @TODO: complete dis
let user = '';
export class Directory {
  constructor({
    id ,
    name,
    path,
    directories = [],
    files = [],
    dateCreated,
    dateModified,
    type = "File Folder",
  }) {
    //TODO: Test whether Id is better if private
    this._id = id; // ID of the Directory / Abs. Path with dir name
    this.name = name; // Name of the directory
    this._path = path; // Parent Path of the directory
    this.directories = directories; // Array to store directories IDs
    this.files = files; // Array to store files refs
    this.dateCreated = dateCreated; // Date when the directory was created
    this.dateModified = dateModified; // Date when the directory was last modified
    this.size = 0;
    this.type = type
  }
  addDirectory(directory) {
    this.directories.push(directory);
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  
  set path(newPath) {
    this._path = newPath;
    // Optionally update the ID if needed
    this._id = this._path + "/" + this._name;
  }
  removeDirectory(directory) {
    // TODO: Implement all Cases.
    this.directories.pop(directory);
  }
  addFile(files) {
    this.files.push(files);
  }
  removeFile(files) {
    // TODO: Implement all Cases.
    this.files.pop(files);
  }
  getNumOfItems() {
    return this.directories.length + this.files.length;
  }
  listItems(address) {
    const directoryContents = [
      {
        mode: "______",
        lastWriteTime: "_____________",
        length: "______",
        name: "_________",
      },
    ];
    let div = document.createElement("div");
    const table = document.createElement("table");
    div.innerHTML = '<br><br><span style="font-weigth: 600 ; color: #c3e88d;" >' + address + '</span><br><br>';
    table.innerHTML =
      '<table id="directoryTable"><thead><tr><th>Mode</th><th>LastWriteTime</th><th>Length</th><th>Name</th></tr></thead></table>';
    const directoryBody = document.createElement("tbody");
    // Loop through each item in the directory contents
    const rw_body = directoryBody.insertRow();
    rw_body.insertCell().textContent = directoryContents[0].mode;
    rw_body.insertCell().textContent = directoryContents[0].lastWriteTime;
    rw_body.insertCell().textContent = directoryContents[0].length;
    rw_body.insertCell().textContent = directoryContents[0].name;
    table.appendChild(rw_body);
    this.directories.forEach((dir) => {
      const row = directoryBody.insertRow();
      row.insertCell().textContent = "d_____";
      row.insertCell().textContent = dir.dateModified;
      row.insertCell().textContent = dir.size;
      row.insertCell().textContent = dir.name;
      table.appendChild(row);
    });
    this.files.forEach((file) => {
      const row = directoryBody.insertRow();
      row.insertCell().textContent = file.type;
      row.insertCell().textContent = file.dateModified;
      row.insertCell().textContent = file.size;
      row.insertCell().textContent = file.name;
      table.appendChild(row);
    });
    div.appendChild(table);
    return div;
    // Call the function to display directory contents

    throw Error("UnImplemented Error | Directory.listItems()");
  }
}
// const _R = new Directory({
//   name: "~",
//   path: "~",
//   directories: [],
//   files: [],
//   dateCreated: Date(),
//   dateModified: Date(),
// });
// export default _R;
export const _ROOT_ = new Directory({
  id : user??'user7',  
  path: "",
  name: user??'user7',
  directories: [],
  files: [],
  dateCreated: getCurrentTime(),
  dateModified: getCurrentTime(),
});