import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { styled } from "../theme";
import { VStack } from "../components";

const SliderComposed = ({
  defaultValue = 0,
  max = 100,
  step = 1,
  ariaLabel = "",
  disabled = false,
  ...rest
}) => {
  return (
    <SliderRoot
      defaultValue={[defaultValue]}
      max={max}
      step={step}
      aria-label={ariaLabel}
      disabled={disabled}
      {...rest}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderRoot>
  );
};
const SliderRoot = styled(Slider.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100,
  },
});

const SliderTrack = styled(Slider.Track, {
  backgroundColor: "$lowContrast",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",
  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const SliderRange = styled(Slider.Range, {
  position: "absolute",
  backgroundColor: "$highContrast",
  borderRadius: "9999px",
  height: "100%",
});

const SliderThumb = styled(Slider.Thumb, {
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "$minContrast",
  border: "1px solid $lowContrast",
  borderRadius: 50,
  cursor: "pointer",
  "&:hover": { backgroundColor: "$background" },
  "&:focus": { outline: "none" },
});

const LabelledSlider = ({
  labels = [],
  defaultValue = 0,
  onValueChange,
  ...rest
}) => {
  const [label, setLabel] = React.useState(labels[defaultValue]);

  const LabelContainer = styled("span", {
    paddingTop: "5px",
    width: "100%",
    color: "$highContrast",
    textAlign: "center",
  });
  return (
    <VStack css={{ width: rest?.css?.width || "200px" }}>
      <SliderComposed
        {...rest}
        defaultValue={defaultValue}
        css={{ width: "100%" }}
        onValueChange={(v) => {
          setLabel(labels[v[0]]);
          onValueChange &&
            typeof onValueChange === "function" &&
            onValueChange(v);
        }}
      />
      <LabelContainer>{label}</LabelContainer>
    </VStack>
  );
};

export { LabelledSlider };

export default SliderComposed;
