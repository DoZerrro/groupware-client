import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import ModalProvider from "@components/modal/ModalProvider";
import ModalContainer from "@components/modal/ModalContainer";
import GlobalStyles from "./styles/GlobalStyles";


import { store } from "./store/store";

import Client from "./Client";

const rootElement = document.querySelector("#root");

const root = (
  <BrowserRouter>
    <ModalProvider>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Client />
          <ModalContainer />
        </Provider>
      </ThemeProvider>
    </ModalProvider>
  </BrowserRouter>
);
if (process.env.NODE_ENV === "development") {
  render(root, rootElement);
} else {
  hydrate(root, rootElement);
}

