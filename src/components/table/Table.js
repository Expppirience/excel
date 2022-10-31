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
import {
  applyStyle,
  changeStyles,
  changeText,
  tableResize,
} from "./../../redux/actionCreators";
import { defaultStyles } from "./../../constants";
import { parse } from "./../../core/parse";

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
      this.selection.current.attr("data-value", text);
      this.selection.current.text(parse(text));
      this.dispatchText(this.selection.current.data.value);
    });
    this.$on("formula:enterPressed", () => {
      this.selection.current.focus();
    });

    this.$on("toolbar:applyStyle", (style) => {
      this.$dispatch(
        applyStyle({ style: style, ids: this.selection.selectedIDs })
      );
      this.selection.applyStyle(style);
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$trigger("table:switchCell", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(changeStyles(styles));
  }

  async resizeHandler(event) {
    try {
      const data = await resizeTable(this.$el, this.$root, event);
      this.$dispatch(tableResize(data));
    } catch (e) {
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
