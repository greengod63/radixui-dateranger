import React from "react";
import { styled } from "../theme";
import Text from "./Text";
import Box from "./Box";
import { VStack } from "./Stack";

const TableElement = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
});
const THead = styled("thead");
const TBody = styled("tbody");
const TR = styled("tr", {});
const TH = styled("th", {
  textAlign: "left",
  borderBottom: "1px solid $lowContrast",
  p: "$2",
});
const TD = styled("td", { borderBottom: "1px solid $minContrast", p: "$2" });

const renderExplanation = (explanation) => {
  return (
    explanation && (
      <Box css={{ py: "$1" }}>
        <Text.Small css={{ color: "$mediumContrast" }}>
          {explanation}
        </Text.Small>
      </Box>
    )
  );
};

const SimpleForm = ({ fields }) => {
  return (
    <TableElement>
      <TBody>
        {fields.map((field, index) => {
          return (
            <TR key={index}>
              <TD css={{ verticalAlign: "top" }}>
                <VStack>
                  <Text>{field.label}</Text>
                  {renderExplanation(field.explanation)}
                </VStack>
              </TD>
              <TD css={{ width: "70%" }}>{field.control}</TD>
            </TR>
          );
        })}
      </TBody>
    </TableElement>
  );
};

export default SimpleForm;
