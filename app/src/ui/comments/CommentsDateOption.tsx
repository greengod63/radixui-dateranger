import React, { useEffect, useState } from "react";

import {
  Panel,
  VStack,
  HStack,
  Text,
  Select,
  Icon,
  Checkbox,
  HRule,
  Button,
  Accordion,
} from "../components";
import Icons from "../app/Icons";

// By Takao  - Rsuite DateRangePicker
import { DateRangePicker } from "rsuite";
import { formatAllNumberDate } from "../../utils";

const CommentsDateOption = () => {
  // Start Date - End Date as Array
  const [value, setValue] = useState<[Date, Date]>([new Date(), new Date()]);

  // string like "dd/MM/yyyy - dd/MM/yyyy"
  const [toggleElement, setToggleElement] = useState(
    formatAllNumberDate(new Date()) + " - " + formatAllNumberDate(new Date())
  );

  // When user clicks "Apply" Button
  const handleApply = (value: [Date, Date]) => {
    setToggleElement(
      formatAllNumberDate(value[0]) + " - " + formatAllNumberDate(value[1])
    );
    setValue(value);
  };

  // "Cancel" Button
  const predefinedRanges: Array<any> = [
    {
      label: "Cancel",
      value: value,
      appearance: "default",
    },
  ];

  // toggle Component clicked to show Calendar
  const toggleComponent = React.forwardRef(() => {
    return (
      <HStack
        css={{
          cursor: "pointer",
          color: "$ppForest",
          padding: "$1",
          boxSizing: "border-box",
          width: "220px",
          borderBottom: "2px solid $ppForest",
          justifyContent: "space-between",
          gap: "$2",
        }}
      >
        {toggleElement}{" "}
        <Icon
          icon={Icons.ChevronDown}
          css={{
            fontSize: "30px",
            display: "inline-block",
          }}
        />
      </HStack>
    );
  });

  return (
    <>
      <DateRangePicker
        size="md"
        appearance="subtle"
        character=" - "
        placeholder={renderValue([new Date(), new Date()])}
        placement="bottomEnd"
        cleanable={false}
        format="dd/MM/yyyy"
        value={value}
        locale={{
          sunday: "S",
          monday: "M",
          tuesday: "T",
          wednesday: "W",
          thursday: "T",
          friday: "F",
          saturday: "S",
          ok: "Apply",
        }}
        ranges={predefinedRanges}
        editable={false}
        renderTitle={renderTitle}
        renderValue={(value) => renderValue(value)}
        onOk={handleApply}
        toggleAs={toggleComponent}
      />
    </>
  );
};

// Month Title like "April 2023"
const renderTitle = (date: Date) => {
  return (
    <Text.H3 css={{ color: "$ppForest", fontSize: "16px" }}>
      {date.toLocaleDateString("en-US", { year: "numeric", month: "long" })}
    </Text.H3>
  );
};

// "From Date", "To Date" like "From Date  dd/MM/yyyy"
const renderValue = (value: any) => {
  return (
    <HStack
      css={{
        color: "$ppForest",
        padding: "$1",
        boxSizing: "border-box",
        justifyContent: "space-between",
        gap: "$2",
      }}
    >
      <VStack
        css={{
          mt: "$2",
          gap: "$1",
          justifyContent: "left",
          width: "48%",
          borderBottom: "2px solid $ppForest",
        }}
      >
        <Text.H4
          css={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "$ppForest",
          }}
        >
          From date
        </Text.H4>
        <Text.H3>{formatAllNumberDate(value[0])}</Text.H3>
      </VStack>

      <VStack
        css={{
          mt: "$2",
          gap: "$1",
          justifyContent: "left",
          width: "48%",
          borderBottom: "2px solid $ppForest",
        }}
      >
        <Text.H4
          css={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "$ppForest",
          }}
        >
          To date
        </Text.H4>
        <Text.H3>{formatAllNumberDate(value[1])}</Text.H3>
      </VStack>
    </HStack>
  );
};

export default CommentsDateOption;
