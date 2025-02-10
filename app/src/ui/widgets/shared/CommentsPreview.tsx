import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TimeRangeContext,
  VenueContext,
  AccountContext,
} from "../../utils/GlobalContexts";
import api from "../../../net/api-service";

import { Loader, VStack, Text } from "../../components";
import WidgetPanel from "./WidgetPanel";
import CommentStack from "./CommentStack";

const CommentsPreview = ({ touchpoint }) => {
  const { venueId } = React.useContext(VenueContext) as any;
  const { accountId } = React.useContext(AccountContext) as any;
  const { timeRange } = React.useContext(TimeRangeContext) as any;
  const [comments, setComments] = React.useState(null);

  useEffect(() => {
    const makeCall = async () => {
      const result = await api.improvements({
        accountId: accountId,
        surveyId: venueId,
        touchpointId: touchpoint.id,
        from: new Date("2020-01-01"),
        to: new Date("2024-01-01"),
      });
      const suggestions = result.Improvements.map(({ Improvement, Timestamp }) => {
        return {
          text: Improvement,
          date: new Date(Timestamp),
        };
      });
      console.log(result);
      const comments = result.Improvements.map(({ Improvement, Timestamp }) => {
        return {
          text: Improvement,
          date: new Date(Timestamp),
        };
      });
      setComments(comments);
    };
    setComments(null);
    makeCall();
  }, [timeRange, touchpoint.id]);

  return (
    <WidgetPanel title="Comments">
      <Loader
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={comments}
        content={() => {
          return (
            <VStack css={{ gap: "$3" }}>
              <CommentStack comments={comments} />
              <Text.Small
                css={{
                  color: "$ppForest",
                  textAlign: "right",
                  textDecoration: "underline",
                }}
              >
                <Link to={`/comments?touchpoint=${touchpoint.id}`}>
                  View all comment data →
                </Link>
              </Text.Small>
            </VStack>
          );
        }}
      />
    </WidgetPanel>
  );
};

export default CommentsPreview;
