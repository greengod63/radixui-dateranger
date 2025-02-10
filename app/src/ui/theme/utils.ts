const utils = {
  // Abbreviated margin properties
  m: (value) => ({ margin: value }),
  mt: (value) => ({ marginTop: value }),
  mr: (value) => ({ marginRight: value }),
  mb: (value) => ({ marginBottom: value }),
  ml: (value) => ({ marginLeft: value }),
  mx: (value) => ({ marginLeft: value, marginRight: value }),
  my: (value) => ({ marginTop: value, marginBottom: value }),
  // Abbreviated padding properties
  p: (value) => ({ padding: value }),
  pt: (value) => ({ paddingTop: value }),
  pb: (value) => ({ paddingBottom: value }),
  pl: (value) => ({ paddingLeft: value }),
  pr: (value) => ({ paddingRight: value }),
  px: (value) => ({ paddingLeft: value, paddingRight: value }),
  py: (value) => ({ paddingTop: value, paddingBottom: value }),

  // A property for applying width/height together
  size: (value) => ({ width: value, height: value }),

  // A property to apply linear gradient
  linearGradient: (value) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),

  // An abbreviated property for border-radius
  br: (value) => ({
    borderRadius: value,
  }),

  brRight: (value) => ({
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
  }),

  primaryHover: () => {
    return {
      "&:hover": {
        color: "$primaryContrast",
        backgroundColor: "$teal4",
      },
    };
  },

  hoverBackground: (color) => {
    return {
      "&:hover": {
        backgroundColor: color,
      },
    };
  },

  primaryGradient: () => {
    return { linearGradient: `19deg, $lightPrimary 0%, $secondary 100%` };
  },

  simpleBorder: (color = "$mediumContrast") => {
    return {
      border: `1px solid ${color}`,
    };
  },

  primaryActive: (activeColor = "$primary") => {
    if (activeColor) {
      return {
        color: "$primaryContrast",
        backgroundColor: activeColor,
      };
    }
    return {};
  },
};

export default utils;
