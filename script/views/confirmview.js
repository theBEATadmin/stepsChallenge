export default class Confirm {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        onok: function () {},
        oncancel: function () {},
        cancelButton: true,
      },
      options
    );

    const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <img src="./svg/logoColored.svg" alt="theBEAT Logo-Colored">
                        <span class="confirm__title">${
                          this.options.title
                        }</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${this.options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${
                          this.options.okText
                        }</button>
                      ${
                        this.options.cancelButton
                          ? `<button class="confirm__button confirm__button--cancel">${this.options.cancelText}</button>`
                          : ``
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
    const confirmContent = template.content.querySelector(".confirm__content");

    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        this.options.oncancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener("click", () => {
      this.options.onok(confirmContent.cloneNode(true));
      this._close(confirmEl);
    });

    if (this.options.cancelButton) {
      btnCancel.addEventListener("click", () => {
        this.options.oncancel();
        this._close(confirmEl);
      });
    }

    btnClose.addEventListener("click", () => {
      this.options.oncancel();
      this._close(confirmEl);
    });

    document.body.appendChild(template.content);
  }

  _close(confirmEl) {
    confirmEl.classList.add("confirm--close");

    confirmEl.addEventListener("animationend", () => {
      document.body.removeChild(confirmEl);
    });
  }
}
