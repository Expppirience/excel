class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html("");
    return this;
  }

  append(node) {
    node instanceof Dom ? (node = node.$el) : "";
    Element.prototype.append
      ? this.$el.append(node)
      : this.$el.appendChild(node);
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  get data() {
    return this.$el.dataset;
  }
  focus() {
    this.$el.focus();
  }

  css(styles = {}) {
    [...Object.keys(styles)].forEach(
      (key) => (this.$el.style[`${key}`] = styles[key])
    );
  }
  addClass(className) {
    this.$el.classList.add(className);
  }
  removeClass(className) {
    this.$el.classList.remove(className);
  }

  hasClass(className) {
    return this.$el.classList.contains(className);
  }

  id(shouldParse) {
    if (shouldParse) {
      const parsed = this.id().split(":");
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.$el.dataset.id;
  }

  text(text) {
    if (text !== "undefind") {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName == "INPUT") return this.$el.value.trim();
    return this.$el.textContent.trim();
  }

  attr(name, value = "") {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  getStyles(styles = []) {
    return styles.reduce((res, styleName) => {
      res[styleName] = this.$el.style[styleName];
      return res;
    }, {});
  }
}

$("div").html(`<h1>Test</h1>`).clear();

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  classes ? el.classList.add(classes) : "";
  return $(el);
};
