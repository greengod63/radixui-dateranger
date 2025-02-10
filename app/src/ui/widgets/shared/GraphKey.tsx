import React from "react";
import { Text, Icon, Box, HStack } from "../../components";
import Icons from "../../app/Icons";

const CirclePoint = ({ color }) => {
  return (
    <Icon
      icon={Icons.CircleEmpty}
      css={{
        mt: "$2",
        mr: "$1",
        color,
        fontSize: "15px",
      }}
    />
  );
};

const Rectangle = ({ color, width = "15px", height = "15px" }) => {
  return (
    <Box
      css={{
        width,
        height,
        backgroundColor: color,
        display: "inline-block",
        mt: "$2",
        mr: "$1",
      }}
    />
  );
};

const CircleGraphKey = ({ color, label }) => {
  return (
    <Text css={{ mr: "$2" }}>
      <CirclePoint color={color} />
      {label}
    </Text>
  );
};

const RectangleGraphKey = ({ color, label }) => {
  return (
    <Text.Small css={{ mr: "$2" }}>
      <Rectangle color={color} />
      {label}
    </Text.Small>
  );
};

const Set = ({ keys, type: Type = GraphKey.Rectangle, css = {} }) => {
  return (
    <HStack css={css}>
      {keys.map(({ color, label }) => {
        return <Type key={color} color={color} label={label} />;
      })}
    </HStack>
  );
};

const GraphKey = {
  Circle: CircleGraphKey,
  CirclePoint,
  Rectangle: RectangleGraphKey,
  Set,
};

export default GraphKey;
