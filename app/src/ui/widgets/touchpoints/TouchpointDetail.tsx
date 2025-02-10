import React from "react";
import { Loader, Swatch } from "../../components";
import WidgetPanel from "../shared/WidgetPanel";

const TouchpointDetail = ({ touchpoint, detail }) => {
  return (
    <WidgetPanel title={touchpoint.label} Detail>
      <Loader
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={detail}
        content={() => {
          return <Details detail={detail} />;
        }}
      />
    </WidgetPanel>
  );
};

const Details = ({ detail }) => {
  return (
    <Swatch.VSet css={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      {detail.map(({ id, label, shortLabel, netAgreement }) => {
        const { change, agreement } = netAgreement;
        return (
          <React.Fragment key={id}>
            <Swatch.TouchpointSwatch
              title={shortLabel}
              subtitle={label}
              score={agreement.toFixed(1)}
              change={change}
            />
          </React.Fragment>
        );
      })}
    </Swatch.VSet>
  );
};

export default TouchpointDetail;
