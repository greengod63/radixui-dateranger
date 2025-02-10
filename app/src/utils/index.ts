import rand from "./rand";

const sleep = (millis: number) => {
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
};

const setValues = (target, vals) => {
  for (const key in vals) {
    target[key] = vals[key];
  }
};

const trimChars = (s, char) => {
  return trimFront(trimBack(s, char), char);
};

const trimFront = (s, char) => {
  while (s.charAt(0) === char) {
    s = s.substr(1);
  }
  return s;
};

const trimBack = (s, char) => {
  while (s.charAt(s.length - 1) === char) {
    s = s.substr(0, s.length - 1);
  }
  return s;
};

const between = (value, min, max, inclusive = false) => {
  if (inclusive) {
    return min <= value && value <= max;
  }
  return min < value && value < max;
};

const doTimes = (number, callback) => {
  let arr = [];
  for (var i = 0; i < number; i++) {
    arr.push(callback(i));
  }
  return arr;
};

const getDefaultTimeRange = () => {
  const prevMonth = new Date();
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  const from = new Date(prevMonth.getFullYear() - 1, prevMonth.getMonth(), 1);
  const to = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);

  return { from, to };
};

const previousYearRange = (range) => {
  const from = new Date(
    range.from.getFullYear() - 1,
    range.from.getMonth(),
    range.from.getDate()
  );
  const to = new Date(
    range.to.getFullYear() - 1,
    range.to.getMonth(),
    range.to.getDate()
  );
  return { from, to };
};

const calculateQuarterDates = (startPoint: Date = null) => {
  if (!startPoint) {
    startPoint = new Date();
  }
  const quarter = Math.floor(startPoint.getMonth() / 3);
  if (quarter === 0) {
    const from = new Date(startPoint.getFullYear() - 1, 9, 1);
    const to = new Date(startPoint.getFullYear() - 1, 11, 31);
    return { from, to };
  } else {
    const from = new Date(startPoint.getFullYear(), (quarter - 1) * 3, 1);
    const to = new Date(startPoint.getFullYear(), quarter * 3, 0);
    return { from, to };
  }
};

const lastXDaysToDates = (days: number) => {
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  return { from, to };
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date: Date) => {
  return (
    date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear()
  );
};

// By Takao
const formatAllNumberDate = (date: Date) => {
  return (
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear()
  );
};

export {
  sleep,
  setValues,
  rand,
  trimChars,
  trimFront,
  trimBack,
  between,
  doTimes,
  MONTHS,
  MONTHS_FULL,
  getDefaultTimeRange,
  previousYearRange,
  calculateQuarterDates,
  lastXDaysToDates,
  formatDate,
  formatAllNumberDate, // By Takao
};
