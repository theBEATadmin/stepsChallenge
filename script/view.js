console.log("table filter to be added");

const Confirm = {
  open(options) {
    options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        onok: function () {},
        oncancel: function () {},
        cancelButtonVisible: true,
      },
      options
    );

    const html = `
              <div class="confirm">
                  <div class="confirm__window">
                      <div class="confirm__titlebar">
                      <img
                        src="./svg/brandmarkColored.svg"
                        alt="theBeat Brandmark-colored"
                      />
                          <span class="confirm__title">${options.title}</span>
                          <button class="confirm__close">&times;</button>
                      </div>
                      <div class="confirm__content">${options.message}</div>
                      <div class="confirm__buttons">
                         <button class="confirm__button confirm__button--ok confirm__button--fill">${
                           options.okText
                         }</button>
                         ${
                           options.cancelButtonVisible
                             ? `<button class="confirm__button confirm__button--cancel">${options.cancelText}</button>`
                             : ` `
                         }
                      </div>
                  </div>
              </div>
          `;

    const template = document.createElement("template");
    template.innerHTML = html;

    // Elements
    const confirmEl = template.content.querySelector(".confirm");
    const btnClose = template.content.querySelector(".confirm__close");
    const btnOk = template.content.querySelector(".confirm__button--ok");
    const btnCancel = template.content.querySelector(
      ".confirm__button--cancel"
    );

    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        options.oncancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener("click", () => {
      options.onok();
      this._close(confirmEl);
    });

    btnClose.addEventListener("click", () => {
      options.oncancel();
      this._close(confirmEl);
    });

    if (options.cancelButtonVisible) {
      btnCancel.addEventListener("click", () => {
        options.oncancel();
        this._close(confirmEl);
      });
    }

    // [btnCancel, btnClose].forEach((el) => {
    //   el.addEventListener("click", () => {
    //     options.oncancel();
    //     this._close(confirmEl);
    //   });
    // });

    document.body.appendChild(template.content);
  },

  _close(confirmEl) {
    confirmEl.classList.add("confirm--close");

    confirmEl.addEventListener("animationend", () => {
      document.body.removeChild(confirmEl);
    });
  },
};

class Spinner {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        spinner: document.createElement("div"),
        timeout: 1000,
        callback: () => {},
      },
      options
    );

    this.options.spinner.className = "overlay";
    this.options.spinner.innerHTML = `<div class="spinner"></div>`;

    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.spinner
    );

    this._remove();
  }

  _remove() {
    setTimeout(() => {
      this.options.callback();
      this.options.spinner.remove();
    }, this.options.timeout);
  }
}
