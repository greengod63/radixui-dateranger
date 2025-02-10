import React from "react";
import { styled, keyframes } from "../theme";

const bounce = keyframes({
  to: {
    opacity: 0.3,
    transform: "translate3d(0, 20px, 0)",
  },
});

const Circle = styled("div", {
  size: "20px",
  m: "$1",
  backgroundColor: "$teal4",
  br: "$round",
  animation: `${bounce} 900ms infinite alternate`,
  "&:nth-child(2)": {
    animationDelay: "300ms",
  },
  "&:nth-child(3)": {
    animationDelay: "600ms",
  },
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const Loader = ({ css = {}, circleCSS = {}, data, content }) => {
  if (data) {
    return content();
  }

  return (
    <Container css={css}>
      <Circle css={circleCSS} />
      <Circle css={circleCSS} />
      <Circle css={circleCSS} />
    </Container>
  );
};

export default Loader;
