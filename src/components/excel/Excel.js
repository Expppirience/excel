import { $ } from "@core/dom";
import { Observer } from "./../../core/Observer";
import { StoreSubscriber } from "../../core/StoreSubsriber";

export class Excel {
  constructor(selector, options) {
    this.$app = $(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.store = options.store;
    this.subsriber = new StoreSubscriber(this.store);
    console.log(new StoreSubscriber(this.store));
    console.log(this.store, "FROM EXCEL");
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

  render() {
    this.$app.append(this.getRoot());
    this.subsriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subsriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destro());
  }
}
