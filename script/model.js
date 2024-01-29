"use strict";

export let state = {
  username: "",
  password: "",
  date: "",
  now: "",
  coach: "",
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
};

export const loadData = async function (params) {
  state.username = params.data.username;
  state.password = params.data.password;
  state.now = mediumDateFormat.format(new Date());
  state.date = shortDateFormat.format(new Date());

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
    state = {};
    state = data.data;

    // ARRANGE DATA IF THERE ARE STEPS RECORD
    if (state.steps.length !== 0) {
      state.userData.steps = getUserData(state.steps);
      state.userData.tracker = getUserData(state.tracker);
      // state.participants.steps = getParticipantsData(state.steps);

      // PROCESS TABLE DATA
      // HARDCODED BECAUSE TOO MUCH KEYS TO REMOVE FROM ORIGINAL OBJECT
      state.table.header = ["Rank", "Username", "Total Steps", "Coach"];
      state.table.rows = getTableRows(state.steps);
    }

    //PROCESS DATA FOR DASHBOARD IF USER HAS STEPS RECORDS
    if (state.userData.steps.length) {
      state.dashboard.count = state.participants.names.length;
      state.dashboard.steps = getStepsToday();
      state.dashboard.totSteps = computeTotSteps("steps");
      state.dashboard.avgSteps = computeAvgSteps("totSteps");
      state.dashboard.totMinutes = computeTotSteps("minutes");
      state.dashboard.avgMinutes = computeAvgSteps("totMinutes");
      state.dashboard.rank = state.table.rows.find(
        (row) => row[1] == state.username
      )[0];
    }

    //PROCESS DATA FOR CALENDAR DATA IF USER HAS TRACKER RECORDS
    //CALENDAR MODULE MATCHES DATE USING TIME FORMAT
    if (state.userData.tracker.length) {
      state.calendar = getCalendarDates();
      console.log("calendar");
    }
    localStorage.setItem("state", JSON.stringify(state));
  } catch (error) {
    throw Error(error);
  }
};

export const clearItem = () => {
  console.log("logout");
  localStorage.removeItem("state");
};

export const isLoggedIn = () => {
  if (JSON.parse(localStorage.getItem("state"))) {
    state = JSON.parse(localStorage.getItem("state"));
    state.table.rows = getTableRows(state.steps);
    console.log(state.userData.tracker);
    return true;
  }
};

const shortDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
});

const mediumDateFormat = new Intl.DateTimeFormat("en-US", {
  timeStyle: "medium",
  dateStyle: "short",
});

const getUserData = (arr) => {
  return arr.filter((datum) => datum.username == state.username);
};

// TABLE DATA FUNCTION
const getTableRows = (data) => {
  // GET THE USERNAME, COACH AND SUM OF THE TOTAL STEPS  OF EACH PARTICIPANT
  let tableRow = state.participants.names.map((datumA) => {
    // GET ALL RECORDS OF USER
    let records = data.filter((datumB) => datumA.name === datumB.username);
    return [
      datumA.name,
      records?.reduce((tot, acc) => (tot += acc.steps), 0),
      datumA.coach,
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
const getStepsToday = () => {
  const result = state.userData.steps.find((datum) => {
    if (shortDateFormat.format(new Date(datum.date)) == state.date)
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
    "completed my steps and joined or workout",
    "won't able to do either",
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

  console.log(test);
};
