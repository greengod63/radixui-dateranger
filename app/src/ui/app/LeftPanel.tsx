import React from "react";
import { Link } from "react-router-dom";
import { VStack, HStack, Box, Icon } from "../components";
import Nav from "./Nav";
import { styled } from "../theme";
import Logo from "./Logo";
import LogoText from "./LogoText";
import Icons from "./Icons";

const LOGO_SIZE = 45;

const LeftPanel = ({ user }) => {
  const [navCollapsed, setNavCollapsed] = React.useState(true);

  return (
    <Box
      onMouseEnter={() => setNavCollapsed(false)}
      onMouseLeave={() => setNavCollapsed(true)}
      css={{
        m: "$0",
        width: "$navCollapsedWidth",
        height: "$full",
        position: "fixed",
        backgroundColor: "$ppForest",
        transition: `width 300ms ease-out`,
        zIndex: "1000",
        "&:hover": {
          width: "$navWidth",
        },
      }}
    >
      <VStack css={{ height: "calc(100% - $2 - $2)" }}>
        <HStack css={{ overflowX: "hidden" }}>
          <Logo size={LOGO_SIZE} css={{ ml: "25px", mt: "$3" }} />
          <LogoText size={190} visible={!navCollapsed} css={{ mt: "20px" }} />
        </HStack>

        <Nav collapsed={navCollapsed} />
        <Initials user={user} collapsed={navCollapsed} />
      </VStack>
    </Box>
  );
};

const Initials = ({ user, collapsed }) => {
  let initials = "";
  try {
    const pieces = user.name.split(" ");
    const first = pieces[0];
    const last = pieces[pieces.length - 1];
    initials = first[0] + last[0];
    initials = initials.toUpperCase();
  } catch (e) {
    initials = "??";
  }

  return (
    <HStack css={{ position: "absolute", left: "10px", bottom: "10px" }}>
      <Box
        css={{
          color: "$ppNavy",
          margin: "10px",
          backgroundColor: "white",
          br: "$round",
          size: "calc($headerHeight - 20px)",
          textAlign: "center",
          lineHeight: "calc($headerHeight - 20px)",
          fontSize: "15px",
          fontWeight: "semi-bold",
        }}
      >
        {initials}
      </Box>
      <Link to="/logout" css={{ textDecoration: "none" }}>
        <HStack
          css={{
            fontSize: "14px",
            color: "$ppForestContrast",
            ml: "10px",
            mt: "18px",
            cursor: "pointer",
            transition: `opacity 200ms ease-out`,
            opacity: collapsed ? 0 : 1,
            "&:hover": {
              color: "$neutral0",
            },
          }}
        >
          <Icon
            icon={Icons.Logout}
            css={{ fontSize: "20px", display: "inline-block", mr: "$1" }}
          />
          Logout
        </HStack>
      </Link>
    </HStack>
  );
};

const StyledLeftPanel = styled(LeftPanel);

export default StyledLeftPanel;
