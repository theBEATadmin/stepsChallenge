export default class Table {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("table"),
        username: "",
        team: "",
        data: {
          header: [],
          rows: [],
        },
        callback: () => {},
      },
      options
    );

    this.options.element.classList.add("table");

    // SET VAR FOR FILTER AND PAGINATION
    this.filtered = false;
    this.pageNumber = 1;
    this.maxRowsVisible = 10;
    this.filteredRows = this.options.data.rows;
    this.renderRows = [];
    this._addHeader();
    this._addRows();
    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.element
    );
    this.options.callback(
      Math.ceil(this.filteredRows.length / this.maxRowsVisible)
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
  <tbody></tbody>
`;
  }

  _addRows() {
    // LOGIC: MULTIPLY THE (pageNumber - 1) BY maxRowsVisible
    // FILTER PAGE TO DISPLAY
    const startIndex = (this.pageNumber - 1) * this.maxRowsVisible;
    const endIndex = startIndex + this.maxRowsVisible;
    const rows = this.filteredRows.slice(startIndex, endIndex);

    console.log(startIndex, endIndex);
    console.log(rows);

    this.options.element.querySelector("tbody").innerHTML = rows
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
      .join("");
  }

  page(num) {
    console.log(num);
    this.pageNumber = num;
    this._addRows();
  }

  filter(str) {
    this.filtered = str === "true";
    this.pageNumber = 1;
    this.filteredRows = this.filtered
      ? this.options.data.rows.filter((row) => {
          return row[3] === this.options.team;
        })
      : this.options.data.rows;

    this._addRows();
    this.options.callback(
      Math.ceil(this.filteredRows.length / this.maxRowsVisible)
    );
  }
}
