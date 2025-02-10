import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader, VStack, HStack, Text } from "../components";
import CommentsFilter from "./CommentsFilter";
import CommentsDateOption from "./CommentsDateOption"; // By Takao
import { processTouchpoints } from "../../utils/data";
import api from "../../net/api-service";
import { previousYearRange } from "../../utils";

import {
  TimeRangeContext,
  VenueContext,
  AccountContext,
} from "../utils/GlobalContexts";

// let lastVenueId = null;

const Comments = () => {
  const { venueId } = React.useContext(VenueContext) as any;
  const { accountId } = React.useContext(AccountContext) as any;
  const { timeRange } = React.useContext(TimeRangeContext) as any;

  const [touchpoints, setTouchpoints] = useState(null);

  const touchpointsAPICall = async () => {
    const result = await api.touchpoints({
      accountId,
      surveyId: venueId,
      ...timeRange,
    });
    const tps = processTouchpoints(result, null);
    setTouchpoints(tps);
  };

  useEffect(() => {
    setTouchpoints(null);
    touchpointsAPICall();
  }, [venueId, timeRange]);

  return (
    <Loader
      css={{ padding: "30px", boxSizing: "border-box" }}
      data={touchpoints}
      content={() => {
        return (
          <VStack>
            <CommentsHeader touchpoints={touchpoints} />
          </VStack>
        );
      }}
    />
  );
};

const CommentsHeader = ({ touchpoints }) => {
  let [searchParams] = useSearchParams();

  const prefilteredTouchpoint = searchParams.get("touchpoint");

  let experienceThemes = [
    { id: 1, label: "Navigation" },
    { id: 2, label: "Cleanliness" },
    { id: 3, label: "Safety" },
    { id: 4, label: "Experience" },
    { id: 5, label: "Design" },
  ];

  touchpoints = touchpoints.map((tp) => {
    return {
      label: tp.label,
      checked:
        prefilteredTouchpoint === tp.id || prefilteredTouchpoint === null,
      value: tp.id,
    };
  });

  experienceThemes = experienceThemes.map((et) => {
    return {
      ...et,
      value: et.id,
      checked: true,
    };
  });

  return (
    <HStack
      css={{
        padding: "20px",
        justifyContent: "space-between",
      }}
    >
      <Text.H2>Comments</Text.H2>
      <HStack>
        <CommentsFilter
          touchpoints={touchpoints}
          experienceThemes={experienceThemes}
          onChange={(filter) => {
            console.log("Filter", filter);
          }}
        />
        {/* <CommentsDateOption /> */}
      </HStack>
    </HStack>
  );
};

export default Comments;
