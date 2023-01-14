import getSpacing from "../../services/spacing";

import breakpoints from "./constants/breakpoints";
import images from "./constants/images";
import palette from "./constants/palette";
import typography from "./constants/typography";

const BASE_SPACING = 8;

const theme = {
  breakpoints,
  images,
  palette,
  typography,
  spacing: getSpacing(BASE_SPACING),
};

export default theme;
