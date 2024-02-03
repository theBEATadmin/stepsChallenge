import * as config from "./config.js";

export const standardDateFormat = new Intl.DateTimeFormat("en-US", {
  timeStyle: "medium",
  dateStyle: "short",
});

export const shortDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
});

export const standardNumberFormat = new Intl.NumberFormat("en-US");

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const toCamelCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const countDays = () =>
  Math.ceil(
    Math.abs(config.DATE_TODAY - config.START_DATE) / (1000 * 60 * 60 * 24)
  );

export const countWeeks = () =>
  Math.ceil(
    Math.abs(config.DATE_TODAY - config.START_DATE) / (1000 * 60 * 60 * 24) / 7
  );
