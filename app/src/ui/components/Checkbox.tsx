import React from "react";
import { styled } from "@stitches/react";
import { HStack } from "./index";

const Checkbox = styled("input", {
  appearance: "none",
  backgroundColor: "#D9D9D9",
  width: 15,
  height: 15,
  cursor: "pointer",
  "&:checked": {
    backgroundColor: "$ppForest",
  },
});

const Label = styled("label", { cursor: "pointer" });

const CheckboxComposed = ({
  label,
  checked,
  onCheckedChange = null,
  size = 15,
}) => {
  const id = Math.random();
  const labelColor = checked ? "$ppForest" : "$grey2";
  return (
    <HStack css={{ gap: "$2", alignItems: "center" }}>
      <Checkbox
        id={String(id)}
        type="checkbox"
        checked={checked}
        css={{ width: size, height: size }}
        onChange={(event) => {
          if (onCheckedChange) {
            onCheckedChange(event.target.checked);
          }
        }}
      />
      <Label htmlFor={String(id)} css={{ color: labelColor }}>
        {label}
      </Label>
    </HStack>
  );
};

export default CheckboxComposed;
