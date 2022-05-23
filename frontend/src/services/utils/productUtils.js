import apiInstance from "../api/api";

//fetching func that can check stock for multiple candles
export const fetchStockData = (productArr) => {
	return Promise.all(
		productArr.map((product) => {
			return apiInstance
				.get(`/candles/${product.candleId}/stock`)
				.then(({ data }) => data[0])
				.catch((err) => console.log(err));
		})
	);
};

export const checkingProductsAvailability = (productArr, dispatch, action) => {
	fetchStockData(productArr)
		.then((res) => {
			dispatch({ ...action, payload: res });
		})
		.catch((e) => console.log(e));
};
