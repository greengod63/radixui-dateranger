import React from "react";
import { useLocation } from "react-router-dom";
import {
  Panel,
  Box,
  HStack,
  VStack,
  Text,
  Select,
  Icon,
  Button,
} from "../components";
import Icons from "../app/Icons";
import { styled } from "../theme";
import {
  VenueContext,
  TimeRangeContext,
  AccountContext,
} from "../utils/GlobalContexts";
import { doTimes, MONTHS_FULL, MONTHS } from "../../utils";
import { getDefaultTimeRange } from "../../utils";

const Header = ({ user }) => {
  return (
    <>
      <Panel
        css={{
          position: "fixed",
          width: "calc($full - $navCollapsedWidth)",
          height: "calc($fullHeaderHeight)",
          left: "$navCollapsedWidth",
          zIndex: 100,
          justifyContent: "space-between",
          flexDirection: "row",
          display: "flex",
          flex: "1",
          gap: "$4",
        }}
      >
        {user.accounts.length > 1 && <AccountSelect user={user} />}
        <VenueSelect user={user} />
        <Box css={{ flex: "1" }} />
        <ComparisonMetrics />
      </Panel>
      {/* Block because other elements are position:fixed */}
      <Box css={{ height: "calc($fullHeaderHeight)" }} />
    </>
  );
};

const AccountSelect = ({ user }) => {
  const { venueId, setVenueId } = React.useContext(VenueContext) as any;
  const { accountId, setAccountId } = React.useContext(AccountContext) as any;
  const account = user.accounts.find((x) => x.id === accountId);

  const handleAccountChange = (value) => {
    const selectedAccount = user.accounts.find((x) => x.id === value);
    if (!account) Error(`there is no account with id ${value}`);

    setAccountId(value);
    setVenueId(selectedAccount.venues[0].surveyId);
  };

  return (
    <VStack
      css={{
        ml: "$2",
        mt: "$2",
        gap: "$1",
        mr: "$4",
        borderBottom: "2px solid $ppForest",
      }}
    >
      <Text.H4
        css={{
          fontSize: "10px",
          fontWeight: "bold",
          color: "$ppForest",
          textTransform: "uppercase",
        }}
      >
        Account
      </Text.H4>

      <Select
        trigger={() => {
          return (
            <HStack css={{ cursor: "pointer" }}>
              <Text.H3>{account.name}</Text.H3>
              <Icon
                icon={Icons.ChevronDown}
                css={{
                  fontSize: "20px",
                  display: "inline-block",
                  paddingLeft: "30px",
                }}
              />
            </HStack>
          );
        }}
        content={(onClose) => {
          return (
            <Panel
              css={{
                p: "0",
                position: "absolute",
                top: "40px",
                width: "300px",
              }}
            >
              <VStack>
                {user.accounts.map((account) => {
                  return (
                    <Text
                      onClick={() => {
                        onClose();
                        handleAccountChange(account.id);
                      }}
                      key={account.id}
                      css={{
                        cursor: "pointer",
                        p: "$3",
                        color: "$grey2",
                        gap: "$1",
                        "&:hover": {
                          backgroundColor: "$teal3",
                          color: "$ppForest",
                        },
                      }}
                    >
                      {account.name}
                    </Text>
                  );
                })}
              </VStack>
            </Panel>
          );
        }}
      />
    </VStack>
  );
};

const VenueSelect = ({ user }) => {
  const { venueId, setVenueId } = React.useContext(VenueContext) as any;
  const { accountId } = React.useContext(AccountContext) as any;
  const account = user.accounts.find((x) => x.id === accountId);
  const handleVenueChange = (value) => {
    setVenueId(value);
  };
  return (
    <VStack
      css={{
        ml: "$2",
        mt: "$2",
        gap: "$1",
        borderBottom: "2px solid $ppForest",
      }}
    >
      <Text.H4
        css={{
          fontSize: "10px",
          fontWeight: "bold",
          color: "$ppForest",
          textTransform: "uppercase",
        }}
      >
        Venue
      </Text.H4>

      <Select
        trigger={() => {
          const venue = account.venues.find((v) => v.surveyId === venueId);
          return (
            <HStack css={{ cursor: "pointer" }}>
              <Text.H3>{venue.name}</Text.H3>
              <Icon
                icon={Icons.ChevronDown}
                css={{
                  fontSize: "20px",
                  display: "inline-block",
                  paddingLeft: "30px",
                }}
              />
            </HStack>
          );
        }}
        content={(onClose) => {
          return (
            <Panel
              css={{
                p: "0",
                position: "absolute",
                top: "40px",
                width: "300px",
              }}
            >
              <VStack>
                {account.venues.map((venue) => {
                  return (
                    <Text
                      onClick={() => {
                        onClose();
                        handleVenueChange(venue.surveyId);
                      }}
                      key={venue.surveyId}
                      css={{
                        cursor: "pointer",
                        p: "$3",
                        color: "$grey2",
                        gap: "$1",
                        "&:hover": {
                          backgroundColor: "$teal3",
                          color: "$ppForest",
                        },
                      }}
                    >
                      {venue.name}
                    </Text>
                  );
                })}
              </VStack>
            </Panel>
          );
        }}
      />
    </VStack>
  );
};

