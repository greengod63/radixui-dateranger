import React from "react";
import { styled } from "../theme";

import { Text, HStack, Button, Icon } from "./index";

const Panel = styled("div", {
  backgroundColor: "$background",
  boxShadow: "$shadow",
  p: "$4",
  boxSizing: "border-box",
}) as any;

const StyledDiv = styled("div", {});

const PanelHeader = (props) => {
  return (
    <StyledDiv
      css={{
        ...props.css,
        height: "$panelHeaderHeight",
        boxSizing: "border-box",
      }}
    >
      <Text.H3 css={{}}>{props.children}</Text.H3>
    </StyledDiv>
  );
};

const PanelActions = (props) => {
  return (
    <HStack
      css={{
        flex: "1",
        flexGrow: "1",
        justifyContent: "flex-end",
        ...props.css,
      }}
    >
      {props.children}
    </HStack>
  );
};

const PanelActionButton = ({ onClick, icon }) => {
  return (
    <Button onClick={onClick} css={{ color:"$neutral8", border: "none" }}>
      <Icon icon={icon} css={{ fontSize: "20px" }} />
    </Button>
  );
};

Panel.Header = PanelHeader;
Panel.Actions = PanelActions;
Panel.Content = styled("div");
Panel.ActionButton = PanelActionButton;

export default Panel;
