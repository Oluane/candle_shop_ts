import React, { createContext, useReducer } from "react";

const ToastContext = createContext({});

const toastReducer = (state, action) => {
	const { payload, type } = action;
	switch (type) {
		case "ADD_TOAST":
			return [...state, payload];
		case "REMOVE_TOAST":
			return state.filter((toast) => payload.id !== toast.id);
		default:
			return [...state];
	}
};

const ToastProvider = ({ children }) => {
	const reducer = useReducer(toastReducer, []);

	return <ToastContext.Provider value={reducer}>{children}</ToastContext.Provider>;
};

export { ToastContext, ToastProvider };
