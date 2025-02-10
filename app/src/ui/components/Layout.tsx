import React from "react";
import { Box, HStack } from "../components";

const Container = ({ children = null }) => {
  return (
    <Box
      css={{
        margin: "$2",
      }}
    >
      <HStack
        css={{
          gap: "$2",
          flexWrap: "wrap",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {children}
      </HStack>
    </Box>
  );
};

const Panel = ({ width, height, children = null }) => {
  const widthCSS = {
    1: { minWidth: "400px", maxWidth: "500px", flex: "1" },
    2: { minWidth: "800px", maxWidth: "1020px", flex: "2" },
    3: { minWidth: "800px", maxWidth: "1540px", flex: "3" },
  };

  const heightCSS = {
    1: { height: "250px" },
    2: {
      height: "500px",
    },
    3: {
      height: "650px",
    },
  };

  width = widthCSS[width];
  height = heightCSS[height];

  return (
    <Box
      css={{
        ...width,
        ...height,
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default { Container, Panel };
