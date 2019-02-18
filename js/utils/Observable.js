/**
 * Observable 활용을 위한 클래스
 */
class Observable {
  constructor () {
    this._observers = {}
    this._token = 0;
  }

  subscribe (observer) {
    this._observers[this._token] = observer;
    this._token++;
  }

  unsubscribe (token) {
    delete this._observers[token];
  }

  notify (data) {
    Object.values(this._observers).forEach(observer => {
      observer(data);
    });
  }
}

export default Observable
