import React from "react";
import { styled } from "../theme";
import Text from "./Text";

const CharCount = ({ text, min = 0, max, css = {} }) => {
  const length = (text || "").length;
  if (isNaN(max)) {
    const color = length < min ? "$warning" : "$text";
    return <Text.Small css={{ ...css, color }}>({length})</Text.Small>;
  } else {
    const color = length < min ? "$warning" : length > max ? "$alert" : "$text";
    return (
      <Text.Small css={{ ...css, color }}>
        ({length}/{max})
      </Text.Small>
    );
  }
};

export default CharCount;
