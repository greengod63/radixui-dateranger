import React from "react";
import { Box } from "../components";

const Logo = ({ size, css = null }) => {
  const w = size * 0.75;
  const h = size;
  return (
    <Box css={css}>
      <svg
        width={w}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 66.15 84.82"
      >
        <g id="Layer_1-2" data-name="Layer 1">
          <rect fill="#81e5d9" width="33.08" height="65.95" />
          <rect fill="#c291fc" y="65.95" width="33.08" height="18.88" />
          <path
            fill="#03ccb2"
            d="m33.08,0v65.95c18.27,0,33.08-14.76,33.08-32.97S51.35,0,33.08,0"
          />
        </g>
      </svg>
    </Box>
  );
};

export default Logo;
