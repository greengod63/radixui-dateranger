import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { styled, keyframes } from "@stitches/react";
import { Icon } from "./index";
import Icons from "../app/Icons";
// import { violet, blackA, mauve } from "@radix-ui/colors";
// import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionComposed = ({
  type = "multiple",
  collapsible = true,
  items,
  css = {},
}) => (
  <AccordionRoot css={css} type={type} collapsible={collapsible.toString()}>
    {items.map((item, index) => {
      return (
        <AccordionItem value={item.label} key={item.label}>
          <AccordionTrigger>{item.label}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      );
    })}
  </AccordionRoot>
);

const AccordionRoot: any = styled(Accordion.Root, {});

const AccordionItem = styled(Accordion.Item, {
  overflow: "hidden",
});

const AccordionTrigger = React.forwardRef(
  ({ children, ...props }: any, forwardedRef) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden>
          <Icon icon={Icons.ChevronDown} />
        </StyledChevron>
      </StyledTrigger>
    </StyledHeader>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, ...props }: any, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  )
);

const StyledHeader = styled(Accordion.Header, {
  all: "unset",
  display: "flex",
  borderBottom: "1px solid $lowContrast",
  cursor: "pointer",
});

const StyledTrigger = styled(Accordion.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "transparent",
  // padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 15,
  lineHeight: 1,
});

const StyledChevron = styled("span", {
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const StyledContent = styled(Accordion.Content, {
  overflow: "hidden",
  fontSize: 15,
  borderBottom: "1px solid $lowContrast",
  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const StyledContentText = styled("div", {
  padding: "15px 20px",
});

export default AccordionComposed;
