import { rem } from "polished";

const theme = {
  color: {
    sidebar: "#343947",

    white: "#FFFFFF",
    whiteA100: "#FFFFFFFF",
    whiteA050: "#FFFFFF80",
    whiteA000: "#FFFFFF00",

    gray900: "#464d52",
    gray800: "#5a5a5a",
    gray700: "#868686",
    gray600: "#999999",
    gray500: "#C3C3C3",
    gray450: "#C8C8C8",
    gray400: "#D8D8D8",
    gray350: "#E6E6E6",
    gray300: "#ECECEC",
    gray200: "#F2F4F6",
    gray100: "#F5F5F5",
    gray50: "#FAFAFA",

    grayA100: "#D8D8D8FF",
    grayA050: "#D8D8D850",
    grayA000: "#D8D8D800",

    blue500: "#5673EB",
    blue400: "#95A7EE",
    blue300: "#CAD3F8",
    blue200: "#D5DBF3",
    blue100: "#EFF2FF",

    blueA100: "#5673EBFF",
    blueA050: "#5673EB50",
    blueA000: "#5673EB00",

    red500: "#EB5374",
    red100: "#FDEAEE",

    pink500: "#BF2E70",
    pink100: "#F7E5ED",

    background: "#FFFFFF",


    douzoneBlue: "#00AAFF",
    amaranthPurple: "#8168FF",

    icon: "#666666",
    hoverIcon: "#858891",
    activeIcon: "#FFFFFF",

    activeBDBlue: "#46A3FB",
    activeBGBlue: "#E5F6FF",
  },

  typo: {
    heading1: () => ({
      fontSize: rem(28),
      fontWeight: 700,
    }),
    heading2: () => ({
      fontSize: rem(18),
      fontWeight: 700,
    }),
    heading3: () => ({
      fontSize: rem(16),
      fontWeight: 700,
    }),
    subtitle1: () => ({
      fontSize: rem(15),
      fontWeight: 700,
    }),
    subtitle2: () => ({
      fontSize: rem(14),
      fontWeight: 700,
    }),
    subtitle3: () => ({
      fontSize: rem(13),
      fontWeight: 700,
    }),
    xxl: rem(14),
    xl: rem(13),
    lg: rem(12),
    md: rem(11),
    sm: rem(10),
  },

  ui: {
    gnbSidebar: "50px",
    gnbSidebarOpen: "150px",
    lnbSidebar: "200px",
    header: "100px",
    subHeader: "50px",
    moduleTitle: "40px",
  },

  shadow: {
    shadowSm: "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)",
    shadow: "box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    shadowMd: "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    shadowLg: "box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    shadowXl: "box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    shadow2xl: "box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)",
    shadowInner: "box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
};

export default theme;
