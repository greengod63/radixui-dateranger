import React from "react";

import * as RadixSwitch from "@radix-ui/react-switch";
import { blackA } from "@radix-ui/colors";
import { styled } from "../theme";

const SwitchRoot = styled(RadixSwitch.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: blackA.blackA9,
  borderRadius: "9999px",
  position: "relative",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus": { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': {
    backgroundColor: "$primaryAlpha50",
  },
});

const SwitchThumb = styled(RadixSwitch.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: `0 2px 2px ${blackA.blackA7}`,
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': {
    transform: "translateX(19px)",
  },
});

const Switch = (props) => {
  return (
    <SwitchRoot {...props}>
      <SwitchThumb />
    </SwitchRoot>
  );
};

const StyledSwitch = styled(Switch);

export { SwitchRoot, SwitchThumb };

export default StyledSwitch;

// const StyledSwitchRoot = styled(RadixSwitch.Root);
// const StyledSwitcThumb = styled(RadixSwitch.Thumb);

// const Switch = (props) => {
//   return (
//     <StyledSwitchRoot
//       {...props}
//       // checked={true}
//       css={{
//         width: "42px",
//         height: "25px",
//         br: "$round",
//         backgroundColor: "$mediumContrast",
//       }}
//     >
//       <StyledSwitcThumb
//         css={{
//           display: "block",
//           width: "21px",
//           height: "21px",
//           backgroundColor: "white",
//           br: "$round",
//           // box-shadow: 0 2px 2px var(--blackA7);
//           transition: "transform 100ms",
//           transform: "translateX(2px)",
//           willChange: "transform",
//           "&[data-state='checked']": {
//             transform: "translateX(19px)",
//           },
//         }}
//       />
//     </StyledSwitchRoot>
//   );
// };

// export default Switch;
