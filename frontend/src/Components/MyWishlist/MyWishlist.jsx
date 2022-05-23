import "./MyWishlist.scss";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import DropdownMobile from "../DropdownMobile/DropdownMobile";
import IconSvg from "../IconSvg/IconSvg";
import { Link } from "react-router-dom";
import NoContent from "../NoContent/NoContent";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api/api";
import cartActions from "../../redux/actions/cartActions";
import { fetchCandleInfosFromId } from "../../services/api/candles";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";
import wishlistActions from "../../redux/actions/wishlistActions";

const itemsToDisplayOnInit = 6;

const MyWishlist = () => {
	const currentUser = useSelector((state) => state.user.data);
	const wishlist = useSelector((state) => state.wishlist);
	const wishlistProducts = useSelector((state) => state.wishlist.products);
	const cartProducts = useSelector((state) => state.cart.products);
	const dispatch = useDispatch();

	const [displayAllItems, setDisplayAllItems] = useState(false);

	const [, dispatchToast] = useContext(ToastContext);
	const { deviceWidth } = useContext(viewportContext);

	const deleteCandleFromWishlist = (candleId) => {
		apiInstance
			.delete(`/user/${currentUser.id}/wishlist/${wishlist.id}/candle/${candleId}`)
			.then(() => {
				dispatch({
					...wishlistActions.WISHLIST_DELETE_PRODUCT,
					payload: { candleId: candleId },
				});
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "success",
						text: "Product deleted from your wishlist",
					},
				});
			})
			.catch((err) =>
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "failed",
						text: "Error while deleting product from wishlist, try again",
					},
				})
			);
	};

	const isCandlePresentInCart = (candleId) => {
		if (cartProducts.findIndex((item) => item.candleId === candleId) !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const handleAddToCartWithId = (candleId) => {
		if (!isCandlePresentInCart(candleId)) {
			fetchCandleInfosFromId(candleId).then((response) => {
				response.data.quantity = 1;
				response.data.isAvailable = null;
				dispatch({ ...cartActions.CART_ADD_PRODUCT, payload: response.data });
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "success",
						text: "Product added to your cart",
					},
				});
			});
		} else {
			dispatchToast({
				type: "ADD_TOAST",
				payload: {
					id: "toast " + Date.now(),
					status: "failed",
					text: "This candle is already in your cart",
				},
			});
		}
	};

	return (
		<div className="myWishlist alignCenter">
			<h2 className="sectionTitle">MY WISHLIST</h2>
			{wishlist.products[0].candleId !== -1 ? (
				<div className="wishlistWrapper">
					{wishlistProducts.map((product, i) => {
						return (
							(i + 1 <= itemsToDisplayOnInit || displayAllItems) && (
								<div className="wishlistRow" key={"wishlistRow" + i}>
									{deviceWidth > 688 && (
										<div
											className="trashCan"
											onClick={() =>
												deleteCandleFromWishlist(product.candleId)
											}
										>
											<IconSvg iconName="trashCan" />
										</div>
									)}
									<div className="wishlistProductImg">
										<img
											src={`/images/candle_types/candle_type_${product.typeId}_1.jpg`}
											alt={`${product.typeEnName} candles`}
										/>
									</div>
									<div className="wishlistProductInfos">
										<h4 className="candleTitle mediumBold">
											{product.scentsEnName} {product.typeEnName} Candle
										</h4>
										<div className="candleInfoContainer mediumText">
											<p className="mediumBold">
												{product.price.toFixed(2)}€
											</p>
											<p className="separatorBefore">{product.sizeEnName}</p>
											<p className="separatorBefore">
												{product.weightInGr}gr
											</p>
											<p className="separatorBefore">
												{product.durationInHours}h
											</p>
										</div>
									</div>
									{deviceWidth > 688 ? (
										<AddToCartBtn
											btnType="icon"
											typeSize={{
												typeSizeId: product.typeSizeId,
												price: product.price,
												sizeEnName: product.sizeEnName,
												typeEnName: product.typeEnName,
												typeId: product.typeId,
											}}
											scent={{
												id: product.scentId,
												enName: product.scentsEnName,
											}}
											candleId={product.candleId}
										/>
									) : (
										<div className="dropdownWrapper">
											<DropdownMobile
												candleId={product.candleId}
												content={[
													{
														title: "Add to cart",
														func: handleAddToCartWithId,
													},
													{
														title: "Delete from wishlist",
														func: deleteCandleFromWishlist,
													},
												]}
											/>{" "}
										</div>
									)}
								</div>
							)
						);
					})}
					{wishlistProducts.length < itemsToDisplayOnInit ? (
						<Link to="/candles" className="wishlistBtns smallText mediumBold">
							DISCOVER MORE CANDLES
						</Link>
					) : (
						!displayAllItems && (
							<button
								className="wishlistBtns smallText mediumBold"
								onClick={() => setDisplayAllItems(true)}
							>
								SHOW ALL CANDLES
							</button>
						)
					)}
				</div>
			) : (
				<NoContent
					iconName="wishlist"
					text="You haven't any candle in your wishlist yet !"
					linkText="Discover"
					linkPath="/candles"
				/>
			)}
		</div>
	);
};

export default MyWishlist;
