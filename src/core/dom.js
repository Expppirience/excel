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
    return this;
  }

  css(styles = {}) {
    [...Object.keys(styles)].forEach(
      (key) => (this.$el.style[`${key}`] = styles[key])
    );
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
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
    if (text) {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName == "INPUT") return this.$el.value.trim();
    return this.$el.textContent.trim();
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
