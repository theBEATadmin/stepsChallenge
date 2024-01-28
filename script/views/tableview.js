export default class Table {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("table"),
        username: "",
        data: {
          header: [],
          rows: [],
        },
      },
      options
    );

    this.options.element.classList.add("table");
    this._addHeader();
    console.log(this.options.container);
    this.options.container.insertAdjacentElement(
      "beforeend",
      this.options.element
    );
  }

  _addHeader() {
    this.options.element.innerHTML = `
  <thead>
    <tr>
      ${this.options.data.header
        .map((datum) => {
          return `<th>${datum}</th>`;
        })
        .join("")}
    </tr>
  </thead>
  <tbody>
  </tbody>
`;
  }

  addRow(data = this.options.body) {
    this.options.element.querySelector("tbody").insertAdjacentHTML(
      "afterbegin",
      this.options.data.rows
        .map((row) => {
          return `<tr class="${
            row[1] == this.options.username ? "active-row" : ""
          }">
    ${row
      .map((datum) => {
        return `<td>${datum}</td>`;
      })
      .join("")}</tr>`;
        })
        .join("")
    );
  }
}
