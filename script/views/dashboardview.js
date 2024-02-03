import * as utils from "../utils.js";

export default class DashboardView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
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

    this.element = document.createElement("div");
    this.element.className = "dashboard";
    this.element.innerHTML = this._generateMarkup();
    this.options.container.insertAdjacentElement("afterbegin", this.element);
  }

  _formatNumber(num) {
    if (isNaN(num) || num == 0 || num == null) return "-";

    return utils.standardNumberFormat.format(parseInt(num));
  }

  _generateMarkup() {
    return `<div class="dashboard-contents">
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
                  <span class="dashboard-content__text">Total Steps</span>
                  <span class="dashboard-content__number">${this._formatNumber(
                    this.options.data.totSteps
                  )}</span>
                </div>
                <div class="dashboard-subcontent">
                  <span class="dashboard-content__text">Totak Active Minutes</span>
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
                    >Active Minutes Daily Average</span
                  >
                  <span class="dashboard-content__number">${this._formatNumber(
                    this.options.data.avgMinutes
                  )}</span>
                </div>
              </div>
            </div>`;
  }

  update(data) {
    this.options.data = data;

    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(
      newDOM.querySelectorAll(
        ".dashboard-contents__number,dashboard-content__number"
      )
    );

    const currentElements = Array.from(
      this.element.querySelectorAll(
        ".dashboard-contents__number,dashboard-content__number"
      )
    );

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      if (!newElement.isEqualNode(currentElement)) {
        currentElement.textContent = newElement.textContent;
      }
    });
  }

  import() {
    return this.element.innerHTML;
  }
}
