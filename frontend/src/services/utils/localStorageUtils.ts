// TODO: better type
export const saveCartStateToLocalStorage = (state: any) => {
  if (state.cart.products[0].candleId !== -1) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } else {
    localStorage.removeItem("cartState");
  }
};

export const loadCartStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState).cart;
  } catch {
    return undefined;
  }
};
