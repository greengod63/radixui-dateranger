import React, { useEffect } from "react";
import {
  Panel,
  Swatch,
  HStack,
  VStack,
  Loader,
  NoData,
} from "../../../components";
import WidgetPanel from "../../shared/WidgetPanel";
import { ComponentSwitch } from "../../../utils";
import Icons from "../../../app/Icons";
import {
  VenueContext,
  TimeRangeContext,
  AccountContext,
} from "../../../utils/GlobalContexts";
import api from "../../../../net/api-service";
import LineGraphByMonth from "../../shared/LineGraphByMonth";
import ScoreBarChart from "../../shared/ScoreBarChart";
import { previousYearRange } from "../../../../utils";
import GraphKey from "../../shared/GraphKey";
import colours from "../../../theme/colours";

const processScore = (currentData, previousData) => {
  let delta = 0;
  let change = 0;
  let score = 0;

  if (currentData.length === 0) {
    return { score, delta, change, data: { current: [], previous: [] } };
  }

  score = currentData[currentData.length - 1].Score;
  if (currentData.length >= 2) {
    let prev = currentData[currentData.length - 2].Score;
    if (previousData?.length === 12) {
      prev = previousData[previousData.length - 1].Score;
    }
    delta = score - prev;
    change = delta / prev;
  }

  const current = currentData.map(({ Score: value, Date: d }) => {
    return {
      date: new Date(d),
      value,
    };
  });

  let previous = [];
  if (previousData) {
    previous = previousData.map(({ Score: value, Date: d }) => {
      return {
        value,
        date: new Date(d),
      };
    });
  }

  return {
    score,
    delta,
    change,
    data: {
      current,
      previous,
    },
  };
};

const LINE_CHART = "LINE_CHART";
const BAR_CHART = "DONUT_CHART";

const ThemesOverview = () => {
  const { venueId } = React.useContext(VenueContext);
  const { accountId } = React.useContext(AccountContext);
  const { timeRange } = React.useContext(TimeRangeContext);
  const [themes, setThemes] = React.useState(null);
  const [activeView, setActiveView] = React.useState(LINE_CHART);

  useEffect(() => {
    const makeCall = async () => {
      const promises = [
        api.themes({
          accountId,
          surveyId: venueId,
          ...timeRange,
        }),
        api.themes({
          accountId,
          surveyId: venueId,
          ...previousYearRange(timeRange),
        }),
      ];

      const result = await Promise.all(promises);

      const current = result[0];
      const previous = result[1];

      const tms = current.Themes.map(({ ThemeName, DataPoints }) => {
        let prev;
        if (previous) {
          prev = previous.Themes.find((tp) => tp.ThemeName === ThemeName);
        }

        return {
          id: ThemeName,
          label: ThemeName,
          ...processScore(DataPoints, prev?.DataPoints),
        };
      });
      setThemes(tms);
    };
    setThemes(null);
    makeCall();
  }, [venueId, timeRange]);

  return (
    <WidgetPanel
      title="Experience Themes"
      actions={
        <Panel.Actions>
          <Panel.ActionButton
            onClick={() => setActiveView(LINE_CHART)}
            icon={Icons.LineGraph}
          />
          <Panel.ActionButton
            onClick={() => setActiveView(BAR_CHART)}
            icon={Icons.BarGraph}
          />
        </Panel.Actions>
      }
    >
      <Loader
        css={{ padding: "30px" }}
        data={themes}
        content={() => {
          return (
            <ComponentSwitch
              tests={[
                () =>
                  activeView === LINE_CHART && <LineChart themes={themes} />,
                () =>
                  activeView === BAR_CHART && (
                    <ScoreBarChart keyLabel="Theme Score" scores={themes} />
                  ),
              ]}
            />
          );
        }}
      />
    </WidgetPanel>
  );
};

const LineChart = ({ themes }) => {
  const firstTheme = themes && themes[0];
  const [activeTheme, setActiveTheme] = React.useState(firstTheme);

  return (
    <VStack css={{ flex: "1" }}>
      <ThemeMenu
        themes={themes}
        active={activeTheme}
        onSelect={(theme) => {
          setActiveTheme(theme);
        }}
      />
      {activeTheme &&
      activeTheme.data &&
      activeTheme.data.current &&
      activeTheme.data.current.length > 0 ? (
        <Graph theme={activeTheme} />
      ) : (
        <NoData />
      )}
    </VStack>
  );
};

const Graph = ({ theme }) => {
  return (
    <>
      <LineGraphByMonth
        data={theme.data}
        tooltipFormatter={LineGraphByMonth.tooltipHelper("Theme Score")}
        percentiles={LineGraphByMonth.percentileHelper(-50, 25, 75, 100)}
      />

      <HStack css={{ ml: "$4", mt: "$4", gap: "$3" }}>
        <GraphKey.Circle color={colours.ppForest} label="Theme Score" />
        {theme?.data.previous.length > 0 && (
          <GraphKey.Circle color={colours.greys.grey1} label="Previous Year" />
        )}
        <GraphKey.Rectangle
          color={colours.teals.teal3}
          label="Industry Benchmark"
        />
      </HStack>
    </>
  );
};

const ThemeMenu = ({ themes, active, onSelect }) => {
  return (
    <Swatch.HSet css={{ flex: "1" }}>
      {themes.map((theme) => {
        const { id, label, score, change } = theme;
        return (
          <React.Fragment key={id}>
            <Swatch.ScoreSwatch
              title={label}
              score={score.toFixed(1)}
              change={change}
              active={active === theme}
              onClick={() => {
                onSelect(theme);
              }}
            />
          </React.Fragment>
        );
      })}
    </Swatch.HSet>
  );
};

export default ThemesOverview;
