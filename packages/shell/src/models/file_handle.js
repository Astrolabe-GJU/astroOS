import { getCurrentTime, getRedeableDate } from "../utils/date_service";
export class FileHandle {
  constructor({
    id,
    size,
    name,
    path,
    type,
    extension ,
    dateCreated,
    dateModified,
  }) {

    this._id = id; // ID of the FileHandle / Abs. Path with FileHandle name
    this.name = name; // FileName file.txt
    this._path = path; // Parent Path of the directoryp
    this.type = type; //- type (vid, txt, audio, app, folder)
    this.extension = extension; // .png .jpg
    this.dateCreated = dateCreated; // Date when the directory was created
    this.dateModified = dateModified; // Date when the directory was last modified
    this.size = size;
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
    this.dateModified = getCurrentTime();
  }

}