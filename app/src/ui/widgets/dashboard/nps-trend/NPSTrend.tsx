import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  MarkAreaComponent,
} from "echarts/components";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent,
  MarkAreaComponent,
]);

import React, { useEffect } from "react";
import {
  Panel,
  VStack,
  Loader,
  Swatch,
  NoData,
  Text,
  Box,
  HStack,
} from "../../../components";
import WidgetPanel from "../../shared/WidgetPanel";
import { ComponentSwitch } from "../../../utils";
import {
  VenueContext,
  TimeRangeContext,
  AccountContext,
} from "../../../utils/GlobalContexts";
import api from "../../../../net/api-service";
import LineGraphByMonth from "../../shared/LineGraphByMonth";
import Icons from "../../../app/Icons";
import GraphKey from "../../shared/GraphKey";
import colours from "../../../theme/colours";
const { teals } = colours;
import { previousYearRange } from "../../../../utils";

const processScore = (dataPoints, prevDataPoints) => {
  let delta = 0;
  let change = 0;
  let score = 0;

  if (dataPoints.length > 1) {
    score = dataPoints[dataPoints.length - 1].Value;
    if (isNaN(score)) {
      score = 0;
    }
    if (dataPoints.length >= 2) {
      let prev = dataPoints[dataPoints.length - 2].Value;
      if (prevDataPoints?.length === 12) {
        prev = prevDataPoints[prevDataPoints.length - 1].Value;
      }
      if (!isNaN(prev)) {
        delta = score - prev;
        change = delta / prev;
      }
    }
  }

  const currentData = dataPoints.map(({ Value, Date: d }, i) => {
    const value = parseFloat(Value);
    return {
      date: new Date(d),
      value,
    };
  });

  const previousData =
    prevDataPoints?.map(({ Value, Date: d }, i) => {
      const value = parseFloat(Value);
      return {
        date: new Date(d),
        value,
      };
    }) || [];

  return {
    delta,
    change,
    score,
    data: {
      current: currentData,
      previous: previousData,
    },
  };
};

const LINE_CHART = "LINE_CHART";
const DONUT_CHART = "DONUT_CHART";

const NPSSummary = () => {
  const { venueId } = React.useContext(VenueContext);
  const { timeRange } = React.useContext(TimeRangeContext);
  const { accountId } = React.useContext(AccountContext);

  const [fullData, setFullData] = React.useState(null);
  const [donutData, setDonutData] = React.useState(null);

  const [activeView, setActiveView] = React.useState(LINE_CHART);

  useEffect(() => {
    const makeCall = async () => {
      const promises = [
        api.nps({
          accountId,
          surveyId: venueId,
          ...timeRange,
        }),
        api.nps({
          accountId,
          surveyId: venueId,
          ...previousYearRange(timeRange),
        }),
      ];

      const res = await Promise.all(promises);
      const result = res[0];
      const previousResult = res[1];

      const npsScore = processScore(
        result.OverallScore.DataPoints,
        previousResult?.OverallScore?.DataPoints
      );

      const data = [
        {
          label: "NPS+ Score",
          ...npsScore,
        },
        {
          label: "Satisfied",
          ...processScore(
            result.SatisfactionScore.DataPoints,
            previousResult?.SatisfactionScore?.DataPoints
          ),
        },
        {
          label: "Exceed",
          ...processScore(
            result.ExceedScore.DataPoints,
            previousResult?.ExceedScore?.DataPoints
          ),
        },
        {
          label: "Loyalty",
          ...processScore(
            result.LoyaltyScore.DataPoints,
            previousResult?.LoyaltyScore?.DataPoints
          ),
        },
        {
          label: "Advocacy",
          ...processScore(
            result.AdvocacyScore.DataPoints,
            previousResult?.AdvocacyScore?.DataPoints
          ),
        },
        {
          label: "Compete",
          ...processScore(
            result.CompetitionScore.DataPoints,
            previousResult?.CompetitionScore?.DataPoints
          ),
        },
      ];

      setFullData(data);

      const donut = {
        npsScore,
        promoters: processScore(
          result.OverallPromoters.DataPoints,
          previousResult?.OverallPromoters?.DataPoints
        ),
        passives: processScore(
          result.OverallPassives.DataPoints,
          previousResult?.OverallPassives?.DataPoints
        ),
        detractors: processScore(
          result.OverallDetractors.DataPoints,
          previousResult?.OverallDetractors?.DataPoints
        ),
      };
      setDonutData(donut);
    };
    setFullData(null);
    setDonutData(null);
    makeCall();
  }, [venueId, timeRange]);

  return (
    <WidgetPanel
      title="NPS+ Trend"
      actions={
        <Panel.Actions>
          <Panel.ActionButton
            onClick={() => setActiveView(LINE_CHART)}
            icon={Icons.LineGraph}
          />
          <Panel.ActionButton
            onClick={() => setActiveView(DONUT_CHART)}
            icon={Icons.Donut}
          />
        </Panel.Actions>
      }
    >
      <Loader
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={fullData}
        content={() => {
          return (
            <ComponentSwitch
              tests={[
                () =>
                  activeView === LINE_CHART && (
                    <LineChart fullData={fullData} />
                  ),
                () =>
                  activeView === DONUT_CHART && <DonutChart data={donutData} />,
              ]}
            />
          );
        }}
      />
    </WidgetPanel>
  );
};

