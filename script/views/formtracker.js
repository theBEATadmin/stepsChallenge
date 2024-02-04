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
    console.log(this.options.data);
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
      <br/>
    <p class="popup__text"><strong>Today, I</strong>...</p>
    <div class="radio-container">
      <label for="radio1" class="radio">
        <input
          type="radio"
          name="activity"
          id="radio1"
          class="radio__input"
        />
        <div class="radio__radio"></div>
        <span class="radio__text"> completed my steps </span>
      </label>
    </div>

    <div class="radio-container">
      <label for="radio2" class="radio">
        <input
          type="radio"
          name="activity"
          id="radio2"
          class="radio__input"
        />
        <div class="radio__radio"></div>
        <span class="radio__text"> joined a class or a workout </span>
      </label>
    </div>

    <div class="radio-container">
      <label for="radio3" class="radio">
        <input
          type="radio"
          name="activity"
          id="radio3"
          class="radio__input"
        />
        <div class="radio__radio"></div>
        <span class="radio__text">
          completed my steps and joined a class or a workout
        </span>
      </label>
    </div>

    <div class="radio-container">
      <label for="radio4" class="radio">
        <input
          type="radio"
          name="activity"
          id="radio4"
          class="radio__input"
        />
        <div class="radio__radio"></div>
        <span class="radio__text">wasn't able to do either </span>
      </label>
    </div>
      <br/>
    <p class="popup__text"><strong>How do you feel about your day?</strong></p>

    <div class="rating">
      <label class="rating__label" for="rating1">
        <!-- <span class="material-icons"> star_rate </span> -->
      </label>
      <input
        value="1"
        class="rating__input"
        type="radio"
        name="rating"
        id="rating1"
      />

      <label class="rating__label" for="rating2">
        <!-- <span class="material-icons"> star_rate </span> -->
      </label>
      <input
        value="2"
        class="rating__input"
        type="radio"
        name="rating"
        id="rating2"
      />

      <label class="rating__label" for="rating3">
        <!-- <span class="material-icons"> star_rate </span> -->
      </label>
      <input
        value="3"
        class="rating__input"
        type="radio"
        name="rating"
        id="rating3"
      />

      <label class="rating__label" for="rating4">
        <!-- <span class="material-icons"> star_rate </span> -->
      </label>
      <input
        value="4"
        class="rating__input"
        type="radio"
        name="rating"
        id="rating4"
      />

      <label class="rating__label" for="rating5">
        <!-- <span class="material-icons"> star_rate </span> -->
      </label>
      <input
        value="5"
        class="rating__input"
        type="radio"
        name="rating"
        id="rating5"
      />
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

      const validInputs = this.inputs.filter((input) => input.checked);

      if (this.boolean) {
        alert("You've already submitted an entry today!");
        return;
      }

      if (validInputs.length !== 2) {
        alert("Both responses are requried!");
        return;
      }

      let [activity, rating] = Array.from(
        this.element.querySelectorAll(".radio__input, .rating__input")
      ).filter((input) => input.checked);

      this._toggleControls(true);
      let data = {};
      data[rating.name] = rating.value;
      data[activity.name] = activity
        .closest(".radio-container")
        .querySelector(".radio__text").innerText;

      // console.log(data);
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
