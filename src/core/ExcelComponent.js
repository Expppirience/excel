import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.observer = options.observer;
    this.prepare();
    this.unsubscribers = [];
  }

  prepare() {}

  $trigger(event, ...args) {
    this.observer.trigger(event, ...args);
  }

  $on(event, callback) {
    const unsub = this.observer.subscribe(event, callback);
    this.unsubscribers.push(unsub);
  }

  // Returns template
  toHTML() {
    return "";
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
