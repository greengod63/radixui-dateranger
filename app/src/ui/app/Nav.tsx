import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon, HRule, Box, HStack, VStack } from "../components";
import Icons from "./Icons";
import { trimChars } from "../../utils";

const NavItem = ({ icon, label, route, collapsed }) => {
  // const active = loc.pathname.indexOf(route) === 0;
  return (
    <>
      <Link to={route}>
        <HStack
          css={{
            width: `calc(100% - $2)`,
            p: "$2",
            cursor: "pointer",
            fontSize: "14px",
            color: "$ppForestContrast",
            textAlign: "center",
            alignItems: "center",
            "&:hover": {
              color: "$neutral0",
            },
          }}
        >
          {icon && (
            <Box css={{ ml: "$2", mr: "$2" }}>
              <Icon
                icon={icon}
                css={{ fontSize: "30px", display: "inline-block" }}
              />
            </Box>
          )}
          <Box
            css={{
              fontSize: "16px",
              display: collapsed ? "none" : "block",
              transition: `opacity 2000ms ease-in 500ms`,
              textWrap: "nowrap",
              opacity: collapsed ? 0 : 1,
            }}
          >
            {label}
          </Box>
          <HRule />
        </HStack>
      </Link>
    </>
  );
};

// const activeNav = (path, route) => {
//   path = trimChars(path, "/");
//   route = trimChars(route, "/");
//   return path.indexOf(route) === 0;
// };

const Nav = ({ collapsed }) => {
  return (
    <VStack css={{ mt: "40px", gap: "$3" }}>
      <NavItem
        collapsed={collapsed}
        icon={Icons.House}
        label={"NPS+ Summary"}
        route="/dashboard"
      />
      <NavItem
        collapsed={collapsed}
        icon={Icons.Network}
        label={"Touchpoints"}
        route="/touchpoints"
      />
      <NavItem
        collapsed={collapsed}
        icon={Icons.Comment}
        label={"Comments"}
        route="/comments"
      />
      {/* <NavItem
        collapsed={collapsed}
        icon={Icons.Account}
        label={"Audience"}
        route="/audience"
      />
      <NavItem
        collapsed={collapsed}
        icon={Icons.BarGraph}
        label={"NPS+"}
        route="/nps-plus"
      />
      <NavItem
        collapsed={collapsed}
        icon={Icons.Donut}
        label={"Touchpoints"}
        route="/touchpoints"
      />
      <NavItem
        collapsed={collapsed}
        icon={Icons.Store}
        label={"Experience Themes"}
        route="/themes"
      />
      <NavItem
        collapsed={collapsed}
        icon={Icons.Database}
        label={"Commentary"}
        route="/commentary"
      /> */}

      {/* Handle */}
      {/* <Box
        css={{
          top: "calc(50% - 15px)",
          position: "absolute",
          width: "30px",
          height: "30px",
          left: "calc(100% - 15px)",
          backgroundColor: "white",
          boxShadow: "$shadow",
          br: "$round",
          zIndex: 100,
          textAlign: "center",
          lineHeight: "30px",
        }}
      >
        <Icon
          css={{
            fontSize: "16px",
            display: "inline-block",
            mt: "7px",
          }}
        />
      </Box> */}
    </VStack>
  );
};
export default Nav;
