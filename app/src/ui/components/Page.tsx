import React from "react";
import { styled } from "../theme";

import { VStack, HStack, Box } from "./index";
import { Icon, Text } from "../components";

const Page = (props) => {
  const { title, icon, children } = props;
  return (
    <VStack
      css={{
        size: "$full",
      }}
    >
      {renderTitle(title, icon)}
      {renderContent(children)}
    </VStack>
  );
};

const renderTitle = (title, icon, additonalContent?) => {
  return (
    <HStack
      css={{
        color: "$mediumContrast",
        boxShadow: "$shadow",
        position: "fixed",
        backgroundColor: "$background",
        width: "calc($full - $navWidth)",
        height: "$panelHeaderHeight",
        boxSizing: "border-box",
        px: "$4",
        py: "$2",
      }}
    >
      {icon && (
        <Icon icon={icon} css={{ mr: "$2", top: "15%", fontSize: "1.5em" }} />
      )}
      <Text.H2>{title}</Text.H2>
      {additonalContent}
    </HStack>
  );
};

const renderContent = (children) => {
  return (
    <HStack
      css={{
        mt: "$panelHeaderHeight",
        width: "$full",
        height: "calc($full - $panelHeaderHeight)",
      }}
    >
      <Box
        css={{
          width: "$full",
          height: "$full",
          overflow: "scroll",
        }}
      >
        {children}
      </Box>
    </HStack>
  );
};

const StyledPage = styled(Page);

export default StyledPage;
