import React from "react";
import { Panel, HStack, Loader, Swatch } from "../../components";

const WidgetPanel = (props) => {
  return (
    <Panel css={{ height: "100%" }}>
      <Panel.Header>
        <HStack>
          {props.title}
          <Actions actions={props.actions} />
        </HStack>
      </Panel.Header>
      <Panel.Content
        css={{
          display: "flex",
          height: "calc(100% - $panelHeaderHeight)",
          width: "100%",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {props.children}
      </Panel.Content>
    </Panel>
  );
};

const Actions = ({ actions }) => {
  if (actions) {
    return <>{actions}</>;
  }
  return null;
};

export default WidgetPanel;
