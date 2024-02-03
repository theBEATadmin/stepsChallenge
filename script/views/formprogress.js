import * as utils from "../utils.js";
import * as config from "../config.js";

export default class ProgressForm {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        username: "Member Name",
        submitCallback: () => {},
        data: [],
      },
      options
    );

    this.boolean =
      utils.deepCopy(this.options.data).findIndex((datum) => {
        return (
          utils.shortDateFormat.format(new Date(datum.date)) ==
          utils.shortDateFormat.format(config.DATE_TODAY)
        );
      }) !== -1;

    this.element, this.inputs, this.btnClose, this.btnSubmit;
  }

  open() {
    this.element = document.createElement("div");
    this.element.className = "popup";
    this.element.innerHTML = `<div class="popup__window">
  <button class="popup__close">&times;</button>
  <div class="popup__left">
    <img src="./svg/logoColored.svg" alt="theBEAT Logo-Colored" class="popup__logo" />
  </div>

  <div class="popup__right">
    <form class="form form--popup">
    <h2 class="popup__title">record progress</h2>
    <h3 class="popup__subtitle">${utils.toCamelCase(
      this.options.username
    )} | Week ${utils.countWeeks()} of 8 | Day ${utils.countDays()} of 56 </h3>
    </br>
    <p class="popup__text">Active minutes is the total time you spent walking and/or duoing a workout</p>
    <div class="form__inputs">
      <label for="stepsInp" class="form__label">Step:</label>
      <input id="stepsInp" type="number" name="steps" class="form__input" />
      <span class="form__error"><strong style="color: red;">&#33;</strong> Input your steps</span>
    </div>
    <div class="form__inputs">
      <label for="inpPassword" class="form__label">Name</label>
      <input id="inpPassword" type="number" name="minutes" class="form__input input--popup" />
      <span class="form__error"><strong style="color: red;">&#33;</strong> Input active minutes</span>
    </div>
    <div class="buttons">      
      <button type="submit" class="button button-loading">
        <span class="button-loading__text">Submit</span>
      </button>
    </div>
    </form>
  </div>
</div>`;

    this._addListeners();

    document.body.insertAdjacentElement("beforeend", this.element);
  }

  _addListeners() {
    this.inputs = Array.from(this.element.querySelectorAll("input"));

    [this.btnClose, this.btnSubmit] = this.element.querySelectorAll("button");

    this.btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      this._close();
    });

    this.inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        e.target.nextElementSibling.classList.remove("form__error--visible");
      });
    });

    this.btnSubmit.addEventListener("click", (e) => {
      e.preventDefault();

      const validInputs = this.inputs.filter((input) => {
        if (input.value == "") {
          input.nextElementSibling.classList.add("form__error--visible");
        } else {
          return input;
        }
      });

      if (this.inputs.length !== validInputs.length) return;

      if (this.boolean) {
        alert("Data already submitted");
        return;
      }
      this._toggleControls(true);
      let data = {};
      this.inputs.forEach((input) => (data[input.name] = input.value));
      this.options.submitCallback(data);
    });
  }

  _toggleControls(boolean) {
    this.btnSubmit.classList.toggle("button--loading");
    Array.from(this.element.querySelectorAll("input, button")).forEach(
      (el) => (el.disabled = boolean)
    );
  }

  _close() {
    this.element.classList.add("popup--close");

    this.element.addEventListener("animationend", () => {
      document.body.removeChild(this.element);
    });
  }

  successCallback(blean) {
    this.boolean = blean;
    this._toggleControls(false);
  }

  errorCallback(error) {
    this._toggleControls(false);

    alert(error.message);
  }
}
