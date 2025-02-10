import React, { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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

import GraphKey from "../../shared/GraphKey";
import GraphTooltip from "../../shared/GraphTooltip";

import {
  Panel,
  VStack,
  Swatch,
  HStack,
  Loader,
  Box,
  Text,
  NoData,
} from "../../../components";
import WidgetPanel from "../../shared/WidgetPanel";
import { ComponentSwitch } from "../../../utils";
import { MONTHS } from "../../../../utils";
import {
  TimeRangeContext,
  VenueContext,
  AccountContext,
} from "../../../utils/GlobalContexts";
import api from "../../../../net/api-service";

import Icons from "../../../app/Icons";

import colours from "../../../theme/colours";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent,
]);

const OVERVIEW = "overview";
const AGES = "ages";
const GENDERS = "gender";

const processResult = (result) => {
  const responseCounts = result.ResponseCounts.DataPoints.map(
    ({ Date: d, Count, Average, Age, Gender }) => {
      const ages = Age.map(({ Label, Count }) => {
        return { label: Label, value: Count };
      }).reverse();
      const genders = Gender.map(({ Label, Count }) => {
        return { label: Label, value: Count };
      }).reverse();

      return {
        date: new Date(d),
        value: Math.round(Count),
        average: Math.round(Average * 100) / 100,
        ages,
        genders,
      };
    }
  );

  return {
    responseCounts,
  };
};

const CollectionStatistics = () => {
  const { venueId } = React.useContext(VenueContext);
  const { accountId } = React.useContext(AccountContext);
  const { timeRange } = React.useContext(TimeRangeContext);
  const [statistics, setStatistics] = React.useState(null);
  const [previousStatistics, setPreviousStatistics] = React.useState(null);
  const [activeView, setActiveView] = React.useState(OVERVIEW);

  useEffect(() => {
    const makeCall = async () => {
      const promises = [
        api.statistics({
          accountId,
          surveyId: venueId,
          ...timeRange,
        }),
      ];

      const result = await Promise.all(promises);
      setStatistics(processResult(result[0]));
      if (result[1]) {
        setPreviousStatistics(processResult(result[1]));
      }
    };
    setStatistics(null);
    setPreviousStatistics(null);
    makeCall();
  }, [venueId, timeRange]);

  return (
    <WidgetPanel
      title="Collection Statistics"
      actions={
        <Panel.Actions>
          <Panel.ActionButton
            onClick={() => setActiveView(OVERVIEW)}
            icon={Icons.BarGraph}
          />
          <Panel.ActionButton
            onClick={() => setActiveView(AGES)}
            icon={Icons.People}
          />
          <Panel.ActionButton
            onClick={() => setActiveView(GENDERS)}
            icon={Icons.Gender}
          />
        </Panel.Actions>
      }
    >
      <Loader
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={statistics}
        content={() => {
          return (
            <ComponentSwitch
              tests={[
                () =>
                  activeView === OVERVIEW && (
                    <StatsOverview
                      statistics={statistics}
                      previousStatistics={previousStatistics}
                    />
                  ),
                () =>
                  activeView === AGES && <StatsAges statistics={statistics} />,
                () =>
                  activeView === GENDERS && (
                    <StatsGenders statistics={statistics} />
                  ),
              ]}
            />
          );
        }}
      />
    </WidgetPanel>
  );
};

const consolidateValues = (current, previous, field) => {
  const labels = [];
  const values = [];
  const prevValues = [];

  current.forEach((d) => {
    const month = MONTHS[d.date.getMonth()];
    const year = d.date.getFullYear();
    values.push({ value: d[field], month, year });
  });

  previous?.forEach((d) => {
    const month = MONTHS[d.date.getMonth()];
    const year = d.date.getFullYear();
    prevValues.push({ value: d[field], month, year });
  });

  let labelDef = current;
  if (previous && previous.length > current.length) {
    labelDef = previous;
  }
  labelDef.forEach(({ date }) => {
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    labels.push(month + " " + year);
  });

  return { labels, values, prevValues };
};

const VALUE_FIELD = "value";
const AVERAGE_FIELD = "average";

