import apiInstance from "../api/api";

//fetching func that can check stock for multiple candles
export const fetchStockData = (productArr: Record<string, any>[]) => {
  return Promise.all(
    productArr.map((product) => {
      return apiInstance
        .get(`/candles/${product.candleId}/stock`)
        .then(({ data }) => data[0])
        .catch((err) => console.log(err));
    }),
  );
};

// TODO: better type

export const checkingProductsAvailability = (
  productArr: Record<string, any>[],
  dispatch: any,
  action: Record<string, any>,
) => {
  fetchStockData(productArr)
    .then((res) => {
      dispatch({ ...action, payload: res });
    })
    .catch((e) => console.log(e));
};
