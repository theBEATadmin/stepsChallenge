"use strict";

import * as model from "./model.js";
import * as config from "./config.js";
import Spinner from "./views/spinner.js";
import Login from "./views/loginview.js";
import Menu from "./views/menuview.js";
import MainView from "./views/mainview.js";
import Dashboard from "./views/dashboardview.js";
import Table from "./views/tableview.js";
import Calendar from "./views/calendarview.js";
import Confirm from "./views/confirmview.js";
import StepsForm from "./views/stepsform.js";
import TrackerForm from "./views/trackerform.js";

let login,
  spinner,
  main,
  menu,
  dashboard,
  table,
  calendar,
  stepsform,
  trackerform;
let sections;
// https://script.google.com/macros/s/AKfycbzwSUvHiomI_m_FelXVgKHRSaq7iAw1QpDZq3jXzT3Fh9eXY7bW6OEFXiO1b6AUG5LO5w/exec

// const initLogin = () => {
//   document.querySelector(".button-login").addEventListener("click", (e) => {
//     const spinner = new Spinner({
//       callback: () => {
//         e.target.closest(".form").remove();
//         document.body.appendChild(
//           document.querySelector("#main").content.cloneNode(true)
//         );
//         // init();
//       },
//       timeout: 2500,
//     });
//   });
// };

/* const init = () => {
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
  // RENDER STEPS FORM
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

  // LOGOUT
  mabButtons[2].addEventListener("click", () => {
    document
      .querySelectorAll(".header, .main, .footer")
      .forEach((el) => el.remove());

    document.body.appendChild(templates[0].content.cloneNode(true));
    initLogin();
  });
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
}; */

// LOGIN
const renderLogin = () => {
  login = new Login({
    callback: (val) => {
      loginAccount({
        data: val,
        id: config.LOGIN_ID,
      });
    },
  });

  login.render();
};

//MAIN
const renderMain = () => {
  // MAIN CONTAINER
  main = new MainView({
    username: model.state.username,
    // OTHER VIEW TO BE LOADED AFTER LOADING THE MAIN VIEW
    callback: () => {
      // CONTAINER CAN BE QUERIED AFTER ADDING THE MAIN
      sections = document.querySelectorAll("section");
      renderMenu();
      renderDashboard();
      renderTable();
      renderCalendar();
      stepsform = new StepsForm();
      trackerform = new TrackerForm();
    },
  });

  main.render();
};

// MENU
const renderMenu = () => {
  menu = new Menu({
    container: document.querySelector(".header"),

    // FOCUS DASHBOARD
    callbackButton1: () => {
      new Confirm({
        title: `Dashboard| ${
          model.state.username.charAt(0).toUpperCase() +
          model.state.username.slice(1)
        } | ${new Date().toDateString()}`,
        message: dashboard.import(),
        okText: "Close",
        cancelButton: false,
      });
    },

    // FOCUS FORM
    callbackButton2: () => {
      new Confirm({
        title: `Daily Tracker | ${
          model.state.username.charAt(0).toUpperCase() +
          model.state.username.slice(1)
        } | ${new Date().toDateString()}`,
        message: calendar.import(),
        okText: "Close",
        cancelButton: false,
      });
    },

    callbackButton3: () => {
      new Confirm({
        title: `Update Tracker | ${
          model.state.username.charAt(0).toUpperCase() +
          model.state.username.slice(1)
        } | ${new Date().toDateString()}`,
        message: trackerform.import(),
        okText: "Submit",
        cancelText: "Cancel",
      });
    },

    // STEPS
    callbackButton4: () => {
      new Confirm({
        title: `Record Progress | ${
          model.state.username.charAt(0).toUpperCase() +
          model.state.username.slice(1)
        } | ${new Date().toDateString()}`,
        message: stepsform.import(),
        okText: "Submit",
        cancelText: "Cancel",
      });
    },
    callbackLogout: () => {
      main.remove();
      renderLogin();
      model.clearItem();
    },
  });

  menu.render();
};

// DASHBOARD
const renderDashboard = () => {
  dashboard = new Dashboard({
    container: sections[0],
    username: model.state.username,
    data: model.state.dashboard,
  });
  dashboard.render();
};

// TABLE
const renderTable = () => {
  table = new Table({
    container: sections[1],
    username: model.state.username,
    data: model.state.table,
  });
  table.addRow();
};

// CALENDAR
const renderCalendar = () => {
  calendar = new Calendar({
    container: sections[2],
    element: document.createElement("div"),
    data: model.state.calendar,
  });
};
const init = () => {
  // SPINNER
  spinner = new Spinner({
    timeout: 1000,
    callback: () => {},
  });

  // localStorage.removeItem("state");
  if (model.isLoggedIn()) {
    renderMain();
    return;
  }

  renderLogin();
};

document.addEventListener("DOMContentLoaded", init);

const loginAccount = async (params) => {
  try {
    spinner.render();
    await model.loadData(params);
    login.remove();
    renderMain();
  } catch (error) {
    alert(error.message);
  } finally {
    spinner.remove();
  }
};
