import React from "react";
import { styled } from "../theme";

const StyledDiv = styled("div", {
  display: "flex",
});

const Stack = (props) => {
  return (
    <StyledDiv css={props.css} {...props}>
      {props.children}
    </StyledDiv>
  );
};

const VStack = (props) => {
  const css = props.css || {};
  css.flexDirection = "column";
  return (
    <Stack css={css} {...props}>
      {props.children}
    </Stack>
  );
};

const HStack = (props) => {
  const css = props.css || {};
  css.flexDirection = "row";
  return (
    <Stack css={css} {...props}>
      {props.children}
    </Stack>
  );
};
export { Stack, HStack, VStack };
