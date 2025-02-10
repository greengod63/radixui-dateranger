import colors from "./colours";

const navWidth = 250;
const navCollapsedWidth = 80;
const headerHeight = 55;
const subHeaderHeight = 40;
const fullHeaderHeight = headerHeight + subHeaderHeight;

const sizes = {
  0: "0px",
  "10": "12px",
  1: "5px",
  2: "10px",
  3: "15px",
  4: "20px",
  5: "25px",
  6: "30px",
  navWidth: `${navWidth}px`,
  navCollapsedWidth: `${navCollapsedWidth}px`,
  headerHeight: `${headerHeight}px`,
  subHeaderHeight: `${subHeaderHeight}px`,
  fullHeaderHeight: `${fullHeaderHeight}px`,
  subNavWidth: "180px",
  panelHeaderHeight: "60px",
};

const light = {
  space: {
    ...sizes,
  },
  fontSizes: {
    0: "11px",
    1: "13px",
    2: "14px",
    3: "16px",
    4: "20px",
    5: "25px",
    6: "30px",
  },
  fonts: {
    regular: "Prescient320, apple-system, sans-serif",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    "semi-bold": 600,
    bold: 700,
    "extra-bold": 800,
  },
  lineHeights: {
    headerHeight: `${headerHeight}px`,
  },
  letterSpacings: {},
  sizes: {
    full: "100%",
    ...sizes,
  },
  borderWidths: {},
  borderStyles: {
    border: "1px solid $neutral13",
  },
  radii: {
    round: "9999px",
    1: "3px",
    2: "5px",
    3: "7px",
    4: "10px",
  },
  shadows: {
    // shadow: `0px 0px 15px 0px rgb(0, 0, 0, 0.15)`,
    shadow: "0px 3px 6px #00000029",
  },
  zIndices: {},
  transitions: {},
  colors: colors.light,
};

const dark = {
  colors: colors.dark,
  shadows: {
    shadow: `0px 0px 15px 0px #000`,
  },
};

const themes = {
  light,
  dark,
};

export { navWidth, navCollapsedWidth };

export default themes;
