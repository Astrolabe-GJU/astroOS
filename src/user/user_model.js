class User {
  constructor({ username, password }) {
    this._username = username;
    this._password = password;
  }
  get username(){
    return this._username;
  }
  
}
