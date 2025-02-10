import React from "react";
import { HStack, VStack, Stack } from "./Stack";
import Text from "./Text";

const H_HEIGHT = 75;

const swatchCSS = {
  flex: 1,
  padding: "$2",
  height: `${H_HEIGHT}px`,
  justifyContent: "space-between",
  boxSizing: "border-box",
  backgroundColor: "$grey0",
  color: "$ppForest",
  borderBottom: "1px solid $ppForest",
};

const SwatchBase = ({
  children = null,
  active = false,
  interactive = true,
  onClick = null,
  css: cssOverrides = null,
  ...args
}) => {
  let css: any = {
    ...swatchCSS,
    ...cssOverrides,
  };

  if (interactive) {
    css.cursor = "pointer";
  }

  if (active) {
    css = {
      ...css,
      backgroundColor: "$teal2",
      height: `${H_HEIGHT + 1}px`,
      borderBottom: "2px solid $ppForest",
    };
    css.backgroundColor = "$teal2";
  }

  return (
    <Stack onClick={onClick} css={css}>
      {children}
    </Stack>
  );
};

const ScoreSwatch = (props) => {
  let { title, score, change } = props;
  score = Math.round(score);

  if (props.formatter) {
    score = props.formatter(score);
  }

  return (
    <SwatchBase {...props}>
      <VStack>
        <Text.Small>{title}</Text.Small>
        <HStack css={{ alignItems: "end" }}>
          <Text.H1>{score}</Text.H1>
          {!isNaN(change) && <ScoreChange change={change} />}
        </HStack>
      </VStack>
    </SwatchBase>
  );
};

const ScoreChange = ({ change, css = {} }) => {
  change = Math.round(change * 100);
  let color = "$positiveGreen";
  let changeStr = "↑";
  if (change < 0) {
    color = "$negativeRed";
    changeStr = "↓";
    change = change * -1;
  }
  changeStr += `${change}%`;
  return (
    <Text.Tiny css={{ color: color, mb: "$1", ml: "$2", ...css }}>
      {changeStr}
    </Text.Tiny>
  );
};

const TouchpointSwatch = (props) => {
  let { title, subtitle, score, change } = props;
  score = Math.round(score);

  if (props.formatter) {
    score = props.formatter(score);
  }

  return (
    <SwatchBase
      {...props}
      css={{
        backgroundColor: "white",
        p: "0",
        py: "$3",
        borderBottom: "1px solid $grey2",
      }}
    >
      <HStack css={{ justifyContent: "space-between", gap:"$2", width: "100%" }}>
        <VStack css={{ flex: 1, gap: "$2" }}>
          <Text.H4 css={{ textAlign: "left" }}>{title}</Text.H4>
          <Text.Tiny css={{ color: "$grey2" }}>{subtitle}</Text.Tiny>
        </VStack>
        <HStack>
          <Text.H1 css={{ alignSelf: "center" }}>{score}%</Text.H1>

          {!isNaN(change) && (
            <ScoreChange change={change} css={{ alignSelf: "center" }} />
          )}
        </HStack>
      </HStack>
    </SwatchBase>
  );
};

const HSet = ({ children = null, css = {} }) => {
  return <HStack css={{ ...css, gap: "$1" }}>{children}</HStack>;
};

const VSet = ({ children = null, css = {} }) => {
  return <VStack css={{ gap: "$1", ...css }}>{children}</VStack>;
};

const Swatch = { HSet, VSet, ScoreSwatch, ScoreChange, TouchpointSwatch };

export default Swatch;
