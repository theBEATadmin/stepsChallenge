"use strict";

let templates;

const initLogin = () => {
  document.querySelector(".button-login").addEventListener("click", (e) => {
    const spinner = new Spinner({
      callback: () => {
        e.target.closest(".form").remove();
        console.log(document.querySelector("#main").cloneNode(true));
        document.body.appendChild(
          document.querySelector("#main").content.cloneNode(true)
        );
        init();
      },
      timeout: 2500,
    });
  });
};

const init = () => {
  const mabButtons = document.querySelectorAll(".mab__button--secondary");
  const floatingButtons = document.querySelectorAll(".floating-button");

  {
    // ENABALE ALL MENU BUTTONS
    document.querySelectorAll(".mab").forEach((multiAction) => {
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
  }
  // RENDER PROGRESS FORM
  mabButtons[0].addEventListener("click", () => {
    Confirm.open({
      title: "Record Progress",
      message: document.querySelector("#progress").innerHTML,
      onok: () => {},
      okText: "Submit",
      cancelText: "Cancel",
    });
  });

  // RENDER TRACKER FORM
  mabButtons[1].addEventListener("click", () => {
    Confirm.open({
      title: "Update Tracker",
      message: document.querySelector("#tracker").innerHTML,
      onok: () => {},
      okText: "Submit",
      cancelText: "Cancel",
    });
  });

  console.log("test commit");
  // LOGOUT
  mabButtons[2].addEventListener("click", () => {
    document
      .querySelectorAll(".header, .main, .footer")
      .forEach((el) => el.remove());

    document.body.appendChild(templates[0].content.cloneNode(true));
    initLogin();
  });
  alert("HACKED");
  // RENDER STEPS RESULT
  floatingButtons[0].addEventListener("click", () => {
    const content = document.querySelectorAll(".section")[0].cloneNode(true);

    // REMOVE THE TITLE & BUTTON
    content.querySelector(".section__title").remove();
    content.querySelector(".floating-button").remove();

    Confirm.open({
      title: "Steps Progress| Ranessa | 24 Jan 2024",
      message: content.innerHTML,
      okText: "Close",
      cancelButtonVisible: false,
    });
  });

  // RENDER TRACKER RESULT
  floatingButtons[1].addEventListener("click", () => {
    const content = document.querySelectorAll(".section")[2].cloneNode(true);

    // REMOVE THE TITLE
    content.querySelector(".section__title").remove();
    content.querySelector(".floating-button").remove();

    Confirm.open({
      title: "Tracker | Ranessa | 24 Jan 2024",
      message: content.innerHTML,
      okText: "Close",
      cancelButtonVisible: false,
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  templates = document.querySelectorAll("template");

  document.body.appendChild(templates[0].content.cloneNode(true));

  initLogin();
});
