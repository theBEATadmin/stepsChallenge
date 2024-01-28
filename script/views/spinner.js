export default class Spinner {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("div"),
        timeout: 1500,
        callback: () => {
          console.log("spinner callback");
        },
      },
      options
    );
  }

  render() {
    this.options.element.className = "overlay";
    this.options.element.innerHTML = `<div class="spinner"></div>`;

    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.element
    );
  }
  remove() {
    setTimeout(() => {
      this.options.callback();
      this.options.element.remove();
    }, this.options.timeout);
  }
}
