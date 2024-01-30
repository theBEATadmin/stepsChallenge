"use strict";

import * as model from "./model.js";
import * as config from "./config.js";
import Spinner from "./views/spinner.js";
import Login from "./views/formlogin.js";
import Menu from "./views/menuview.js";
import MainView from "./views/mainview.js";
import Dashboard from "./views/dashboardview.js";

// RANKNG PANEL
import Pagination from "./views/paginationview.js";
import Filter from "./views/filterview.js";
import Table from "./views/tableview.js";

import Calendar from "./views/calendarview.js";
import Confirm from "./views/confirmview.js";
import StepsForm from "./views/formsteps.js";
import TrackerForm from "./views/formtracker.js";

let login,
  spinner,
  main,
  menu,
  dashboard,
  filter,
  pagination,
  table,
  calendar,
  stepsform,
  trackerform;
let sections;

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
      //RENDER PAGINATION MUST BE INOVOKE PRIOR TO TABLE
      renderPagination();
      renderTable();
      renderFilter();
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
        onok: (el) => {
          console.log(el);
        },
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
        onok: (el) => {
          let data = {};

          el.querySelectorAll("input").forEach(
            (input) => (data[input.name] = input.value)
          );

          submitSteps({
            data: data,
            id: config.STEPS_ID,
          });
        },
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
};

// TABLE
const renderTable = () => {
  table = new Table({
    container: sections[1],
    username: model.state.username,
    team: model.state.team,
    data: model.state.table,
    callbackPagination: (params) => {
      pagination.render(params);
    },
    callbackFilter: (boolean) => {
      filter.reset(boolean);
    },
  });
};

// RENDER FILTER
const renderFilter = () => {
  filter = new Filter((str) => {
    table.filter(str);
  }, sections[1]);
};
// RENDER PAGINATION
const renderPagination = () => {
  pagination = new Pagination(sections[1], (e) => {
    table.page(e.target.value);
  });
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

const submitSteps = async (params) => {
  try {
    spinner.render();
    await model.submitStepData(params);

    dashboard.update(model.state.dashboard);
    table.refresh(model.state.table);
  } catch (error) {
    alert(error.message);
  } finally {
    spinner.remove();
  }
};
