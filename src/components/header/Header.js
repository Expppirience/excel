import { $ } from "@core/dom";

import { ExcelComponent } from "../../core/ExcelComponent";
import { changeTitle } from "./../../redux/actionCreators";
import { createHeader } from "./header.template";
import { debounce } from "./../../core/utils";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }

  onInput(event) {
    const titleInp = $(event.target).closest("[data-table-title]");
    if (titleInp.$el) {
      debounce(this.$dispatch(changeTitle(titleInp.text())), 400);
    }
  }

  toHTML() {
    return createHeader(this.store.getState());
  }
}
