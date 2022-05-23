import wishlistActions from "../actions/wishlistActions";

const initial = {
	id: -1,
	creationDatetime: "",
	products: [
		{
			candleId: -1,
			typeId: -1,
			typeSizeId: -1,
			scentId: -1,
			weightInGr: 0,
			durationInHours: 0,
			price: 0,
			scentsEnName: "",
			isEssentialOil: 0,
			typeEnName: "",
			sizeEnName: "",
		},
	],
};

export default (state = initial, action) => {
	switch (action.type) {
		case wishlistActions.WISHLIST_SET.type:
			return {
				...state,
				id: action.payload.id,
				creationDatetime: action.payload.creationDatetime,
				products:
					action.payload.products.length > 0
						? [...action.payload.products]
						: [...state.products],
			};
		case wishlistActions.WISHLIST_ADD_PRODUCT.type:
			return {
				...state,
				products:
					state.products[0].candleId === -1
						? [action.payload]
						: [...state.products, action.payload],
			};

		case wishlistActions.WISHLIST_DELETE_PRODUCT.type:
			const newProducts = state.products.filter(
				(product) => product.candleId !== action.payload.candleId
			);
			return {
				...state,
				products: newProducts.length === 0 ? initial.products : newProducts,
			};
		case wishlistActions.WISHLIST_LOGOUT_INITIAL.type:
			return initial;
		default:
			return state;
	}
};
