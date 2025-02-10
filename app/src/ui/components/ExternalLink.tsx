import React from "react";
import { styled } from "../theme/index";

const LinkRaw = (props) => {
  const { link, target = "_blank" } = props;
  const StyledA = styled("a", { "&:hover": { color: "$primary" } });
  return (
    <StyledA href={link} target={target}>
      {props.children}
    </StyledA>
  );
};

const Link = styled(LinkRaw);

export default Link;
