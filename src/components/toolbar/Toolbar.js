import { $ } from "@core/dom";

import { createToolbar } from "./toolbar.template";
import { ExcelStateComponent } from "./../../core/ExcelStateComponent";
import { defaultStyles } from "./../../constants";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options,
    });
  }

  prepare() {
    // const globalState = this.store.getState();
    this.initState({ ...defaultStyles });
    // this.initState({ ...defaultStyles, ...globalState.stylesStatae });
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target).closest('[data-type="button"]');
    if ($target.$el) {
      const $icon = $target.find("i");
      const styles = JSON.parse($icon.data.value);
      this.$trigger("toolbar:applyStyle", styles);
      const styleName = Object.keys(styles)[0];
      this.setState({ [styleName]: styles[styleName] });
    }
  }
}
