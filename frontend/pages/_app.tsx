import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { setupStore } from "@/store";

const store = setupStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
