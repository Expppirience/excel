import { $ } from "@core/dom";
import { Observer } from "./../../core/Observer";
import { StoreSubscriber } from "../../core/StoreSubsriber";
import { lastSeen } from "../../redux/actionCreators";

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.observer = new Observer();
    this.store = options.store;
    this.subsriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create("div", "excel");
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };
    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  init() {
    this.store.dispatch(lastSeen(new Date()));
    this.subsriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subsriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
