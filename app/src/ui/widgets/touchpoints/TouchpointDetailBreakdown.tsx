import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import GraphTooltip from "../shared/GraphTooltip";
import { Panel, VStack, Loader } from "../../components";
import WidgetPanel from "../shared/WidgetPanel";
import { ComponentSwitch } from "../../utils";
import { doTimes } from "../../../utils";
import Icons from "../../app/Icons";
import GraphKey from "../shared/GraphKey";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, CustomChart } from "echarts/charts";
import colours from "../../theme/colours";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  MarkAreaComponent,
} from "echarts/components";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CustomChart,
  CanvasRenderer,
  LegendComponent,
  MarkAreaComponent,
]);

const BREAKDOWN = "BREAKDOWN";
const NET_AGREEMENT = "NET_AGREEMENT";

const TouchpointDetailBreakdown = ({ touchpoint, detail }) => {
  const [activeView, setActiveView] = React.useState(BREAKDOWN);

  return (
    <WidgetPanel
      title={`${touchpoint.label} Detail ${
        activeView === BREAKDOWN ? "Breakdown" : "Net Agreement"
      }`}
      actions={
        <Panel.Actions>
          <Panel.ActionButton
            onClick={() => setActiveView(BREAKDOWN)}
            icon={Icons.BarGraph}
          />
          <Panel.ActionButton
            onClick={() => setActiveView(NET_AGREEMENT)}
            icon={Icons.Smile}
          />
        </Panel.Actions>
      }
    >
      <Loader
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={detail}
        content={() => {
          return (
            <ComponentSwitch
              tests={[
                () => activeView === BREAKDOWN && <Breakdown detail={detail} />,
                () =>
                  activeView === NET_AGREEMENT && (
                    <NetAgreement detail={detail} />
                  ),
              ]}
            />
          );
        }}
      />
    </WidgetPanel>
  );
};

const convert = ({ x1, x2, y, length }, box) => {
  const wm = box.width / 200;
  const totalHeight = box.height / length;
  const dh = totalHeight / 3;
  const x = (x1 + 100) * wm;
  const width = (x2 - x1) * wm;
  return {
    x: x + box.x,
    y: y * totalHeight + box.y + dh,
    width,
    height: dh,
  };
};

const Breakdown = ({ detail }) => {
  const labels = [];
  detail = detail.reverse();
  detail.forEach((d) => {
    labels.push(d.shortLabel);
  });

  const cols = [
    colours.agreeColours.stronglyDisagree,
    colours.agreeColours.disagree,
    colours.agreeColours.neutral,
    colours.agreeColours.agree,
    colours.agreeColours.stronglyAgree,
  ];

  const labelCols = [
    colours.greys.grey0,
    colours.greys.grey0,
    colours.ppForest,
    colours.ppForest,
    colours.greys.grey0,
  ];

  const option = {
    tooltip: {
      formatter: (params) => {
        return detail[params.dataIndex].label;
      },
      borderWidth: 0,
    },
    grid: {
      left: "0%",
      right: "2%",
      bottom: "0%",
      top: "0%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        min: -100,
        max: 100,
        interval: 25,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: colours.greys.grey2,
          },
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: labels,
      },
    ],
    series: [
      {
        name: "Agreement Breakdown",
        type: "custom",
        data: detail,
        tooltip: {
          formatter: (params) => {
            let values = detail[params.dataIndex].breakdown;
            values = [
              {
                label: "Strongly Agree",
                data: values.stronglyAgree,
              },
              {
                label: "Agree",
                data: values.agree,
              },
              {
                label: "Neutral",
                data: values.neutral,
              },
              {
                label: "Disagree",
                data: values.disagree,
              },
              {
                label: "Strongly Disagree",
                data: values.stronglyDisagree,
              },
            ];

            values.forEach((v) => {
              v.change = v.data.change;
              v.value = `${Math.round(v.data.value * 100)}%`;
            });

            return renderToStaticMarkup(
              <GraphTooltip title="Agreement Breakdown" items={values} />
            );
          },
          borderColor: "#FFFFFF",
        },
        renderItem: (params, api) => {
          const index = params.dataIndex;
          const value = detail[index];

          const { stronglyDisagree, disagree, neutral, agree, stronglyAgree } =
            value.breakdown;

          const n2 = neutral.value / 2;

          const xPoints = [
            -stronglyDisagree.value - disagree.value - n2,
            -disagree.value - n2,
            -n2,
            n2,
            agree.value + n2,
            agree.value + stronglyAgree.value + n2,
          ].map((v) => v * 100);

          const values = [
            stronglyDisagree.value,
            disagree.value,
            neutral.value,
            agree.value,
            stronglyAgree.value,
          ];

          const rectangle = (i) => {
            const rect = convert(
              {
                x1: xPoints[i],
                x2: xPoints[i + 1],
                y: detail.length - index - 1,
                length: detail.length,
              },
              params.coordSys
            );
            return {
              type: "group",
              children: [
                {
                  type: "rect",
                  shape: rect,
                  style: {
                    fill: cols[i],
                  },
                },
                {
                  type: "text",
                  x: rect.x + rect.width / 2 - 12,
                  y: rect.y + rect.height / 2 - 6,
                  invisible: rect.width < 20,
                  style: {
                    fill: labelCols[i],
                    text: `${Math.round(values[i] * 100)}%`,
                  },
                },
              ],
            };
          };

          return {
            type: "group",
            children: doTimes(5, rectangle),
          };
        },
      },
    ],
  };

  return (
    <VStack css={{ width: "100%", height: "100%", gap: "$3" }}>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={false}
        style={{ width: "100%", height: "90%" }}
      />
      <GraphKey.Set
        css={{ gap: "$4" }}
        keys={[
          {
            label: "Strongly Disagree",
            color: colours.agreeColours.stronglyDisagree,
          },
          { label: "Disagree", color: colours.agreeColours.disagree },
          { label: "Neutral", color: colours.agreeColours.neutral },
          { label: "Agree", color: colours.agreeColours.agree },
          {
            label: "Strongly Agree",
            color: colours.agreeColours.stronglyAgree,
          },
        ]}
      />
    </VStack>
  );
};

