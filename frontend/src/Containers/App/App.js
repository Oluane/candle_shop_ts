import "./App.scss";
import "../../style/primary.scss";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Router from "../../Components/Router/Router";
import ScrollToTop from "../../services/ScrollToTop";
import { ToastProvider } from "../../Components/Toasts/ToastProvider";
import Toasts from "../../Components/Toasts/Toasts";
import { ViewportProvider } from "../../Components/ViewportProvider/ViewportProvider";
import store from "../../redux/store";

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
