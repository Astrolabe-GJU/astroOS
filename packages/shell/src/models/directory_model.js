import { getCurrentTime, getRedeableDate } from "../utils/date_service";

import {  getUsername} from "../../../../src/user/user_api";


// @TODO: complete dis

export class Directory {
  constructor({
    id,
    name,
    path,
    directories = [],
    files = [],
    dateCreated,
    dateModified,
    type = "File Folder",
    size = 0,
  }) {
    //TODO: Test whether Id is better if private
    this._id = id; // ID of the Directory / Abs. Path with dir name
    this.name = name; // Name of the directory
    this._path = path; // Parent Path of the directory
    this.directories = directories; // Array to store directories IDs
    this.files = files; // Array to store files refs
    this.dateCreated = dateCreated; // Date when the directory was created
    this.dateModified = dateModified; // Date when the directory was last modified
    this.size = size;
    this.type = type;
  }
  addDirectory(directory) {
    this.directories.push(directory);
    this.dateModified = getCurrentTime()
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
    this.dateModified = getCurrentTime()
  }
  addFile(files) {
    this.files.push(files);
    this.dateModified = getCurrentTime()
  }
  removeFile(files) {
    // TODO: Implement all Cases.
    this.files.pop(files);
    this.dateModified = getCurrentTime()
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
    div.innerHTML =
      '<br><br><span style="font-weigth: 600 ; color: #c3e88d;" >' +
      address +
      "</span><br><br>";
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
      row.insertCell().textContent = getRedeableDate(dir.dateModified);
      row.insertCell().textContent = dir.size;
      row.insertCell().textContent = dir.name;
      table.appendChild(row);
    });
    this.files.forEach((file) => {
      const row = directoryBody.insertRow();
      row.insertCell().textContent = file.type;
      row.insertCell().textContent = getRedeableDate(file.dateModified);
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

// export const _ROOT_ = new Directory({
//   id: mockData.id,
//   path: "",
//   name: mockData.name,
//   directories: [],
//   files: [],
//   dateCreated: getCurrentTime(),
//   dateModified: getCurrentTime(),
// });

const user = await getUsername()
export const rootDirectory = new Directory({
  id: user,
  name: user,
  path: "",
  directories: [],
  files: [],
  dateCreated: getCurrentTime(),
  dateModified: getCurrentTime(),
  size: 0,
});