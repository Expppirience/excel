import { $ } from "@core/dom";

import { ExcelComponent } from "../../core/ExcelComponent";
import { changeTitle } from "./../../redux/actionCreators";
import { createHeader } from "./header.template";
import { debounce } from "./../../core/utils";
import { ActiveRoute } from "./../../core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
  }

  onInput(event) {
    const titleInp = $(event.target).closest("[data-table-title]");
    if (titleInp.$el) {
      debounce(this.$dispatch(changeTitle(titleInp.text())), 400);
    }
  }

  onClick(event) {
    const $target = $(event.target);
    const currentState = this.store.getState();
    console.log(currentState, "CURRENT STATE");
    if ($target.closest('[data-action="exit"]').exists()) {
      ActiveRoute.navigate("");
    } else if ($target.closest('[data-action="delete"]')) {
      const decision = confirm("Удалить таблицу");

      if (decision) {
        localStorage.removeItem("excel-" + ActiveRoute.param);
        ActiveRoute.navigate("");
      }
    }
  }

  toHTML() {
    return createHeader(this.store.getState());
  }
}
