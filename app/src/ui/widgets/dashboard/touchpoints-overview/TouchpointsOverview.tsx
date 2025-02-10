import React, { useEffect } from "react";
import { Panel, Swatch, HStack, Loader } from "../../../components";
import WidgetPanel from "../../shared/WidgetPanel";
import { ComponentSwitch } from "../../../utils";
import { processTouchpoints } from "../../../../utils/data";
import Icons from "../../../app/Icons";
import {
  VenueContext,
  TimeRangeContext,
  AccountContext,
} from "../../../utils/GlobalContexts";
import api from "../../../../net/api-service";
import ScoreBarChart from "../../shared/ScoreBarChart";
import { previousYearRange } from "../../../../utils";
import TouchpointLineGraph from "../../touchpoints/TouchpointLineGraph";

const LINE_CHART = "LINE_CHART";
const BAR_CHART = "BAR_CHART";

const TouchpointsOverview = () => {
  const { venueId } = React.useContext(VenueContext);
  const { accountId } = React.useContext(AccountContext);
  const { timeRange } = React.useContext(TimeRangeContext);
  const [activeView, setActiveView] = React.useState(LINE_CHART);
  const [touchpoints, setTouchpoints] = React.useState(null);

  useEffect(() => {
    const makeCall = async () => {
      const promises = [
        api.touchpoints({
          accountId,
          surveyId: venueId,
          ...timeRange,
        }),
        api.touchpoints({
          accountId,
          surveyId: venueId,
          ...previousYearRange(timeRange),
        }),
      ];
      const result = await Promise.all(promises);
      const tps = processTouchpoints(result[0], result[1]);
      setTouchpoints(tps);
    };
    setTouchpoints(null);
    makeCall();
  }, [venueId, timeRange]);

  return (
    <WidgetPanel
      title="Touchpoints Overview"
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
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={touchpoints}
        content={() => {
          return (
            <ComponentSwitch
              tests={[
                () =>
                  activeView === LINE_CHART && (
                    <LineChart touchpoints={touchpoints} />
                  ),
                () =>
                  activeView === BAR_CHART && (
                    <ScoreBarChart
                      keyLabel="Touchpoint Score"
                      scores={touchpoints}
                    />
                  ),
              ]}
            />
          );
        }}
      />
    </WidgetPanel>
  );
};

const LineChart = ({ touchpoints }) => {
  const firstTouchPoint = touchpoints && touchpoints[0];
  const [activeTouchpoint, setActiveTouchpoint] =
    React.useState(firstTouchPoint);

  if (!activeTouchpoint)
    return <></>

  return (
    <HStack css={{ gap: "$4", flex: "1" }}>
      <TouchpointMenu
        touchpoints={touchpoints}
        active={activeTouchpoint}
        onSelect={(touchpoint) => {
          setActiveTouchpoint(touchpoint);
        }}
      />
      <TouchpointLineGraph touchpoint={activeTouchpoint} />
    </HStack>
  );
};

const TouchpointMenu = ({ touchpoints, active, onSelect }) => {
  return (
    <Swatch.VSet css={{ width: "35%", height: "100%", overflowY: "scroll" }}>
      {touchpoints.map((tp) => {
        const { id, label, score, change } = tp;
        return (
          <React.Fragment key={id}>
            <Swatch.ScoreSwatch
              title={label}
              score={score.toFixed(1)}
              active={active === tp}
              change={change}
              onClick={() => {
                onSelect(tp);
              }}
            />
          </React.Fragment>
        );
      })}
    </Swatch.VSet>
  );
};

export default TouchpointsOverview;
