export default class MainView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("div"),
        callback: () => {},
        username: "User Name Here",
      },
      options
    );
  }

  render() {
    this.options.element.innerHTML = `<header class="header">
      <div class="header__logo">
        <img src="./svg/logoColored.svg" alt="theBEAT Logo-Colored" />
      </div>
      <hr />
      <div class="header__info">
      <div class="header__participant">${this.options.username}</div>
      <div class="header__date">${new Date().toDateString()}</div>
      </div>
    </header>

    <main class="main">
      <section class="section">
        <div for="accordionLefBottom" class="section__title">
          DASHBOARD
        </div>
      </section>
      <section class="section">
        <div for="accordionLefBottom" class="section__title">
          LEADER BOARD
        </div>
      </section>
      <section class="section">
        <div for="accordionLefBottom" class="section__title">
          DAILY TRACKER
        </div>
      </section>
    </main>`;

    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.element
    );

    this.options.callback();
  }
  remove() {
    this.options.element.remove();
  }
}
