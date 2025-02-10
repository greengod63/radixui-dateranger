import React from "react";

export const VenueContext = React.createContext({});
export const TimeRangeContext = React.createContext({});
export const AccountContext = React.createContext({});

export const GlobalProvider = ({
  defaultTimeRange,
  defaultVenueId,
  defaultCompareTo,
  defaultAccountId,
  children = null,
}) => {
  const [venueId, setVenueId] = React.useState(defaultVenueId);
  const [timeRange, setTimeRange] = React.useState(defaultTimeRange);
  const [accountId, setAccountId] = React.useState(defaultAccountId);

  return (
    <TimeRangeContext.Provider value={{ timeRange, setTimeRange }}>
      <AccountContext.Provider value={{ accountId, setAccountId }}>
        <VenueContext.Provider value={{ venueId, setVenueId }}>
          {children}
        </VenueContext.Provider>
      </AccountContext.Provider>
    </TimeRangeContext.Provider>
  );
};
