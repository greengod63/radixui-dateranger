import React, { useEffect, useState } from "react";
import {
  Layout,
  Loader,
  VStack,
  HStack,
  Text,
  SimpleSelect,
} from "../components";
import { processTouchpoints, processTouchpointDetail } from "../../utils/data";
import {
  TouchpointScore,
  TouchpointTrend,
  TouchpointDetail,
  TouchpointDetailBreakdown,
  CommentsPreview,
} from "../widgets";
import api from "../../net/api-service";
import { previousYearRange } from "../../utils";

import {
  TimeRangeContext,
  VenueContext,
  AccountContext,
} from "../utils/GlobalContexts";

let lastVenueId = null;

const Touchpoints = () => {
  const { venueId } = React.useContext(VenueContext);
  const { accountId } = React.useContext(AccountContext);
  const { timeRange } = React.useContext(TimeRangeContext);

  const [touchpoints, setTouchpoints] = useState(null);
  const [activeTouchpoint, setActiveTouchpoint] = useState(null);

  const [touchpointDetail, setTouchpointDetail] = useState(null);

  const touchpointsAPICall = async () => {
    const promises = [
      api.touchpoints({
        accountId,
        surveyId: venueId,
        ...timeRange,
      }),
      api.touchpoints({
        accountId,
        surveyId: venueId,
        ...previousYearRange(timeRange),
      }),
    ];

    const result = await Promise.all(promises);
    const tps = processTouchpoints(result[0], result[1]);
    setTouchpoints(tps);

    if (!activeTouchpoint || lastVenueId !== venueId) {
      setActiveTouchpoint(tps[0]);
    }

    lastVenueId = venueId;
  };

  const tpDetailsAPICall = async () => {
    if (!activeTouchpoint) {
      return;
    }
    const promises = [
      api.touchpointDetail({
        accountId,
        surveyId: venueId,
        touchpointId: activeTouchpoint.id,
        ...timeRange,
      }),
      api.touchpointDetail({
        accountId,
        surveyId: venueId,
        touchpointId: activeTouchpoint.id,
        ...previousYearRange(timeRange),
      }),
    ];

    const result = await Promise.all(promises);
    const det = processTouchpointDetail(result[0], result[1]);
    setTouchpointDetail(det);
  };

  useEffect(() => {
    setTouchpoints(null);
    touchpointsAPICall();
  }, [venueId, timeRange]);

  useEffect(() => {
    setTouchpointDetail(null);
    tpDetailsAPICall();
  }, [activeTouchpoint]);

  return (
    <Loader
      css={{ padding: "30px", boxSizing: "border-box" }}
      data={touchpoints && activeTouchpoint}
      content={() => {
        return (
          <VStack>
            <HStack css={{ padding: "20px", justifyContent: "space-between" }}>
              <Text.H2>Touchpoints</Text.H2>
              <SimpleSelect
                css={{ zIndex: 50 }}
                selected={activeTouchpoint}
                options={touchpoints}
                onChange={(value) => {
                  setActiveTouchpoint(value);
                }}
              />
            </HStack>
            <TouchpointsDashboard
              touchpoint={activeTouchpoint}
              detail={touchpointDetail}
            />
          </VStack>
        );
      }}
    />
  );
};

const TouchpointsDashboard = ({ touchpoint, detail }) => {
  return (
    <Layout.Container>
      <Layout.Panel width={1} height={2}>
        <TouchpointScore touchpoint={touchpoint} />
      </Layout.Panel>
      <Layout.Panel width={2} height={2}>
        <TouchpointTrend touchpoint={touchpoint} />
      </Layout.Panel>
      <Layout.Panel width={1} height={2}>
        <TouchpointDetail touchpoint={touchpoint} detail={detail} />
      </Layout.Panel>
      <Layout.Panel width={2} height={2}>
        <TouchpointDetailBreakdown touchpoint={touchpoint} detail={detail} />
      </Layout.Panel>
      <Layout.Panel width={1} height={2}>
        <CommentsPreview touchpoint={touchpoint} />
      </Layout.Panel>
    </Layout.Container>
  );
};

export default Touchpoints;
