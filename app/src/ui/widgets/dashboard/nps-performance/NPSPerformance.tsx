import React, { useEffect } from "react";
import * as d3 from "d3";
import { Panel, GraphColourKeys, Loader, Box } from "../../../components";
import WidgetPanel from "../../shared/WidgetPanel";
import { AccountContext, VenueContext } from "../../../utils/GlobalContexts";
import api from "../../../../net/api-service";
import colours from "../../../theme/colours";
import svgUtils from "../../../utils/svg_utils";

const { graphColours } = colours;

const NPS_MAX = 60;
const INNER_RADIUS = 0.6;
const OUTER_RADIUS = 0.95;
const OUTER_RADIUS_BG = 0.85;
const SIZE = 300;

const NPSPerformance = () => {
  const { venueId } = React.useContext(VenueContext);
  const { accountId } = React.useContext(AccountContext);
  const [performance, setPerformance] = React.useState(null);

  useEffect(() => {
    const makeCall = async () => {
      const result = await api.nps({
        accountId: accountId,
        surveyId: venueId,
        from: new Date("2020-01-01"),
        to: new Date("2024-01-01"),
      });
      console.log(result);

      if (isNaN(result.OverallScore.Value)) {
        setPerformance({ value: null });
      }
      const roundedPerformance = Math.round(
        result.OverallScore.DataPoints[
          result.OverallScore.DataPoints.length - 1
        ].Value
      );
      setPerformance({ value: roundedPerformance });
    };
    setPerformance(null);
    makeCall();
  }, [venueId]);

  return (
    <WidgetPanel
      title=" NPS+ Performance"
      actions={
        <Panel.Actions>
          <GraphColourKeys
            css={{ mt: "$2" }}
            keys={[
              { label: "Detractors", colour: graphColours.negative },
              { label: "Promoters", colour: graphColours.positive },
            ]}
          />
        </Panel.Actions>
      }
    >
      <Loader
        css={{ padding: "30px" }}
        data={performance}
        content={() => {
          return <Speedometer performance={performance} size={SIZE} />;
        }}
      />
    </WidgetPanel>
  );
};

const donutSegment = ({ size, angle, innerRadius, outerRadius }) => {
  const s = size / 2;
  const r = angle >= 0;
  angle -= Math.PI / 2;
  const x = Math.cos(angle);
  const y = Math.sin(angle);

  const ir = s * innerRadius;
  const or = s * outerRadius;

  const path = `
    M ${s} ${s - ir}
    L ${s} ${s - or}
    A ${or} ${or} 0 0 ${r ? 1 : 0} ${s + x * or} ${s + y * or}
    L ${s + x * ir} ${s + y * ir}
    A ${ir} ${ir} 0 0 ${r ? 0 : 1} ${s} ${s - ir}
  `;
  return path;
};

const drawBackground = (svg, size, selector, angle) => {
  svg
    .select(selector)
    .append("path")
    .attr(
      "d",
      donutSegment({
        size,
        angle,
        innerRadius: INNER_RADIUS,
        outerRadius: OUTER_RADIUS_BG,
      })
    );
};

const Speedometer = ({ performance, size }) => {
  const { value } = performance;

  if (isNaN(value)) {
    return (
      <Box css={{ height: "100%", marginTop: "40px" }}>Insufficient Data</Box>
    );
  }

  const ref = useD3(
    (svg) => {
      // Background with Labels
      drawBackground(svg, size, ".negative-background", -Math.PI / 2);
      drawBackground(svg, size, ".positive-background", Math.PI / 2);

      svgUtils.text(svg, `-${NPS_MAX}`, {
        "font-size": "smaller",
        x: size * 0.14,
        y: size * 0.5,
        fill: "black",
      });
      svgUtils.text(svg, NPS_MAX, {
        "font-size": "smaller",
        x: size * 0.8,
        y: size * 0.5,
        fill: "black",
      });

      // Value Display
      const selector = value < 0 ? ".negative-value" : ".positive-value";
      svg
        .select(selector)
        .append("path")
        .attr(
          "d",
          donutSegment({
            size,
            angle: ((Math.PI / 2) * value) / NPS_MAX,
            innerRadius: INNER_RADIUS,
            outerRadius: OUTER_RADIUS,
          })
        );

      svgUtils.text(svg, value, {
        "font-size": `${size * 0.17}px`,
        "font-weight": "700",
        x: size * (String(value).length === 1 ? 0.45 : 0.4),
        y: size * 0.45,
        fill: "black",
      });

      // Delta Display
      // const text = `Prev Period ${performance.previousPeriod}`;

      // svgUtils.text(svg, text, {
      //   "font-size": `smaller`,
      //   // "font-weight": "700",
      //   x: size * 0.7,
      //   y: size * 0.5,
      //   fill: "black",
      // });
      //
    },
    [value]
  );

  const graphScale = 0.9;

  const transform = `translate(${
    (size * (1 - graphScale)) / 2
  }, -0) scale(${graphScale}, ${graphScale})`;

  return (
    <svg
      ref={ref}
      style={{
        height: size / 2,
        width: size,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g transform={transform}>
        <g
          fill={graphColours.negativePassive}
          className="negative-background"
        />
        <g
          fill={graphColours.positivePassive}
          className="positive-background"
        />
        <g fill={graphColours.negative} className="negative-value" />
        <g fill={graphColours.positive} className="positive-value" />
      </g>
    </svg>
  );
};

export const useD3 = (renderChartFn, dependencies) => {
  const ref = React.useRef();
  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};

export default NPSPerformance;
