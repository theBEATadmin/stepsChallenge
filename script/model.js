"use strict";

import * as utils from "./utils.js";
import * as config from "./config.js";

export let state = {
  username: "",
  password: "",
  date: "",
  now: "",
  team: "",
  steps: [],
  tracker: [],
  userData: {
    steps: [],
    tracker: [],
  },
  participants: {
    steps: [],
  },
  dashboard: {
    steps: 0,
    avgSteps: 0,
    totSteps: 0,
    avgMinutes: 0,
    totMinutes: 0,
    rank: 0,
    count: 0,
  },
  table: {
    header: [],
    rows: [],
  },
  calendar: [],
  attachment: "",
};

export const loadData = async function (params) {
  resetObject(params);

  let formData = new FormData();
  formData.append("data", JSON.stringify(state));

  try {
    const response = await fetch(
      `https://script.google.com/macros/s/${params.id}/exec`,
      { method: "POST", body: formData }
    );
    const data = await response.json();

    if (data.result == "failed") {
      throw Error(data.message);
    }
    state = data.data;

    // HARDCODED BECAUSE TOO MUCH KEYS TO REMOVE FROM ORIGINAL OBJECT
    arrangeTableData();

    // ARRANGE DATA IF THERE ARE STEPS RECORD
    if (state.steps.length !== 0) {
      // state.participants.steps = getParticipantsData(state.steps);
      // PROCESS TABLE DATA
      processUserData();
    }

    //PROCESS DATA FOR DASHBOARD IF USER HAS STEPS RECORDS
    if (state.userData.steps.length != 0) {
      processDashboardData();
    }

    //PROCESS DATA FOR CALENDAR DATA IF USER HAS TRACKER RECORDS
    //CALENDAR MODULE MATCHES DATE USING TIME FORMAT
    if (state.userData.tracker.length !== 0) {
      state.calendar = getCalendarDates();
    }

    localStorage.setItem("params", JSON.stringify(params));
  } catch (error) {
    throw Error(error);
  }
};

export const submitStepData = async function (params) {
  const stepsData = {
    username: state.username,
    registration: state.registration,
    now: utils.standardDateFormat.format(config.DATE_TODAY),
    date: utils.shortDateFormat.format(config.DATE_TODAY),
    attachment: params.data.attachment,
    steps: params.data.steps,
    minutes: params.data.minutes,
    team: state.team,
  };

  let formData = new FormData();
  formData.append("data", JSON.stringify(stepsData));

  try {
    const response = await fetch(
      `https://script.google.com/macros/s/${params.id}/exec`,
      { method: "POST", body: formData }
    );

    const data = await response.json();

    if (data.result == "failed") {
      throw Error(data.message);
    }

    state.steps = data.data;
    // HARDCODED BECAUSE TOO MUCH KEYS TO REMOVE FROM ORIGINAL OBJECT
    arrangeTableData();

    // ARRANGE DATA IF THERE ARE STEPS RECORD
    if (state.steps.length !== 0) {
      // state.participants.steps = getParticipantsData(state.steps);
      // PROCESS TABLE DATA
      processUserData();
    }

    //PROCESS DATA FOR DASHBOARD IF USER HAS STEPS RECORDS
    if (state.userData.steps.length != 0) {
      processDashboardData();
    }
  } catch (error) {
    console.log("model error");
    throw Error(error);
  }
};

export const submitTrackerData = async function (params) {
  const trackerData = {
    username: state.username,
    registration: state.registration,
    now: utils.standardDateFormat.format(config.DATE_TODAY),
    date: utils.shortDateFormat.format(config.DATE_TODAY),
    activity: params.data.activity,
    rating: params.data.rating,
    team: state.team,
  };

  let formData = new FormData();
  formData.append("data", JSON.stringify(trackerData));

  try {
    const response = await fetch(
      `https://script.google.com/macros/s/${params.id}/exec`,
      { method: "POST", body: formData }
    );
    const data = await response.json();

    if (data.result == "failed") {
      throw Error(data.message);
    }

    state.tracker = data.data;
    state.userData.tracker = getUserData(state.tracker);
    //PROCESS DATA FOR CALENDAR DATA IF USER HAS TRACKER RECORDS
    //CALENDAR MODULE MATCHES DATE USING TIME FORMAT
    if (state.userData.tracker.length) {
      state.calendar = getCalendarDates();
    }
  } catch (error) {
    throw Error(error);
  }
};

export const clearItem = () => {
  localStorage.removeItem("params");
};

