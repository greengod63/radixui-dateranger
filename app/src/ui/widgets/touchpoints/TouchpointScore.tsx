import React from "react";
import { Panel, HStack, VStack, Box, Text, Swatch } from "../../components";
import WidgetPanel from "../shared/WidgetPanel";
import colours from "../../theme/colours";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { GaugeChart } from "echarts/charts";

import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";

import GraphKey from "../shared/GraphKey";
import GraphTooltip from "../shared/GraphTooltip";

import { TimeRangeContext } from "../../utils/GlobalContexts";
import { MONTHS_FULL } from "../../../utils";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GaugeChart,
  CanvasRenderer,
]);

const TouchpointScore = ({ touchpoint }) => {
  const [displayTooltip, setDisplayTooltip] = React.useState(false);

  return (
    <WidgetPanel title={`${touchpoint.label} Score`}>
      <VStack>
        <Box css={{ position: "relative", width: "100%", height: "100%" }}>
          <Box
            css={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "50%",
              marginTop: "-65px",
            }}
          >
            <Text.H2
              css={{
                fontSize: "100px",
                color: colours.ppForest,
                textAlign: "center",
              }}
            >
              {Math.round(touchpoint.score)}
              <Swatch.ScoreChange
                css={{
                  fontSize: "20px",
                  paddingBottom: "18px",
                  display: "inline-block",
                  verticalAlign: "bottom",
                }}
                change={touchpoint.change}
              />
            </Text.H2>
          </Box>
          <div
            style={{ width: "100%", height: "100%" }}
            onMouseOver={() => setDisplayTooltip(true)}
            onMouseOut={() => {
              setDisplayTooltip(false);
            }}
          >
            <GaugeGraph touchpoint={touchpoint} />
            <ToolTip touchpoint={touchpoint} display={displayTooltip} />
          </div>
        </Box>

        <GraphKey.Set
          keys={[
            {
              label: `${touchpoint.label} Score`,
              color: colours.ppForest,
            },
            {
              label: "Previous Period",
              color: colours.greys.grey1,
            },
            {
              label: "Industry Benchmark",
              color: colours.greys.grey15,
            },
          ]}
        />
      </VStack>
    </WidgetPanel>
  );
};

const GaugeGraph = ({ touchpoint }) => {
  const gaugeData = [
    {
      value: touchpoint.score,
      name: `${touchpoint.label} Score`,
      title: {
        show: false,
      },
      detail: {
        show: false,
      },
      itemStyle: {
        color: colours.ppForest,
      },
    },
    {
      value: touchpoint.previousScore,
      name: "Previous Period",
      title: {
        show: false,
      },
      detail: {
        show: false,
      },
      itemStyle: {
        color: colours.greys.grey1,
      },
    },
    {
      value: touchpoint.benchmark,
      name: "Industry Benchmark",
      title: {
        show: false,
      },
      detail: {
        show: false,
      },
      itemStyle: {
        color: colours.greys.grey15,
      },
    },
  ];
  const option = {
    series: [
      {
        type: "gauge",
        radius: "90%",
        min: 0,
        max: 100,
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: false,
          itemStyle: {},
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 40,
            color: [[1, colours.greys.grey0]],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: gaugeData,
        title: {
          show: false,
          fontSize: 14,
        },
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const ToolTip = ({ touchpoint, display = false }) => {
  if (!display) {
    return null;
  }

  const { timeRange } = React.useContext(TimeRangeContext);

  let monthLabel = MONTHS_FULL[timeRange.to.getMonth()];
  const items = [];

  items.push({
    label: (
      <GraphKey.Rectangle
        color={colours.ppForest}
        label={`${touchpoint.label} Score`}
      />
    ),
    value: (
      <>
        {Math.round(touchpoint.score)}
        {/* The below is never displayed, it is just there for spacing */}
        <Text.Tiny css={{ mb: "$1", ml: "$2", color: "transparent" }}>
          10%
        </Text.Tiny>
      </>
    ),
  });
  items.push({
    label: (
      <>
        <GraphKey.Rectangle
          color={colours.greys.grey1}
          label="Previous Period"
        />
      </>
    ),
    value: (
      <>
        {Math.round(touchpoint.previousScore)}
        <Swatch.ScoreChange change={touchpoint.change} />
      </>
    ),
  });
  items.push({
    label: (
      <GraphKey.Rectangle
        color={colours.greys.grey15}
        label="Industry Benchmark"
      />
    ),
    value: (
      <>
        {Math.round(touchpoint.benchmark)}
        <Swatch.ScoreChange change={touchpoint.change} />
      </>
    ),
  });

  return (
    <Panel css={{ position: "absolute", left: "0px", top: "0px" }}>
      <Panel.Content>
        <GraphTooltip css={{ zIndex: 100 }} title={monthLabel} items={items} />
      </Panel.Content>
    </Panel>
  );
};

export default TouchpointScore;
