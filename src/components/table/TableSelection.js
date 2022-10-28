
export class TableSelection {
  static selectedClass = "selected";
  constructor($root) {
    this.group = [];
    this.$root = $root;
    this.current = null;

  }

  deselect() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.selectedClass));
    this.group = [];
  }

  select($el) {
    this.deselect();
    this.current = $el;
    this.group.push($el);
    $el.addClass(TableSelection.selectedClass);
    $el.focus();
  }

  selectGroup($cells) {
    this.deselect();
    this.group = [...$cells];
    this.group.forEach((cell) => cell.addClass(TableSelection.selectedClass));
  }

}
