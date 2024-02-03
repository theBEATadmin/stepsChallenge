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
import ProgressForm from "./views/formprogress.js";
import TrackerForm from "./views/formtracker.js";
import Popup from "./views/popupview.js";

let login,
  spinner,
  main,
  menu,
  dashboard,
  filter,
  pagination,
  table,
  calendar,
  progress,
  popup,
  tracker;
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

// PROGRESS FORM

const initProgress = () => {
  progress = new ProgressForm({
    username: model.state.username,
    data: model.state.userData.steps,
    submitCallback: (data) => {
      let params = {
        data: data,
        id: config.STEPS_ID,
      };

      submitSteps(params);
    },
  });
};

const initTracker = () => {
  tracker = new TrackerForm({
    username: model.state.username,
    data: model.state.userData.tracker,
    submitCallback: (data) => {
      let params = {
        data: data,
        id: config.TRACKER_ID,
      };

      submitTracker(params);
    },
  });
};

const initPopup = () => {
  popup = new Popup();
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
      //RENDER PAGINATION MUST BE INOVOKE AFTER TO TABLE
      // renderPagination();
      initProgress();
      initTracker();
      renderTable();
      renderFilter();
      renderCalendar();
      initPopup();
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
      popup.open(
        model.state.username,
        `Progress Dashboard`,
        dashboard.import()
      );
    },

    // FOCUS FORM
    callbackButton2: () => {
      popup.open(model.state.username, `Daily Tracker`, calendar.import());
    },

    callbackButton3: () => {
      tracker.open();
    },

    // STEPS
    callbackButton4: () => {
      progress.open();
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
    callbackPagination: (totalPage) => {
      pagination.newPage(totalPage);
    },
    callbackInit: (totalPage) => {
      renderPagination(totalPage);
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
const renderPagination = (totalPage) => {
  pagination = new Pagination({
    container: sections[1],
    total: totalPage,
    callback: (page) => {
      table.page(page);
    },
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

  let params = model.isLoggedIn();

  if (params) {
    loginAccount(params);
    return;
  }

  renderLogin();
};

document.addEventListener("DOMContentLoaded", init);

const loginAccount = async (params) => {
  try {
    spinner.render();
    await model.loadData(params);

    if (login) login.remove();

    renderMain();
  } catch (error) {
    alert(error.message);
  } finally {
    spinner.remove();
  }
};

const submitSteps = async (params) => {
  try {
    await model.submitStepData(params);

    dashboard.update(model.state.dashboard);
    table.refresh(model.state.table);
    progress.successCallback(true);
    alert("Success! Today's PROGRESS has been recorded");
  } catch (error) {
    errorCallback(error);
  } finally {
  }
};

const submitTracker = async (params) => {
  try {
    await model.submitTrackerData(params);
    calendar.refresh(model.state.calendar);
    tracker.successCallback(true);
    alert("Success! Today's TRACKER has been recorded");
  } catch (error) {
    errorCallback(error);
  } finally {
  }
};
