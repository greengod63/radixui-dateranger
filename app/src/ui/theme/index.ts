import { createStitches, createTheme } from "@stitches/react";
import globalStyleDef from "./global";
import utils from "./utils";

import themes, { navWidth, navCollapsedWidth } from "./themes";

const { styled, globalCss, css, theme, keyframes } = createStitches({
  utils,
  theme: themes.light,
});

const darkTheme = createTheme(themes.dark);
const globalStyles = globalCss(globalStyleDef);

export {
  styled,
  globalCss,
  globalStyles,
  css,
  theme,
  keyframes,
  darkTheme,
  navWidth,
  navCollapsedWidth,
};
