import * as utils from "../utils.js";
import * as config from "../config.js";

export default class Popup {
  constructor() {}

  open(username, title, content) {
    this.content = content;
    this.title = title;
    this.username = username;
    this.element, this.btnClose;
    this.element = document.createElement("div");
    this.element.className = "popup";
    this.element.innerHTML = `<div class="popup__window">
  <button class="popup__close">&times;</button>
  <div class="popup__left">
    <img src="./svg/logoColored.svg" alt="theBEAT Logo-Colored" class="popup__logo" />
  </div>

  <div class="popup__right">
 
    <h2 class="popup__title">${this.title}</h2>
    <h3 class="popup__subtitle">${utils.toCamelCase(
      this.username
    )} | Week ${utils.countWeeks()} of 8 | Day ${utils.countDays()} of 56 </h3>
    
    </br>
    ${this.content}
  </div>
</div>`;

    this._addListeners();

    document.body.insertAdjacentElement("beforeend", this.element);
  }

  _addListeners() {
    this.element.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      this._close();
    });
  }

  _close() {
    this.element.classList.add("popup--close");

    this.element.addEventListener("animationend", () => {
      document.body.removeChild(this.element);
    });
  }
}
