export default class Session {
  static get(key) {
    return localStorage.getItem(key);
  }

  static getObject(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static setObject(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
