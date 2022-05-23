import "./ShoppingCartItem.scss";

import React, { useState } from "react";

import IconSvg from "../../IconSvg/IconSvg";
import cartActions from "../../../redux/actions/cartActions";
import { checkingProductsAvailability } from "../../../services/utils/productUtils";
import { useDebouncedEffect } from "../../../services/useDebouncedEffect";
import { useDispatch } from "react-redux";

const ShoppingCartItem = ({ product, isCheckout }) => {
	const dispatch = useDispatch();
	const {
		candleId,
		typeId,
		typeEnName,
		sizeEnName,
		scentsEnName,
		price,
		quantity,
		isAvailable,
	} = product;

	const [quantityValue, setQuantityValue] = useState(quantity);

	//debouncing redux dispatch of quantity value update to prevent multiple calculation of new store content
	useDebouncedEffect(
		() => {
			dispatch({
				...cartActions.CART_EDIT_QUANTITY_PRODUCT,
				payload: { candleId: product.candleId, newQuantity: quantityValue },
			});
			checkingProductsAvailability([product], dispatch, cartActions.CART_EDIT_STOCK_PRODUCT);
		},

		550,
		[quantityValue]
	);

	const deleteCandleFromCart = () => {
		dispatch({
			...cartActions.CART_DELETE_PRODUCT,
			payload: { candleId: candleId },
		});
	};

	return (
		<div
			className={"productRow" + (isCheckout ? " checkoutDisplay" : "")}
			key={"candleCart" + candleId}
		>
			<div className="productImg">
				<img
					src={`/images/candle_types/candle_type_${typeId}_1.jpg`}
					alt={`${typeEnName} candles`}
				/>
			</div>
			<div className="productInfos">
				<div className="titlePriceWrapper">
					<p className="productTitle usualText mediumBold">
						{`${sizeEnName} 
                ${scentsEnName} 
                ${typeEnName} candle`}
					</p>
					<p className="mediumText mediumBold">{price.toFixed(2)} €</p>
				</div>

				<div className="productActions">
					{!isCheckout ? (
						<div className="quantityInput">
							<input
								id="number"
								value={quantityValue}
								type="number"
								min="1"
								max="15"
								onChange={(e) => setQuantityValue(e.target.value)}
							/>
						</div>
					) : (
						<div className="smallText">
							<p>Quantity : {quantityValue}</p>
						</div>
					)}

					<button className="mediumText" onClick={() => deleteCandleFromCart()}>
						Delete
					</button>
				</div>

				<div className="availabilityIndic smallText">
					<div className={"availabilityIcon" + (isAvailable ? " success" : " failed")}>
						<IconSvg iconName={isAvailable ? "checkArrow" : "closeCross"} />
					</div>

					<p>{isAvailable ? "Available" : "No stock"}</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartItem;
