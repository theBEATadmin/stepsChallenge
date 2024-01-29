export default class MenuView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        element: document.createElement("div"),
        callbackButton1: () => {},
        callbackButton2: () => {},
        callbackLogout: () => {},
      },
      options
    );
  }

  render() {
    this.options.element.className = "mab-container";
    this.options.element.insertAdjacentHTML(
      `afterbegin`,
      `<div class="menu-bar">
    <a class="menu-bar__link">
      <span class="material-symbols-outlined"> dashboard </span>view
    </a>
    <a class="menu-bar__link">
      <span class="material-symbols-outlined"> calendar_today </span>tracker
    </a>
    <a class="menu-bar__link">
      <span class="material-symbols-outlined"> mood </span> progress
    </a>
    <a class="menu-bar__link">
      <span class="material-symbols-outlined"> footprint </span> steps
    </a>
    <a class="menu-bar__link">
      <span class="material-symbols-outlined"> logout </span> logout
    </a>
  </div>`
    );

    this.options.container.insertAdjacentElement(
      "beforeend",
      this.options.element
    );

    this._addListener();
  }

  _addListener() {
    const menuButtons =
      this.options.element.querySelectorAll(".menu-bar__link");

    menuButtons[0].addEventListener("click", (e) => {
      this.options.callbackButton1();
    });

    menuButtons[1].addEventListener("click", (e) => {
      this.options.callbackButton2();
    });
    menuButtons[2].addEventListener("click", (e) => {
      this.options.callbackButton2();
    });
    menuButtons[3].addEventListener("click", (e) => {
      this.options.callbackButton2();
    });

    menuButtons[4].addEventListener("click", (e) => {
      this.options.callbackLogout();
    });
  }
}
