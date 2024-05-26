export class Response {
  constructor(status, payload) {
    this._status = status;
    this._payload = payload;
  }

  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }
  get payload() {
    return this._payload;
  }
  set payload(payload) {
    this._payload = payload;
  }
}
