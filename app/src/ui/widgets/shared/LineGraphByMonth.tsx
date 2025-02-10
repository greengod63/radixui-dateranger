import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  MarkAreaComponent,
} from "echarts/components";
import GraphKey from "../shared/GraphKey";
import GraphTooltip from "../shared/GraphTooltip";
import { MONTHS_FULL } from "../../../utils";

import { MONTHS } from "../../../utils";
import { NoData, HStack } from "../../components";
import colours from "../../theme/colours";
const { teals } = colours;

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LegendComponent,
  MarkAreaComponent,
]);

const generateMarkArea = (percentiles) => {
  if (!percentiles) {
    return null;
  }

  const markArea = {
    silent: true,

    data: percentiles.map((p) => {
      return [
        {
          yAxis: p.from,
          itemStyle: {
            color: p.colour,
          },
          label: {
            position: "insideBottomRight",
            color: colours.greys.grey1,
            formatter: (d) => {
              return p.label;
            },
          },
        },
        {
          yAxis: p.to,
          itemStyle: {
            color: p.colour,
          },
        },
      ];
    }),
  };
  return markArea;
};

const LineGraphByMonth = ({
  data,
  percentiles = null,
  tooltipFormatter = null,
}) => {
  if (!data || !data.current || data.current.length === 0) {
    return <NoData />;
  }

  let labelDef = data.current;
  if (data.previous && data.previous.length > data.current.length) {
    labelDef = data.previous;
  }

  const labels = labelDef.map(({ date }) => {
    return `${MONTHS[date.getMonth()]} ${String(date.getFullYear())}`;
  });

  const option = {
    grid: {
      left: 30,
      top: 20,
      right: 0,
      bottom: 20,
    },
    xAxis: {
      type: "category",
      data: labels,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      formatter: (params) => {
        if (typeof tooltipFormatter === "function") {
          return tooltipFormatter({
            current: data.current[params.dataIndex],
            previous: data.previous[params.dataIndex],
          });
        }
        return null;
      },
      borderColor: "#FFFFFF",
    },
    series: [
      {
        data: data.current.map(({ value }) => value),
        type: "line",
        symbolSize: 6,
        color: colours.ppForest,
        markArea: generateMarkArea(percentiles),
      },
      {
        data: data.previous.map(({ value }) => value),
        type: "line",
        symbolSize: 6,
        color: colours.greys.grey1,
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={false}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const percentileHelper = (v1, v2, v3, v4) => {
  return [
    {
      from: v1,
      to: v2,
      label: "Bottom 25%",
      colour: teals.teal0,
    },
    {
      from: v2,
      to: v3,
      label: "Middle 50%",
      colour: teals.teal1,
    },
    {
      from: v3,
      to: v4,
      label: "Top 25%",
      colour: teals.teal3,
    },
  ];
};

const tooltipHelper = (title) => {
  return (dataPoint) => {
    const items = [];
    if (dataPoint.current?.value !== undefined) {
      const d = dataPoint.current.date;
      const label = `${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
      items.push({
        label: <GraphKey.Circle color={colours.ppForest} label={label} />,
        value: dataPoint.current.value.toFixed(1),
      });
    }

    if (dataPoint.previous?.value !== undefined) {
      const d = dataPoint.previous.date;
      const label = `${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
      items.push({
        label: <GraphKey.Circle color={colours.greys.grey1} label={label} />,
        value: dataPoint.previous.value.toFixed(1),
      });
    }

    return renderToStaticMarkup(
      <GraphTooltip
        title={title}
        items={[
          ...items,
          {
            label: (
              <GraphKey.Rectangle
                color={colours.teals.teal3}
                label="Industry Benchmark"
              />
            ),
            value: 45.0,
          },
        ]}
      />
    );
  };
};

const Key = ({ label }) => {
  return (
    <HStack css={{ ml: "$4", mt: "$4", gap: "$3" }}>
      <GraphKey.Circle color={colours.ppForest} label={label} />
      <GraphKey.Circle color={colours.greys.grey1} label="Previous Year" />
      <GraphKey.Rectangle
        color={colours.teals.teal3}
        label="Industry Benchmark"
      />
    </HStack>
  );
};

LineGraphByMonth.percentileHelper = percentileHelper;
LineGraphByMonth.tooltipHelper = tooltipHelper;
LineGraphByMonth.Key = Key;

export default LineGraphByMonth;