const LineChart = ({ fullData }) => {
  const [graphData, setGraphData] = React.useState(fullData[0].data);

  return (
    <VStack css={{ flex: "1" }}>
      <Swatch.HSet css={{ flex: "1" }}>
        {fullData.map(({ label, score, change, data }, i) => {
          return (
            <Swatch.ScoreSwatch
              key={label}
              active={graphData === data}
              onClick={() => {
                setGraphData(data);
              }}
              title={label}
              score={score}
              change={change}
              formatter={(score) => {
                if (i === 0) {
                  return score > 0 ? `+${score}` : `${score}`;
                }
                return score;
              }}
            />
          );
        })}
      </Swatch.HSet>
      {graphData.length === 0 ? (
        <NoData />
      ) : (
        <>
          <LineGraphByMonth
            data={graphData}
            tooltipFormatter={LineGraphByMonth.tooltipHelper("NPS+ Score")}
            percentiles={LineGraphByMonth.percentileHelper(-50, 12, 22, 32)}
          />
          <HStack css={{ ml: "$4", mt: "$4", gap: "$3" }}>
            <GraphKey.Circle color={colours.ppForest} label="NPS+ Score" />
            {graphData.previous.length > 0 && (
              <GraphKey.Circle
                color={colours.greys.grey1}
                label="Previous Year"
              />
            )}
            <GraphKey.Rectangle
              color={colours.teals.teal3}
              label="Industry Benchmark"
            />
          </HStack>
        </>
      )}
    </VStack>
  );
};

const DonutChart = ({ data }) => {
  const total =
    data.promoters.score + data.passives.score + data.detractors.score;

  const promoters = Math.round((data.promoters.score / total) * 100);
  const passives = Math.round((data.passives.score / total) * 100);
  const detractors = Math.round((data.detractors.score / total) * 100);

  const npsScore = data.npsScore.score.toFixed(0);

  const npsPrefix = npsScore < 0 ? "-" : npsScore > 0 ? "+" : "";

  const option = {
    series: [
      {
        type: "pie",
        radius: ["65%", "90%"],
        label: {
          show: false,
        },
        data: [
          {
            value: data.promoters.score,
            name: "Promoters",
            itemStyle: {
              color: colours.teals.teal4,
            },
          },
          {
            value: data.passives.score,
            name: "Passives",
            itemStyle: {
              color: colours.greys.grey1,
            },
          },
          {
            value: data.detractors.score,
            name: "Detractors",
            itemStyle: {
              color: colours.ppForest,
            },
          },
        ],
      },
    ],
  };

  return (
    <HStack
      css={{
        flex: "1",
      }}
    >
      <VStack css={{ gap: "$6", flex: "1" }}>
        <DonutLabel
          label="Promoters"
          score={promoters}
          change={data.promoters.change}
          color={colours.teals.teal4}
        />
        <DonutLabel
          label="Passives"
          score={passives}
          change={data.passives.change}
          color={colours.greys.grey1}
        />
        <DonutLabel
          label="Detractors"
          score={detractors}
          change={data.detractors.change}
          color={colours.ppForest}
        />
        <Box css={{ flex: "1" }} />
      </VStack>
      <Box css={{ position: "relative", width: "60%", height: "100%" }}>
        <Box
          css={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "50%",
            marginTop: "-65px",
          }}
        >
          <Text.H1
            css={{
              fontSize: "100px",
              color: colours.ppForest,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "60px",
                paddingBottom: "20px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              {npsPrefix}
            </span>
            {Math.abs(npsScore)}
            <Swatch.ScoreChange
              css={{
                fontSize: "20px",
                paddingBottom: "18px",
                display: "inline-block",
                verticalAlign: "bottom",
              }}
              change={data.npsScore.change}
            />
          </Text.H1>
        </Box>
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={false}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </HStack>
  );
};

const DonutLabel = ({ label, score, change, color }) => {
  return (
    <VStack
      css={{
        paddingBottom: "$2",
        borderBottom: `3px solid ${color}`,
        gap: "$1",
      }}
    >
      <Text.H4
        css={{
          fontSize: "12px",
          color: "$ppForest",
        }}
      >
        {label}
      </Text.H4>
      <HStack css={{ gap: "$1", alignItems: "end" }}>
        <Text.H1 css={{}}>{score.toFixed(0)}</Text.H1>
        <Text.H4 css={{ marginBottom: "6px" }}>%</Text.H4>
        <Swatch.ScoreChange change={change} />
      </HStack>
    </VStack>
  );
};

export default NPSSummary;
