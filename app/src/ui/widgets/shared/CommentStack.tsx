import React from "react";
import { Link, useLocation } from "react-router-dom";
import { VStack, Text, NoData } from "../../components";
import { formatDate } from "../../../utils";

const CommentStack = ({ comments }) => {
  const loc = useLocation();
  return (
    <VStack
      css={{
        flex: "1",
        maxHeight: "100%",
        borderTop: "2px solid $grey1",
        overflowY: "scroll",
        gap: "$4",
        py: "$4",
        boxSizing: "border-box",
      }}
    >
      {comments.length === 0 && <NoData />}
      {comments.length > 0 &&
        comments.map(({ text, date }, i) => {
          return (
            <VStack css={{ gap: "$1" }} key={i}>
              <Text.H6>{formatDate(date)}</Text.H6>
              <Text>{text}</Text>
            </VStack>
          );
        })}
    </VStack>
  );
};

export default CommentStack;
