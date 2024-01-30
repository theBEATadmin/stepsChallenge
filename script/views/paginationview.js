"use strict";

const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;

  if (current + half >= total) {
    to = total;
  } else if (current > half) {
    to = current + half;
  }

  let from = Math.max(to - max, 0);

  return Array.from({ length: Math.min(total, max) }, (_, i) => i + 1 + from);
};

export default class PaginationButton {
  constructor(container, callback = () => {}) {
    this.container = container;
    this.callback = callback;
  }

  render(totalPages, maxPagesVisible = 10, currentPage = 1) {
    this._remove();
    let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    let currentPageBtn = null;
    const buttons = new Map();
    const disabled = {
      start: () => pages[0] === 1,
      prev: () => currentPage === 1 || currentPage > totalPages,
      end: () => pages.slice(-1)[0] === totalPages,
      next: () => currentPage >= totalPages,
    };
    const frag = document.createDocumentFragment();
    const paginationButtonContainer = document.createElement("div");
    paginationButtonContainer.className = "pagination-buttons";

    const createAndSetupButton = (
      label = "",
      cls = "",
      disabled = false,
      handleClick
    ) => {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = label;
      buttonElement.className = `page-btn ${cls}`;
      buttonElement.disabled = disabled;
      buttonElement.addEventListener("click", (e) => {
        handleClick(e);
        this.update();
        paginationButtonContainer.value = currentPage;
        paginationButtonContainer.dispatchEvent(
          new CustomEvent("change", { detail: { currentPageBtn } })
        );
      });

      return buttonElement;
    };

    const onPageButtonClick = (e) =>
      (currentPage = Number(e.currentTarget.textContent));

    const onPageButtonUpdate = (index) => (btn) => {
      btn.textContent = pages[index];

      if (pages[index] === currentPage) {
        currentPageBtn.classList.remove("page-btn--active");
        btn.classList.add("page-btn--active");
        currentPageBtn = btn;
        currentPageBtn.focus();
      }
    };

    buttons.set(
      createAndSetupButton(
        "",
        "start-page",
        disabled.start(),
        () => (currentPage = 1)
      ),
      (btn) => (btn.disabled = disabled.start())
    );

    buttons.set(
      createAndSetupButton(
        "",
        "prev-page",
        disabled.prev(),
        () => (currentPage -= 1)
      ),
      (btn) => (btn.disabled = disabled.prev())
    );

    pages.map((pageNumber, index) => {
      const isCurrentPage = currentPage === pageNumber; // RETURNS BOOLEAN
      const button = createAndSetupButton(
        pageNumber,
        isCurrentPage ? "page-btn--active" : "",
        false,
        onPageButtonClick
      );

      if (isCurrentPage) {
        currentPageBtn = button;
      }

      buttons.set(button, onPageButtonUpdate(index));
    });

    buttons.set(
      createAndSetupButton(
        "",
        "next-page",
        disabled.next(),
        () => (currentPage += 1)
      ),
      (btn) => (btn.disabled = disabled.next())
    );

    buttons.set(
      createAndSetupButton(
        "",
        "end-page",
        disabled.end(),
        () => (currentPage = totalPages)
      ),
      (btn) => (btn.disabled = disabled.end())
    );

    buttons.forEach((_, btn) => frag.appendChild(btn));
    paginationButtonContainer.appendChild(frag);

    // MUST BE INVOKED WITHOUT CALLING
    // this.append = () => {
    this.container.appendChild(paginationButtonContainer);
    // };

    this.update = (newPageNumber = currentPage) => {
      currentPage = newPageNumber;
      pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
      buttons.forEach((updateButton, btn) => updateButton(btn));
    };

    // this.onChange = () => {
    paginationButtonContainer.addEventListener("change", (e) => {
      this.callback(e);
    });
    // };
  }

  _remove() {
    const el = document.querySelector(".pagination-buttons");

    if (el) el.remove();
  }
}

// let paginationButtons = new PaginationButton(10, 5);

// paginationButtons.render();

// paginationButtons.onChange((e) => {
//   console.log("-- changed", e.target.value);
// });

// document.querySelector("#btn").addEventListener("click", (e) => {
//   paginationButtons = new PaginationButton(5, 5);
//   paginationButtons.render();
// });
