import React from "react";
import { styled } from "../theme";
import Text from "./Text";

const TableElement = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
});
const TBody = styled("tbody");
const TR = styled("tr", {});
const TD = styled("td", { borderBottom: "1px solid $minContrast", p: "$2" });

const LabelledContent = ({ rows, css }) => {
  return (
    <TableElement css={css}>
      <TBody>
        {rows.map((row, index) => {
          return (
            <TR key={index}>
              <TD css={{ verticalAlign: "top", fontWeight: "$light" }}>
                <Text>{row.label}</Text>
              </TD>
              <TD css={{ width: "70%" }}>
                <Text>{row.content}</Text>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </TableElement>
  );
};

export default LabelledContent;
