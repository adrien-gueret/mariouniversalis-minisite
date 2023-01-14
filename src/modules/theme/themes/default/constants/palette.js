export const baseColors = {
  lightBlack: "#272827",
  black: "rgba(0, 0, 0, .9)",
  white: "rgba(255, 255, 255, .9)",
  red: "#da0202",
  green: "#34a838",
  grey: "rgba(128, 128, 128, .9)",
  semiAlpha: "rgba(0, 0, 0, .1)",
};

const palette = {
  text: {
    default: baseColors.black,
    contrasted: baseColors.white,
    light: baseColors.grey,
  },
  background: {
    primary: baseColors.lightBlack,
    secondary: baseColors.white,
    focus: baseColors.semiAlpha,
  },
  button: {
    primary: baseColors.red,
  },
  line: baseColors.lightBlack,
};

export default palette;
