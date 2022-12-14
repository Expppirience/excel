import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
      subscribe: ["currentText"],
    });
  }

  init() {
    super.init();

    this.$formulaInput = this.$root.find("#formula");

    this.$on("table:switchCell", ($cell) => {
      this.$formulaInput.text($cell.data.value);
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  storeChanged({ currentText }) {
    this.$formulaInput.text(currentText);
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$trigger("formula:input", text);
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$trigger("formula:enterPressed");
    }
  }
}
