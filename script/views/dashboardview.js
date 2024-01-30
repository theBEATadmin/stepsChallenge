export default class DashboardView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("div"),
        userName: "",
        data: {
          steps: 0,
          avgSteps: 0,
          totSteps: 0,
          avgMinutes: 0,
          totMinutes: 0,
          rank: 0,
          count: 0,
        },
      },
      options
    );

    // CONVERT 0 TO -
    // Object.keys(this.options.data).forEach(
    //   (key) =>
    //     (this.options.data[key] =
    //       this.options.data[key] == 0 ? "-" : this.options.data[key])
    // );
  }

  _formatNumber(num) {
    if (isNaN(num) || num == 0) return "-";
    const numberFormat = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
    });

    return numberFormat.format(parseInt(num));
  }

  render() {
    this.options.element.className = "dashboard";
    this.options.element.innerHTML = `<div class="dashboard-contents">
              <span class="dashboard-contents__number">${this._formatNumber(
                this.options.data.steps
              )}</span>
              <span class="dashboard-contents__text">&nbsp;steps today</span>
            </div>
            <div class="dashboard-contents">
              <span class="dashboard-contents__number">${this._formatNumber(
                this.options.data.avgSteps
              )}</span>
              <span class="dashboard-contents__text">&nbsp;daily average</span>
            </div>
            <div class="dashboard-contents">
              <div class="dashboard-content">
                <div class="dashboard-subcontent">
                  <span class="dashboard-content__text">Steps</span>
                  <span class="dashboard-content__number">${this._formatNumber(
                    this.options.data.totSteps
                  )}</span>
                </div>
                <div class="dashboard-subcontent">
                  <span class="dashboard-content__text">Active Minutes</span>
                  <span class="dashboard-content__number">${this._formatNumber(
                    this.options.data.totMinutes
                  )}</span>
                </div>
              </div>
              <div class="dashboard-content">
                <div class="dashboard-subcontent">
                  <span class="dashboard-content__text">Overall Rank</span>
                  <span class="dashboard-content__number"> ${this._formatNumber(
                    this.options.data.rank
                  )}&frasl;${this._formatNumber(
      this.options.data.count
    )} </span>
                </div>
                <div class="dashboard-subcontent">
                  <span class="dashboard-content__text"
                    >Daily Active Minutes</span
                  >
                  <span class="dashboard-content__number">${this._formatNumber(
                    this.options.data.avgMinutes
                  )}</span>
                </div>
              </div>
            </div>`;

    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.element
    );
  }
  remove() {
    this.options.element.remove();
    this.options.callback();
  }
  update() {}
  import() {
    return this.options.element.innerHTML;
  }
}
