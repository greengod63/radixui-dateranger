import React from "react";
import { styled } from "../theme/index";

const IconRaw = ({ icon, className = null, onClick = null  }) => {
  return React.createElement(icon, { className, onClick });
};

const Icon = styled(IconRaw, {
  fontSize: "120%",
  // top: "15%",
  // color: "red",
  position: "relative",
  "& path": {
    stroke: "currentColor",
  },
  "& polygon": {
    stroke: "currentColor",
  },
});

export default Icon;

// import React from "react";
// import { styled } from "../theme/index";

// const IconRaw = ({ icon, className = null, onClick = null }) => {
//   return React.createElement(icon, { className, onClick });
// };

// const Icon = styled(IconRaw, {
//   fontSize: "120%",
//   position: "relative",
//   "& path": {
//     stroke: "currentColor",
//   },
//   "& polygon": {
//     stroke: "currentColor",
//   },
// });

// export default Icon;
