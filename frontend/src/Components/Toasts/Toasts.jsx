import "./Toasts.scss";

import React, { useContext, useEffect } from "react";

import IconSvg from "../IconSvg/IconSvg";
import { ToastContext } from "./ToastProvider";

const ToastBody = ({ toast, dispatch }) => {
	useEffect(() => {
		let timeOut = setTimeout(() => {
			dispatch({ type: "REMOVE_TOAST", payload: { id: toast.id } });
		}, 5000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [dispatch, toast.id]);

	return (
		<div id={toast.id} className="toastBody mediumText fadeIn">
			<div className="statusIcon">
				{toast.status === "failed" && <IconSvg iconName="error" className={toast.status} />}
				{toast.status === "success" && (
					<IconSvg iconName="checkArrow" className={toast.status} />
				)}
			</div>
			<p>{toast.text}</p>

			<div
				className="closeIcon"
				onClick={() => dispatch({ type: "REMOVE_TOAST", payload: { id: toast.id } })}
			>
				<IconSvg iconName="closeCross" />
			</div>
		</div>
	);
};

const Toasts = () => {
	const [toasts, dispatch] = useContext(ToastContext);

	return (
		<div className="toastsContainer">
			{toasts.map((toast) => (
				<ToastBody toast={toast} key={"toast" + toast.id} dispatch={dispatch} />
			))}
		</div>
	);
};

export default Toasts;
