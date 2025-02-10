import React from "react";

import { Panel, Box, HStack, VStack, Text, Select, Icon } from "./index";

import Icons from "../app/Icons";

const SimpleSelect = ({ selected, options, onChange, css = {} }) => {
  return (
    <Select
      css={css}
      trigger={() => {
        return <SelectTrigger selected={selected} />;
      }}
      content={(onClose) => {
        return (
          <SelectContent
            options={options}
            onChange={onChange}
            onClose={onClose}
          />
        );
      }}
    />
  );
};

const SelectTrigger = ({ selected }) => {
  return (
    <HStack
      css={{
        cursor: "pointer",
        color: "$ppForest",
        borderBottom: "2px solid $ppForest",
        padding: "$1",
        width: "300px",
        boxSizing: "border-box",
        justifyContent: "space-between",
      }}
    >
      <Text.H3 css={{}}>{selected.label}</Text.H3>
      <Icon
        icon={Icons.ChevronDown}
        css={{
          fontSize: "30px",
          display: "inline-block",
        }}
      />
    </HStack>
  );
};

const SelectContent = ({ options, onChange, onClose }) => {
  return (
    <Panel
      css={{
        p: "0",
        position: "absolute",
        top: "40px",
        width: "300px",
        zIndex: "100",
      }}
    >
      <VStack css={{ maxHeight: "300px", overflowX: "scroll" }}>
        {options.map((o) => {
          return (
            <Text
              onClick={() => {
                onClose();
                onChange(o);
              }}
              key={o.id}
              css={{
                cursor: "pointer",
                p: "$2",
                color: "$grey2",
                "&:hover": {
                  backgroundColor: "$teal3",
                  color: "$ppForest",
                },
              }}
            >
              {o.label}
            </Text>
          );
        })}
      </VStack>
    </Panel>
  );
};

export default SimpleSelect;
