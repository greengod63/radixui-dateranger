import React from "react";
import { styled } from "../theme";

const TableElement = styled("table", {
  borderCollapse: "collapse",
  fontSize: "$2",
});
const Head = styled("thead");
const Body = styled("tbody");
const Row = styled("tr");
const HeadCell = styled("th");
const Cell = styled("td");

const HeadRow = ({ trCSS = {}, theadCSS = {}, children }) => {
  return (
    <Head css={theadCSS}>
      <Row css={trCSS}>{children}</Row>
    </Head>
  );
};

const SimpleTable = ({
  headers,
  items,
  itemRenderer,
  onRowClick = () => {},
  ...rest
}) => {
  const cellStyle = {
    textAlign: "left",
    borderBottom: "1px solid $lowContrast",
    p: "$2",
  };

  return (
    <TableElement {...rest}>
      <Head>
        <Row>
          {headers.map((header, index) => {
            return (
              <HeadCell key={index} css={cellStyle}>
                {header}
              </HeadCell>
            );
          })}
        </Row>
      </Head>
      <Body>
        {items.map((item, index) => {
          const cellContent = itemRenderer(item);
          return (
            <Row
              key={index}
              css={{ "&:hover": { background: "$minContrast" } }}
              onClick={(event) => {
                if (event.defaultPrevented) {
                  return;
                }
                onRowClick();
              }}
            >
              {cellContent.map((content, index) => {
                return (
                  <Cell css={cellStyle} key={index}>
                    {content}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Body>
    </TableElement>
  );
};

const Table = {
  Table: TableElement,
  HeadRow,
  Head,
  Body,
  Row,
  HeadCell,
  Cell,
  Simple: SimpleTable,
};

export default Table;
