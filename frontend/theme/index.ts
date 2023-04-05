// theme/index.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundations overrides
import colors from "./foundations/colors";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const overrides = {
  colors,
  config,
  styles,
  // Other foundational style overrides go here
  //   components: {
  //     Button,
  // Other components go here
  //   },
};

export default extendTheme(overrides);
