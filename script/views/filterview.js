export default class ButtonGroup {
  constructor(callback, container) {
    this.callback = callback;
    this.element = document.createElement("div");
    this.element.className = "radios-container";
    this.element.innerHTML = ` <div class="radios">
        <input
        class="radios__input"
        type="radio"
        value=false
        name="radiogroup"
        id="radiogroup1"
        checked
        />
        <label class="radios__label" for="radiogroup1">All teams</label>
        <input
        class="radios__input"
        type="radio"
        value=true
        name="radiogroup"
        id="radiogroup3"
       
        />
        <label class="radios__label" for="radiogroup3">My team</label>
        </div>`;

    Array.from(this.element.querySelectorAll("input")).forEach((input) =>
      input.addEventListener("change", (e) => {
        this.callback(e.target.value);
      })
    );

    container.insertAdjacentElement("afterbegin", this.element);
  }

  reset(boolean) {
    this.element.querySelector("input").checked = boolean;
  }
}
