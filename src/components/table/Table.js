import { ExcelComponent } from "../../core/ExcelComponent";
import { resizeTable } from "./table.resize";
import { createTable } from "./table.template";
import { shouldResize } from "./table.functions";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "mouseup"],
    });
    this.$root = $root;
    this.$el = this.$root.$el;
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    shouldResize(Event) ? resizeTable(this.$el, this.$root, event) : "";
  }

  onMouseup(event) {}
}
