export default class DashboardView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("div"),
        copy: document.body,
        callback: () => {},
      },
      options
    );

    this._addListener();
  }

  render() {
    this.options.element.className = "floating-button floating-button--blue";
    this.options.element.innerText = `focus`;

    this.options.container.insertAdjacentElement(
      "beforeend",
      this.options.element
    );
  }
  _addListener() {
    this.options.element._addListener("click", (e) => {
      this.options.callback(this.container.copy.content.cloneNode(true));
    });
  }
}
