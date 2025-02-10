import React from "react";
import { HStack, VStack, Box } from "./index";

const Select = ({ trigger, content, css = {} }) => {
  document.body.onclick = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  return (
    <VStack
      onClick={(e) => {
        e.stopPropagation();
      }}
      css={css}
    >
      <Trigger
        onClick={() => {
          setOpen(!open);
        }}
        trigger={trigger}
      />
      <Content
        content={content}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </VStack>
  );
};

const Trigger = ({ trigger, onClick }) => {
  return <HStack onClick={onClick}>{trigger()}</HStack>;
};

const Content = ({ content, open, onClose, css = null }) => {
  return (
    <Box css={{ position: "fixed", display: open ? "block" : "none", ...css }}>
      {content(onClose)}
    </Box>
  );
};

export default Select;
