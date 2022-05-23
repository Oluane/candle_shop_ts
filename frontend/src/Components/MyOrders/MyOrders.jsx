//import { useSelector, useDispatch } from "react-redux";
import "./MyOrders.scss";

import NoContent from "../NoContent/NoContent";
import React from "react";

const MyOrders = () => {
	// const currentUser = useSelector((state) => state.user.data);
	// const dispatch = useDispatch();

	return (
		<div className="myOrders alignCenter">
			<h2 className="sectionTitle">MY ORDERS</h2>

			<NoContent
				iconName="emptyBox"
				text="You haven't any order yet !"
				linkText="Start shopping !"
				linkPath="/candles"
			/>
		</div>
	);
};

export default MyOrders;
