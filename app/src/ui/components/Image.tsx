import React from "react";
// import { styled } from "../theme";

const Image = ({ src, alt, width, height }) => {
  return <img src={src} alt={alt} width={width} height={height} />;
};

{
  /* const Icon = styled(IconRaw, {
  "& path": {
    stroke: "currentColor",
  },
  "& polygon": {
    stroke: "currentColor",
  },
}); */
}

export default Image;
