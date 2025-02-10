import React, { useEffect } from "react";
import { Loader } from "../../../components";
import CommentStack from "../../shared/CommentStack";
import WidgetPanel from "../../shared/WidgetPanel";
import {
  VenueContext,
  TimeRangeContext,
  AccountContext,
} from "../../../utils/GlobalContexts";
import api from "../../../../net/api-service";
import { formatDate } from "../../../../utils";

const Suggestions = () => {
  const { venueId } = React.useContext(VenueContext);
  const { accountId } = React.useContext(AccountContext);
  const { timeRange } = React.useContext(TimeRangeContext);
  const [suggestions, setSuggestions] = React.useState(null);

  useEffect(() => {
    const makeCall = async () => {
      const result = await api.suggestions({
        accountId,
        surveyId: venueId,
        ...timeRange,
      });
      const suggestions = result.Suggestions.map(
        ({ Suggestion, Timestamp }) => {
          return {
            text: Suggestion,
            date: new Date(Timestamp),
          };
        }
      );

      setSuggestions(suggestions);
    };
    setSuggestions(null);
    makeCall();
  }, [venueId, timeRange]);

  return (
    <WidgetPanel title="Top Suggestions">
      <Loader
        css={{ padding: "30px", boxSizing: "border-box" }}
        data={suggestions}
        content={() => {
          return <CommentStack comments={suggestions} />;
        }}
      />
    </WidgetPanel>
  );
};

export default Suggestions;