const ComparisonMetrics = () => {
  const { timeRange, setTimeRange } = React.useContext(TimeRangeContext) as any;
  const [selectedRange, setSelectedRange] = React.useState(timeRange.to);

  const location = useLocation();
  // Disable the time selection component on the comments page.
  if (location.pathname.indexOf("/comments") === 0) {
    return null;
  }

  const defaultTimeRange = getDefaultTimeRange();
  const lastMonth = new Date(defaultTimeRange.to);

  const items = doTimes(11, (i) => {
    const prevMonth = new Date(defaultTimeRange.to);
    prevMonth.setDate(1);
    prevMonth.setMonth(prevMonth.getMonth() - i + 1);
    prevMonth.setDate(0);
    return prevMonth;
  });

  const handleTimeRangeChange = (value) => {
    setSelectedRange(value);

    const to = value;
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);
    from.setDate(from.getDate() + 1);
    const newTimeRange = { from, to };
    setTimeRange(newTimeRange);
  };

  const label = (date) => {
    const str = `${MONTHS_FULL[date.getMonth()]}  ${date.getFullYear()}`;
    return date.getFullYear() === lastMonth.getFullYear() &&
      date.getMonth() === lastMonth.getMonth()
      ? `Last Month`
      : str;
  };

  return (
    <>
      <Select
        css={{ zIndex: 100 }}
        trigger={() => {
          return (
            <SelectTrigger
              icon={Icons.Clock}
              title="Report Month"
              selection={label(selectedRange)}
            />
          );
        }}
        content={(onClose) => {
          return (
            <DateOptions
              onSelect={(value) => {
                onClose();
                handleTimeRangeChange(value);
              }}
            />
          );
        }}
      />
    </>
  );
};

const SelectTrigger = ({ icon, title, selection }) => {
  return (
    <HStack
      css={{
        cursor: "pointer",
        backgroundColor: "$grey0",
        color: "$ppForest",
        borderBottom: "2px solid $ppForest",
        padding: "$1",
        width: "300px",
        boxSizing: "border-box",
      }}
    >
      <Icon
        icon={icon}
        css={{ fontSize: "30px", display: "inline-block", mx: "$1" }}
      />
      <VStack css={{ gap: "$1", flex: "1" }}>
        <Text.Small css={{ color: "$grey2" }}>{title}</Text.Small>
        <Text.H3>{selection}</Text.H3>
      </VStack>
      <Icon
        icon={Icons.ChevronDown}
        css={{
          fontSize: "30px",
          display: "inline-block",
          top: "15px",
        }}
      />
    </HStack>
  );
};

const DateOptions = ({ onSelect }) => {
  const defaultTimeRange = getDefaultTimeRange();
  const lastMonth = new Date(defaultTimeRange.to);

  const [year, setYear] = React.useState(lastMonth.getFullYear());
  const [month, setMonth] = React.useState(lastMonth.getMonth());

  const monthButton = (index) => {
    const disabled =
      defaultTimeRange.to.getFullYear() === year &&
      index > defaultTimeRange.to.getMonth();
    const lastMonth =
      defaultTimeRange.to.getFullYear() === year &&
      index === defaultTimeRange.to.getMonth();

    const color = lastMonth ? "$ppForest" : "$grey3";
    const bgColour = lastMonth ? "$teal2" : "transparent";

    return (
      <Text
        css={{
          width: "25%",
          color: color,
          backgroundColor: bgColour,
          borderRadius: "3px",
          cursor: disabled ? "default" : "pointer",
          p: "$1",
          textAlign: "center",
          opacity: disabled ? 0.5 : 1,
          "&:hover": {
            backgroundColor: "$teal3",
          },
        }}
        onClick={() => {
          if (!disabled) {
            setMonth(index);
            const date = new Date(year, parseInt(index) + 1, 0);
            console.log(date);
            onSelect(date);
          }
        }}
      >
        {MONTHS[index]}
      </Text>
    );
  };

  const enableRight = year < defaultTimeRange.to.getFullYear();

  return (
    <Panel
      css={{
        position: "absolute",
        top: "60px",
        width: "300px",
        p: "$3",
        zIndex: 100,
      }}
    >
      <VStack css={{ gap: "$4" }}>
        <HStack css={{ color: "$ppForest" }}>
          <Icon
            icon={Icons.ChevronLeft}
            css={{ fontSize: "$6", cursor: "pointer" }}
            onClick={() => {
              setYear(year - 1);
            }}
          />
          <Text
            css={{
              flex: 1,
              textAlign: "center",
              fontSize: "$4",
              lineHeight: "$6",
            }}
          >
            {year}
          </Text>
          <Icon
            icon={Icons.ChevronRight}
            css={{
              fontSize: "$6",
              color: !enableRight ? "$grey2" : "$ppForest",
              cursor: !enableRight ? "default" : "pointer",
            }}
            onClick={() => {
              if (enableRight) {
                setYear(year + 1);
              }
            }}
          />
        </HStack>
        <HStack>
          {monthButton(0)}
          {monthButton(1)}
          {monthButton(2)}
          {monthButton(3)}
        </HStack>
        <HStack>
          {monthButton(4)}
          {monthButton(5)}
          {monthButton(6)}
          {monthButton(7)}
        </HStack>
        <HStack>
          {monthButton(8)}
          {monthButton(9)}
          {monthButton(10)}
          {monthButton(11)}
        </HStack>
      </VStack>
    </Panel>
  );
};

const StyledHeader = styled(Header);

export default StyledHeader;
