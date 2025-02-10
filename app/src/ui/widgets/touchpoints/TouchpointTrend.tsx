import React from "react";
import WidgetPanel from "../shared/WidgetPanel";
import TouchpointLineGraph from "./TouchpointLineGraph";

const TouchpointTrend = ({ touchpoint }) => {
  return (
    <WidgetPanel title={`${touchpoint.label} Trend`}>
      <TouchpointLineGraph touchpoint={touchpoint} />
    </WidgetPanel>
  );
};

export default TouchpointTrend;
