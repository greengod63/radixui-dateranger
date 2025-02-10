const baseColours = {
  neutral0: "#FFF",
  neutral1: "#EEE",
  neutral2: "#DDD",
  neutral3: "#CCC",
  neutral4: "#BBB",
  neutral5: "#AAA",
  neutral6: "#999",
  neutral7: "#888",
  neutral8: "#777",
  neutral9: "#666",
  neutral10: "#555",
  neutral11: "#444",
  neutral12: "#333",
  neutral13: "#222",
  neutral14: "#111",
  neutral15: "#000",
};

const greys = {
  grey0: "rgb(250, 247, 245)",
  grey15: "rgb(218, 241, 236)",
  grey1: "rgb(139, 165, 177)",

  grey2: "#9A9FA5",
  grey3: "#6F7079",
};

const teals = {
  teal0: "rgb( 247, 253, 253)",
  teal1: "rgb( 235, 251, 249)",
  teal2: "rgb( 238, 252, 250)",
  teal3: "rgb( 222, 248, 245)",
  teal4: "rgb( 3, 203, 178)",
};

const brandColours = {
  ppForest: "rgb(8, 64, 89)",
  ppForestContrast: "rgb(156,179,189)",
};

const agreeColours = {
  stronglyDisagree: brandColours.ppForest,
  disagree: "rgb(121, 152, 165)",
  neutral: "rgb(225,232,234)",
  agree: "rgb(179,240,232)",
  stronglyAgree: teals.teal4,
};

const graphColours = {
  positivePassive: "rgb(204, 229, 210)",
  negativePassive: "rgb(253, 205, 206)",
  positive: "rgb(8, 131, 0)",
  negative: "rgb(221, 58, 58)",
  positiveGreen: "#03CCB2",
  negativeRed: "#F2665C",
};

const dualAliases = {
  primary: "rgb(92, 179, 255)",
  lightPrimary: "#21D4FD",
  primaryAlpha50: "#21D4FD99",
  secondary: "#B721FF",
  primaryContrast: "#FFFFFF",
  warning: "#E3620B",
  alert: "#B51212",

  ...greys,
  ...teals,
};

const lightAliases = {
  background: "$neutral0",
  inverse: "$neutral15",
  pageBackground: "$neutral1",
  contrast1: "$neutral1",
  contrast2: "$neutral2",
  minContrast: "$neutral2",
  lowContrast: "$neutral4",
  mediumContrast: "$neutral6",
  highContrast: "$neutral8",
  maxContrast: "$neutral10",
  shadowColor: "#0002",
  text: "$neutral12",
};

const darkAliases = {
  background: "$neutral12",
  inverse: "$neutral0",
  pageBackground: "$neutral1",
  contrast1: "$neutral11",
  minContrast: "$neutral10",
  lowContrast: "$neutral8",
  mediumContrast: "$neutral6",
  highContrast: "$neutral4",
  maxContrast: "$neutral2",
  shadowColor: "$neutral15",
  text: "$neutral2",
};

const colors = {
  graphColours,
  ...brandColours,
  agreeColours,
  greys,
  teals,
  light: {
    ...graphColours,
    ...baseColours,
    ...brandColours,
    ...dualAliases,
    ...lightAliases,
  },
  dark: {
    ...graphColours,
    ...baseColours,
    ...brandColours,
    ...dualAliases,
    ...darkAliases,
  },
};

export default colors;
