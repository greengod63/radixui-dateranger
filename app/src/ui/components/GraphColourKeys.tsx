import React from "react";
import { HStack, Text } from "./index";
import { styled } from "../theme";

const ColourKeys = ({ keys, css }) => {
  return (
    <HStack css={css}>
      {keys.map((k, index) => {
        return (
          <HStack key={index} css={{ mr: "$2" }}>
            <Circle colour={k.colour} />
            <Text.Small>{k.label}</Text.Small>
          </HStack>
        );
      })}
    </HStack>
  );
};

const size = "12px";

const CircleElement = styled("div", {
  display: "block",
  width: size,
  height: size,
  mr: "$1",
  borderRadius: "100%",
  mt: "2px",
});

const Circle = ({ colour }) => {
  return <CircleElement css={{ backgroundColor: colour }} />;
};

export default ColourKeys;
