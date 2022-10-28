export class Observer {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener != callback
      );
    };
  }

  trigger(event, ...args) {
    if (this.listeners[event].length > 0) {
      this.listeners[event].forEach((callback) => {
        callback(...args);
      });
    }
  }
}
