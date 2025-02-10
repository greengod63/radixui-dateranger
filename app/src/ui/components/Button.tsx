import React from "react";
import { styled } from "../theme";
import { HStack } from "./Stack";

const Button: any = styled("button", {
  p: "$1",
  px: "$2",
  color: "$ppForest",
  backgroundColor: "$background",
  border: "1px solid $ppForest",
  cursor: "pointer",
  "&[disabled]": {
    border: "1px solid $lowContrast",
    color: "$grey2",
    hoverBackground: "$background",
  },
});

const PrimaryButton = styled(Button, {
  backgroundColor: "$ppForest",
  color: "$grey0",
});

Button.Primary = PrimaryButton;

Button.Set = ({ children, css = {} }) => {
  return (
    <HStack
      css={{ justifyContent: "right", my: "$2", columnGap: "$1", ...css }}
    >
      {children}
    </HStack>
  );
};

Button.Link = styled(Button, {
  border: "none",
  p: "0",
  "&:hover": { textDecoration: "underline" },
});

export default Button;