const NetAgreement = ({ detail }) => {
  const labels = [];
  detail.reverse().forEach((d) => {
    labels.push(d.shortLabel);
  });

  const option = {
    grid: {
      left: "0%",
      right: "2%",
      bottom: "0%",
      top: "0%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        min: -100,
        max: 100,
        interval: 25,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: colours.greys.grey2,
          },
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: labels,
      },
    ],
    series: [
      {
        name: "Net Agreement",
        type: "custom",
        data: detail,
        renderItem: (params, api) => {
          const index = params.dataIndex;
          const value = detail[index];

          const box = params.coordSys;
          const wm = box.width / 200;
          const totalHeight = box.height / detail.length;
          const h = totalHeight / 9;

          const currentV = value.netAgreement.agreement;
          const currentChange = value.netAgreement.change * 100;
          const currentW = currentV * wm;
          const currentX = 100 * wm + box.x;
          const currentY =
            box.y + (detail.length - index - 1) * totalHeight + h * 3;
          let textX = currentX + currentW + (currentV > 0 ? -30 : 0);

          if (Math.abs(currentV) < 10) {
            textX += currentV > 0 ? 40 : -60;
          }

          return {
            type: "group",
            children: [
              {
                type: "rect",
                shape: {
                  x: currentX,
                  y: currentY,
                  width: currentW,
                  height: h,
                },
                style: {
                  fill: colours.ppForest,
                },
              },
              {
                type: "rect",
                shape: {
                  x: 100 * wm + box.x,
                  y: box.y + index * totalHeight + h * 5,
                  width: value.netAgreement.previousAgreement * wm,
                  height: h,
                },
                style: {
                  fill: colours.greys.grey1,
                },
              },
              {
                type: "text",
                x: textX,
                y: currentY - 15,
                style: {
                  fill: colours.ppForest,
                  text: `${Math.round(currentV)}%`,
                },
              },
              {
                type: "text",
                x: textX + 35,
                y: currentY - 15,
                style: {
                  fill:
                    currentChange < 0
                      ? colours.graphColours.negativeRed
                      : colours.graphColours.positiveGreen,
                  text: `${currentChange < 0 ? "↓" : "↑"} ${Math.round(
                    Math.abs(currentChange)
                  )}%`,
                },
              },
            ],
          };
        },
      },
    ],
  };

  return (
    <VStack css={{ width: "100%", height: "100%", gap: "$3" }}>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={false}
        style={{ width: "100%", height: "90%" }}
      />
      <GraphKey.Set
        css={{ gap: "$4" }}
        keys={[
          {
            label: "Net Agreement",
            color: colours.ppForest,
          },
          { label: "Previous Period", color: colours.greys.grey1 },
        ]}
      />
    </VStack>
  );
};

export default TouchpointDetailBreakdown;
