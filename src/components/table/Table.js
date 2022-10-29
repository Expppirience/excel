import { ExcelComponent } from "../../core/ExcelComponent";
import { resizeTable } from "./table.resize";
import { createTable } from "./table.template";
import {
  isCell,
  nextSelector,
  renderMatrix,
  shouldResize,
} from "./table.functions";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";
import { changeText, tableResize } from "./../../redux/actionCreators";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
    this.$root = $root;
    this.$el = this.$root.$el;
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
      this.dispatchText(this.selection.current.text());
    });

    this.$on("formula:enterPressed", () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$trigger("table:switchCell", $cell);
  }

  async resizeHandler(event) {
    try {
      const data = await resizeTable(this.$el, this.$root, event);
      this.$dispatch(tableResize(data));
    } catch (e) {
      console.log("RESIZE ERROR: ", e.message);
    }
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  onKeydown(event) {
    if (isCell(event)) {
      const ID = nextSelector(event);
      if (ID) {
        const toSelect = this.$root.find(`[data-id="${ID[0]}:${ID[1]}"]`);
        toSelect.$el ? this.selectCell(toSelect) : "";
      }
    }
  }

  onMousedown(event) {
    shouldResize(event) ? this.resizeHandler(event) : "";
    if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const targetID = $target.id(true);
        const currentID = this.selection.current.id(true);

        const $cells = renderMatrix(targetID, currentID).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  dispatchText(value) {
    this.$dispatch(
      changeText({
        id: this.selection.current.id(),
        value: value,
      })
    );
  }

  onInput(event) {
    this.dispatchText($(event.target).text());
  }
}
