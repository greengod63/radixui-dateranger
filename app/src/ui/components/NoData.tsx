import React from "react";

import Text from "./Text";
import Box from "./Box";

const NoData = () => {
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "$lowContrast",
      }}
    >
      <Text.H4>No Data</Text.H4>
      <Text.Small>There is no data for the selected time range.</Text.Small>
    </Box>
  );
};

export default NoData;
