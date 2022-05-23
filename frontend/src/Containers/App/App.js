import "./App.scss";
import "../../style/primary.scss";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Router from "../../Components/Router/Router";
import { ToastProvider } from "../../Components/Toasts/ToastProvider";
import Toasts from "../../Components/Toasts/Toasts";
import { ViewportProvider } from "../../Components/ViewportProvider/ViewportProvider";
import store from "../../redux/store";
import ScrollToTop from "../../services/ScrollToTop";

function App() {
  return (
    <ViewportProvider>
      <ToastProvider>
        <div className="App">
          <Provider store={store}>
            <BrowserRouter>
              <ScrollToTop />
              <Router></Router>
              <Toasts />
            </BrowserRouter>
          </Provider>
        </div>
      </ToastProvider>
    </ViewportProvider>
  );
}

export default App;
