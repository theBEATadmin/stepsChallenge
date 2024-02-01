export default class Table {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        // element: document.createElement("table"),
        username: "",
        team: "",
        data: {
          header: [],
          rows: [],
          team: [],
        },
        callbackPagination: () => {},
        callbackFilter: () => {},
        callbackInit: () => {},
      },
      options
    );

    //  THIS PROCESS SHOULD BE IN THE MODEL
    // NO NEED TO BE SORTED BECAUSE THE SORUCE THE DATA IS ALREADY RANKED
    //

    this.rankingAll = JSON.parse(JSON.stringify(this.options.data.rows));

    this.rankingTeam = JSON.parse(JSON.stringify(this.rankingAll)).filter(
      (datum) => datum[3] === this.options.team
    );

    let ranks = [
      ...new Set(this.rankingTeam.map((datum) => Number(datum[2]))),
    ].sort((a, b) => a - b);

    this.rankingTeam.forEach((datum) => {
      let index = ranks.findIndex((rank) => rank === Number(datum[2]));
      datum[0] = index + 1;
    });

    // CONVERT NUMBER TO STRING FORM
    // STEPS IS AT INDEX  2
    this.rankingTeam.forEach((datum) => {
      datum[2] = this._formatNumber(datum[2]);
    });

    this.rankingAll.forEach((datum) => {
      datum[2] = this._formatNumber(datum[2]);
    });

    this.element;

    // SET INTIAL VALUES
    this._reset();

    this.element = document.createElement("table");
    this.element.classList.add("table");
    this.element.innerHTML = this._generateMarkup();
    this.options.container.insertAdjacentElement("afterbegin", this.element);
    this.options.callbackInit(
      Math.ceil(this.filteredRows.length / this.maxRows)
    );
  }

  _formatNumber(num) {
    const numberFormat = new Intl.NumberFormat("en-US");

    num = parseInt(num);
    console.log(num);
    if (isNaN(num) || num === 0) return "-";

    return numberFormat.format(num);
  }
  _reset() {
    this.filtered = false;
    this.pageNumber = 1;
    this.maxRows = 10;
    this.maxColumns = 4;
    this.filteredRows = this.rankingAll;
    this.renderRows = [];
  }
  // THIS FUNCTIONS SUPERCEDED THE _addHeader AND _addRows
  // THIS WILL HAVE A  4 X 10 TABLE
  _generateMarkup() {
    const startIndex = (this.pageNumber - 1) * this.maxRows;
    const endIndex = startIndex + this.maxRows;
    const rows = this.filteredRows.slice(startIndex, endIndex);

    return `<thead>
    <tr>
      ${this.options.data.header
        .map((datum) => {
          return `<th>${datum}</th>`;
        })
        .join("")}
    </tr>
  </thead>
  <tbody>
  ${Array.from({ length: this.maxRows }, (_, indexRow) => {
    return `<tr ${
      rows?.[indexRow]?.[1] == this.options.username ? "class=active-row" : ""
    }>${Array.from({ length: this.maxColumns }, (_, indexData) => {
      return `<td>${rows?.[indexRow]?.[indexData] ?? "&nbsp;"}</td>`;
    }).join("")}</tr>`;
  }).join("")}
  </tbody>`;
  }

  _update() {
    const newMarkup = `<table>${this._generateMarkup()}</table>`;
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("tbody tr"));
    const currentElements = Array.from(
      this.element.querySelectorAll("tbody tr")
    );

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      if (!newElement.isEqualNode(currentElement)) {
        currentElement.innerHTML = newElement.innerHTML;
        currentElement.className = newElement.className;
      }
    });
  }

  filter(str) {
    this.filtered = str === "true";
    this.pageNumber = 1;

    this.filteredRows = this.filtered ? this.rankingTeam : this.rankingAll;

    /* this.filteredRows = this.filtered
      ? this.rankingAll.filter((row) => {
          return row[3] === this.options.team;
        })
      : this.rankingAll; */

    this._update();

    this.options.callbackPagination(
      Math.ceil(this.filteredRows.length / this.maxRows)
    );
  }

  page(num) {
    this.pageNumber = num;
    this._update();
  }

  refresh(data) {
    this.options.data = data;
    this._reset();
    this._update();
    this.options.callbackFilter(true);
    this.options.callbackPagination(
      Math.ceil(this.filteredRows.length / this.maxRows)
    );
  }
}
