import React from "react";
import { Panel, HStack, VStack } from "../../components";
import colours from "../../theme/colours";

import GraphKey from "../shared/GraphKey";
import LineGraphByMonth from "../shared/LineGraphByMonth";

const TouchpointLineGraph = ({ touchpoint }) => {
  return (
    <VStack css={{ flex: "1", height: "100%" }}>
      <LineGraphByMonth
        data={touchpoint?.data}
        tooltipFormatter={LineGraphByMonth.tooltipHelper(
          `${touchpoint.label} Score`
        )}
        percentiles={LineGraphByMonth.percentileHelper(0, 25, 75, 100)}
      />
      <HStack css={{ ml: "$4", mt: "$4", gap: "$3" }}>
        <GraphKey.Circle
          color={colours.ppForest}
          label={`${touchpoint.label} Score`}
        />
        {touchpoint?.data.previous.length > 0 && (
          <GraphKey.Circle
            color={colours.greys.grey1}
            label="Previous Period"
          />
        )}
        <GraphKey.Rectangle
          color={colours.teals.teal3}
          label="Industry Benchmark"
        />
      </HStack>
    </VStack>
  );
};

export default TouchpointLineGraph;