const StatsOverview = ({ statistics, previousStatistics }) => {
  const [graphField, setGraphField] = React.useState(VALUE_FIELD);

  let monthlyTotal = 0;
  let average = 0;

  if (statistics?.responseCounts?.length > 0) {
    const stat =
      statistics.responseCounts[statistics.responseCounts.length - 1];
    monthlyTotal = stat.value;
    average = stat.average;
  }

  return (
    <VStack css={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
      <Swatch.HSet css={{ mb: "$3", width: "100%" }}>
        <Swatch.ScoreSwatch
          active={graphField === VALUE_FIELD}
          title="Monthly Responses"
          score={monthlyTotal}
          interactive={true}
          onClick={() => {
            setGraphField(VALUE_FIELD);
          }}
        />
        <Swatch.ScoreSwatch
          active={graphField === AVERAGE_FIELD}
          title="Daily Average"
          score={average}
          interactive={true}
          formatter={(_value) => average.toFixed(2)}
          onClick={() => {
            setGraphField(AVERAGE_FIELD);
          }}
        />
      </Swatch.HSet>
      <OverviewGraph
        statistics={statistics}
        previousStatistics={previousStatistics}
        graphField={graphField}
      />
    </VStack>
  );
};

const OverviewGraph = ({ statistics, previousStatistics, graphField }) => {
  if (statistics.responseCounts.length === 0) {
    return <NoData />;
  }

  const { labels, values, prevValues } = consolidateValues(
    statistics.responseCounts,
    previousStatistics?.responseCounts,
    graphField
  );

  const total = statistics.responseCounts.reduce((sum, val) => {
    return sum + val.value;
  }, 0);

  var option = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (parameters) => {
        const curr = parameters[0];
        const prev = parameters[1];
        const items = [];
        if (curr) {
          items.push({
            label: (
              <GraphKey.Rectangle
                color={colours.ppForest}
                label={curr.data.month + " " + curr.data.year}
              />
            ),
            value: curr.data.value,
          });
        }

        if (prev) {
          items.push({
            label: (
              <GraphKey.Rectangle
                color={colours.greys.grey1}
                label={prev.data.month + " " + prev.data.year}
              />
            ),
            value: prev.data.value,
          });
        }
        return renderToStaticMarkup(<GraphTooltip items={items} />);
      },
    },
    xAxis: {
      type: "category",
      data: labels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        barWidth: 4,
        data: values,
        barGap: "100%",
        itemStyle: {
          color: colours.ppForest,
        },
      },
      {
        type: "bar",
        barWidth: 4,
        data: prevValues,
        barGap: "100%",
        itemStyle: {
          color: colours.greys.grey1,
        },
      },
    ],
  };

  return (
    <>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: "100%", height: "90%" }}
      />
      <HStack css={{ ml: "$4", mt: "$4", gap: "$3" }}>
        <GraphKey.Rectangle
          color={colours.ppForest}
          label={`Total Responses (${total})`}
        />
        {previousStatistics?.length > 0 && (
          <GraphKey.Rectangle
            color={colours.greys.grey1}
            label="Previous Year"
          />
        )}
      </HStack>
    </>
  );
};

const StatsAges = ({ statistics }) => {
  if (statistics?.responseCounts?.length === 0) {
    return <NoData />;
  }
  const stat = statistics.responseCounts[statistics.responseCounts.length - 1];

  const labels = stat.ages.map((age) => age.label);
  const values = stat.ages.map((age) => age.value);
  return <BarGraph title="Grouped by Age" labels={labels} values={values} />;
};

const StatsGenders = ({ statistics }) => {
  if (statistics?.responseCounts?.length === 0) {
    return <NoData />;
  }
  const stat = statistics.responseCounts[statistics.responseCounts.length - 1];
  const labels = stat.genders.map((gender) => gender.label);
  const values = stat.genders.map((gender) => gender.value);
  return <BarGraph title="Grouped by Gender" labels={labels} values={values} />;
};

const BarGraph = ({ title, labels, values }) => {
  if (values.length === 0) {
    return <NoData />;
  }

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
      <Text.H4 css={{ width: "100%", textAlign: "center", height: "10%" }}>
        {title}
      </Text.H4>
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

export default CollectionStatistics;
