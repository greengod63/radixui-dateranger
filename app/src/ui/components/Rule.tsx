import { styled } from "../theme";

const VRule = styled("span", {
  width: "1px",
  backgroundColor: "$lowContrast",
  display: "block",
});

const HRule = styled("hr", {
  border: "none",
  height: "1px",
  backgroundColor: "$lowContrast",
});

export { HRule, VRule };
