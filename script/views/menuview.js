export default class MenuView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
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
      `<div class="mab">
      <button type="button" class="mab__button mab__button--menu">
        <span class="material-icons mab__icon">menu</span>
      </button>

      <div class="mab__list">
        <button type="button" class="mab__button mab__button--secondary">
          <span class="mab__text">Record Steps</span>
        </button>
        <button type="button" class="mab__button mab__button--secondary">
          <span class="mab__text">Update Tracker</span>
        </button>

        <button type="button" class="mab__button mab__button--secondary">
          <span class="mab__text">Logout</span>
        </button>
      </div>
    </div>`
    );

    this.options.container.insertAdjacentElement(
      "beforeend",
      this.options.element
    );

    this._addListener();
  }

  _addListener() {
    // ENABALE ALL MENU BUTTONS
    this.options.element.querySelectorAll(".mab").forEach((multiAction) => {
      const menuButton = multiAction.querySelector(".mab__button--menu");
      const list = multiAction.querySelector(".mab__list");

      menuButton.addEventListener("click", () => {
        list.classList.toggle("mab__list--visible");
      });
    });

    // HIDE ALL LIST WHEN CLICKING ELSEWHERE ON THE PAGE
    document.addEventListener("click", (e) => {
      const keepOpen =
        e.target.matches(".mab__list") ||
        e.target.matches(".mab__button--menu") ||
        e.target.closest(".mab__icon");

      if (keepOpen) return;

      document.querySelectorAll(".mab__list").forEach((list) => {
        list.classList.remove("mab__list--visible");
      });
    });

    const mabButtons = this.options.element.querySelectorAll(
      ".mab__button--secondary"
    );

    mabButtons[0].addEventListener("click", (e) => {
      this.options.callbackButton1();
    });

    mabButtons[1].addEventListener("click", (e) => {
      this.options.callbackButton2();
    });

    mabButtons[2].addEventListener("click", (e) => {
      this.options.element.remove();
      this.options.callbackLogout();
    });
  }
}
