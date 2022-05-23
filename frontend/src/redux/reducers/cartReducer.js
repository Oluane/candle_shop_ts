import { loadCartStateFromLocalStorage } from "../../services/utils/localStorageUtils";
import cartActions from "../actions/cartActions";

const initialState = {
  totalCost: 0,
  products: [
    {
      candleId: -1,
      price: 0,
      quantity: 0,
      isAvailable: null,
      scentsEnName: "",
      typeId: -1,
      typeEnName: "",
      sizeEnName: "",
    },
  ],
};

const initial = loadCartStateFromLocalStorage() || initialState;

export default (state = initial, action) => {
  switch (action.type) {
    case cartActions.CART_ADD_PRODUCT.type:
      const newTotal = state.totalCost + action.payload.price;
      return {
        totalCost: newTotal,
        products: state.products[0].candleId === -1 ? [action.payload] : [...state.products, action.payload],
      };

    case cartActions.CART_DELETE_PRODUCT.type:
      const currentItem = state.products.find((item) => item.candleId === action.payload.candleId);
      const totalWithoutItems = state.totalCost - currentItem.price * currentItem.quantity;
      const newProducts = state.products.filter((product) => product.candleId !== action.payload.candleId);
      return {
        totalCost: totalWithoutItems,
        products: newProducts.length === 0 ? initialState.products : newProducts,
      };

    case cartActions.CART_EDIT_QUANTITY_PRODUCT.type:
      let candleIdx = state.products.findIndex((product) => product.candleId === action.payload.candleId);

      const editedProducts = state.products;
      const currentProduct = editedProducts[candleIdx];
      let newTotalQ = state.totalCost;

      if (action.payload.newQuantity > currentProduct.quantity) {
        newTotalQ = newTotalQ + currentProduct.price * (action.payload.newQuantity - currentProduct.quantity);
      } else {
        newTotalQ = newTotalQ - currentProduct.price * (currentProduct.quantity - action.payload.newQuantity);
      }

      currentProduct.quantity = Number(action.payload.newQuantity);

      return {
        totalCost: newTotalQ,
        products: editedProducts,
      };

    case cartActions.CART_EDIT_STOCK_PRODUCT.type:
      const fetchedStock = action.payload;

      const productsWithAvailability = state.products.map((product, i) => {
        if (fetchedStock[0] !== undefined) {
          let idx = fetchedStock.findIndex((e) => e.candleId === product.candleId);

          if (idx !== -1) {
            if (fetchedStock[idx].availableStock >= product.quantity) {
              product.isAvailable = true;
            } else {
              product.isAvailable = false;
            }
            return product;
          }
        }
        return product;
      });

      return { ...state, products: productsWithAvailability };

    default:
      return state;
  }
};