export const isLoggedIn = () => {
  if (JSON.parse(localStorage.getItem("params"))) {
    return JSON.parse(localStorage.getItem("params"));
  }
};

// CLEAR OBJECT
const resetObject = (params) => {
  state = {
    username: params.data.username,
    registration: params.data.registration,
    date: utils.shortDateFormat.format(config.DATE_TODAY),
    now: utils.standardDateFormat.format(config.DATE_TODAY),
    team: "",
    steps: [],
    tracker: [],
    userData: {
      steps: [],
      tracker: [],
    },
    participants: {
      steps: [],
    },
    dashboard: {
      steps: 0,
      avgSteps: 0,
      totSteps: 0,
      avgMinutes: 0,
      totMinutes: 0,
      rank: 0,
      count: 0,
    },
    table: {
      header: [],
      rows: [],
    },
    calendar: [],
    attachment: "",
  };
};

// USER DATA FUNCTION
const processUserData = () => {
  state.userData.steps = getUserData(state.steps);
  state.userData.tracker = getUserData(state.tracker);
};

const getUserData = (arr) => {
  return arr.filter((datum) => datum.username == state.username);
};

// TABLE DATA FUNCTION
const arrangeTableData = () => {
  // HARDCODED BECAUSE TOO MUCH KEYS TO REMOVE FROM ORIGINAL OBJECT
  state.table.header = ["Rank", "Username", "Total Steps", "Team"];
  state.table.rows = getTableRows(state.steps);
};

const getTableRows = (data) => {
  // GET THE USERNAME, team AND SUM OF THE TOTAL STEPS  OF EACH PARTICIPANT
  let tableRow = utils
    .deepCopy(state.participants.names)
    .map((datumA, index) => {
      let records = [];
      records = data.filter((datumB) => datumA.name === datumB.username);
      console.log(records);
      return [
        datumA.name,
        records.length == 0
          ? 0
          : records.reduce((total, record) => total + record.steps, 0),
        datumA.team,
      ];
    });

  //SORT BY NAME FIRST TO BREAK THE TIE
  tableRow.sort((a, b) => {
    const nameA = a[0].toUpperCase(); // ignore upper and lowercase
    const nameB = b[0].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  // CREATE A UNIQE SET OF VALUES OF STEPS
  let ranks = [...new Set(tableRow.map((datum) => datum[1]))];
  ranks.sort((a, b) => b - a);

  // ADD RANKING FOR EACH USERNAME
  tableRow.forEach((datum) =>
    datum.unshift(ranks.findIndex((rank) => rank == datum[1]) + 1)
  );

  // SORT DATA BY RANKING
  tableRow.sort((a, b) => a[0] - b[0]);
  return tableRow;
};

// DASHBOARD DATA FUNCTIONS
const processDashboardData = () => {
  state.dashboard.count = state.participants.names.length;
  state.dashboard.steps = getStepsToday();
  state.dashboard.totSteps = computeTotSteps("steps");
  state.dashboard.avgSteps = computeAvgSteps("totSteps");
  state.dashboard.totMinutes = computeTotSteps("minutes");
  state.dashboard.avgMinutes = computeAvgSteps("totMinutes");
  state.dashboard.rank = state.table.rows.find(
    (row) => row[1] == state.username
  )[0];
};

const getStepsToday = () => {
  const result = state.userData.steps.find((datum) => {
    if (utils.shortDateFormat.format(new Date(datum.date)) == state.date)
      return datum;
  });

  return result ? parseInt(result.steps) : "-";
};

const computeTotSteps = (str) => {
  if (state.userData.steps.length == 0) return "-";

  return state.userData.steps.reduce((tot, acc) => (tot += acc[str]), 0);
};

const computeAvgSteps = (str) => {
  if (state.userData.steps.length == 0 || isNaN(state.dashboard[str]))
    return "-";
  return state.dashboard[str] / state.userData.steps.length;
};

// CALENDAR DATA FUNCTION
const getCalendarDates = () => {
  const stringToTime = (str) => {
    const date = new Date(str);
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    ).getTime();
  };
  const responses = [
    "completed my steps",
    "joined a class or a workout",
    "completed my steps and joined a class or a workout",
    "wasn't able to do either",
  ];

  return state.userData.tracker.map((datum) => {
    return {
      date: stringToTime(datum.date),
      responseIndex: responses.findIndex(
        (response) =>
          response.toLocaleLowerCase().replace(/\s/, "") ==
          datum.activity.toLocaleLowerCase().replace(/\s/, "")
      ),
    };
  });
};
