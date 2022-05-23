import "./AddToWishlistBtn.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api/api";
import wishlistActions from "../../redux/actions/wishlistActions";

const AddToWishlistBtn = ({ typeSize, scent }) => {
	const [, dispatchToast] = useContext(ToastContext);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.data);
	const wishlist = useSelector((state) => state.wishlist);
	const wishlistProducts = useSelector((state) => state.wishlist.products);

	const addCandleToWishlist = () => {
		const {
			typeSizeId,
			durationInHours,
			price,
			sizeEnName,
			typeEnName,
			typeId,
			weightInGr,
		} = typeSize;
		const { enName, isEssentialOil } = scent;
		apiInstance
			.get(`/candles/type_size/${typeSize.typeSizeId}/scent/${scent.id}`)
			.then(({ data }) => {
				apiInstance
					.post(`/user/${currentUser.id}/wishlist/${wishlist.id}/candle`, {
						candleId: data[0].id,
					})
					.then(() => {
						const product = {
							candleId: data[0].id,
							typeId,
							typeSizeId,
							scentId: scent.id,
							weightInGr,
							durationInHours,
							price,
							sizeEnName,
							typeEnName,
							scentsEnName: enName,
							isEssentialOil,
						};

						dispatch({ ...wishlistActions.WISHLIST_ADD_PRODUCT, payload: product });
						dispatchToast({
							type: "ADD_TOAST",
							payload: {
								id: "toast " + Date.now(),
								status: "success",
								text: "Product added to your wishlist",
							},
						});
					})
					.catch((err) => {
						if (err.response.status === 401) {
							dispatchToast({
								type: "ADD_TOAST",
								payload: {
									id: "toast " + Date.now(),
									status: "failed",
									text: "You must be logged to add products in your wishlist",
								},
							});
						}
					});
			})
			.catch((err) => console.log(err));
	};

	const isCandlePresentInWishlist = () => {
		const scentId = scent.id;
		const { typeSizeId } = typeSize;
		if (
			wishlistProducts.findIndex(
				(candle) => candle.typeSizeId === typeSizeId && candle.scentId === scentId
			) === -1
		) {
			return false;
		} else {
			return true;
		}
	};

	return (
		<button
			className="addToWishlist"
			onClick={() => {
				if (scent !== undefined) {
					!isCandlePresentInWishlist()
						? addCandleToWishlist()
						: dispatchToast({
								type: "ADD_TOAST",
								payload: {
									id: "toast " + Date.now(),
									status: "failed",
									text: "This product is already in your wishlist !",
								},
						  });
				} else {
					dispatchToast({
						type: "ADD_TOAST",
						payload: {
							id: "toast " + Date.now(),
							status: "failed",
							text: "You must choose a scent before adding products to your wishlist",
							classes: "error",
						},
					});
				}
			}}
		>
			<div
				className={
					"addToWishlistIcon" +
					(scent !== undefined ? (isCandlePresentInWishlist() ? " disabled" : "") : "")
				}
			>
				<IconSvg iconName="heart" />
			</div>
		</button>
	);
};

export default AddToWishlistBtn;
