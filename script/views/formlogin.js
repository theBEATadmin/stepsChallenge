export default class LoginView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("form"),
        callback: () => {},
      },
      options
    );
  }

  render() {
    this.options.element.className = "form form--main";
    this.options.element.innerHTML = `<div class="form__header">
    <img src="./svg/brandmarkWhite.svg" alt="theBeat Brandmark-white" />
    </div>
    <div class="form__content">
    <div class="form__content__text">
        <h1 class="form-subtitle">
        <strong class="the-beat">theBEAT</strong> Studio
        </h1>
        <h2 class="form-title">your best yet challenge</h2>
        <h2 class="form-subtitle">Record Your Progress Today</h2>
    </div>

    <div class="form__content__inputs">
        <input
        type="text"
        name="username"
        placeholder="Username*"
        class="form__input"
        autocomplete="off"
        required
        />
        <input
        type="text"
        name="registration"
        placeholder="Registration No.*"
        class="form__input"
        autocomplete="off"
        required
        />
        <button type="button" class="button button-login">LET'S GO</button>
    </div>

    <div class="form__content__links">
        <p class="form__link">
        Don't know your username or membership number? Please check your digital membership card or get intouch with
        your team coach.
        </p>
    </div>
</div>`;

    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.element
    );

    this._addListener();
  }

  remove() {
    this.options.element.remove();
  }

  _addListener() {
    this.options.element
      .querySelector(".button-login")
      .addEventListener("click", (e) => {
        const inputs = Array.from(
          this.options.element.querySelectorAll("input")
        );
        if (inputs.some((input) => input.value == "")) {
          window.alert("Username and Password are required");
          return;
        }

        let data = {};

        inputs.forEach((input) => (data[input.name] = input.value));

        this.options.callback(data);
      });
  }
}
