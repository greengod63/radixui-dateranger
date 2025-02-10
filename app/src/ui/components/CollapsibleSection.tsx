import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as Collapsible from "@radix-ui/react-collapsible";

const CollapsibleRoot = styled(Collapsible.Root, {});

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-collapsible-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-collapsible-content-height)" },
  to: { height: 0 },
});

const CollapsibleContent = styled(Collapsible.Content, {
  overflow: "hidden",
  "&[data-state='open']": {
    animation: `${slideDown} 300ms ease-out`,
  },
  "&[data-state='close']": {
    animation: `${slideUp} 300ms ease-out`,
  },
});

const CollapsibleComposed = ({ open = false, children, css = {} }) => {
  return (
    <CollapsibleRoot open={open} css={css}>
      <CollapsibleContent>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default CollapsibleComposed;
