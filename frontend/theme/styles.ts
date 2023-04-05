import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "gray.800")(props),
      lineHeight: "base",
    },
  }),
};

export default styles;
