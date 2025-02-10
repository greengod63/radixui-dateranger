import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { HStack, VStack, NoData, Box } from "../../components";
import GraphKey from "../shared/GraphKey";
import colours from "../../theme/colours";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent,
]);

const ScoreBarChart = ({ scores, keyLabel }) => {
  const labels = [];
  const values = [];
  const previous = [];

  let previousLabel = null;
  if (scores.length > 1) {
    previousLabel = "Previous Month";
    if (scores[0].data.previous.length >= 12) {
      previousLabel = "Previous Year";
    }
  }

  scores.forEach((tp) => {
    labels.push(tp.label);
    values.push(tp.score);
    previous.push(tp.previousScore);
  });

  if (values.length === 0) {
    return <NoData />;
  }

  return (
    <VStack css={{ flex: "1" }}>
      <BarGraph labels={labels} values={values} previous={previous} />
      <HStack css={{ ml: "$4", mt: "$4", gap: "$3" }}>
        <GraphKey.Rectangle color={colours.ppForest} label={keyLabel} />
        {previousLabel && (
          <GraphKey.Rectangle
            color={colours.greys.grey1}
            label={previousLabel}
          />
        )}
      </HStack>
    </VStack>
  );
};

const BarGraph = ({ labels, values, previous }) => {
  var option = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "0%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: labels,
    },
    series: [
      {
        type: "bar",
        data: values,
        barWidth: 4,
        itemStyle: {
          color: colours.ppForest,
        },
      },
      {
        type: "bar",
        data: previous,
        barWidth: 4,
        itemStyle: {
          color: colours.greys.grey1,
        },
      },
    ],
  };

  return (
    <Box
      css={{
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
      }}
    >
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: "100%", height: "90%" }}
      />
    </Box>
  );
};

export default ScoreBarChart;
