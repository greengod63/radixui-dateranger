import React from "react";
import { Text, VStack, HStack, Icon } from "../../components";

const GraphTooltip = ({ title = null, items, css = {} }) => {
  return (
    <VStack css={{ gap: "$1", ...css }}>
      {title && <Text.H4 css={{ fontWeight: "$bold" }}>{title}</Text.H4>}
      {items.map((item, i) => {
        return (
          <HStack key={i} css={{ width: "100%", gap: "$3" }}>
            <Text css={{ flex: 1 }}>{item.label}</Text>
            <Text css={{ alignSelf: "end" }}>{item.value}</Text>
            <ChangeIndicator change={item.change} />
          </HStack>
        );
      })}
    </VStack>
  );
};

const ChangeIndicator = ({ change }) => {
  if (isNaN(change)) return null;
  const color = change > 0 ? "$positiveGreen" : "$negativeRed";
  const text = `${change < 0 ? "↓" : "↑"} ${Math.round(change * 100)}%`;
  return <Text css={{ color, alignSelf: "end" }}>{text}</Text>;
};

export default GraphTooltip;
