import "./AddToCartBtn.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContext } from "../../Components/Toasts/ToastProvider";
import cartActions from "../../redux/actions/cartActions";
import { fetchCandleIdFromTypeSizeScent, fetchCandleInfosFromId } from "../../services/api/candles";
import IconSvg from "../IconSvg/IconSvg";

const AddToCartBtn = ({ btnType, typeSize, scent, candleId }) => {
  const [, dispatchToast] = useContext(ToastContext);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const handleAddToCartWithoutId = (typeSize, scent) => {
    if (scent !== undefined) {
      fetchCandleIdFromTypeSizeScent(typeSize, scent).then((response) => {
        if (!isCandlePresentInCart(response.data.candleId)) {
          dispatch({ ...cartActions.CART_ADD_PRODUCT, payload: response.data });
          dispatchToast({
            type: "ADD_TOAST",
            payload: {
              id: "toast " + Date.now(),
              status: "success",
              text: "Product added to your cart",
            },
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
      });
    } else {
      dispatchToast({
        type: "ADD_TOAST",
        payload: {
          id: "toast " + Date.now(),
          status: "failed",
          text: "You must choose a scent before adding products to your cart",
        },
      });
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

  const isCandlePresentInCart = (candleId) => {
    if (cartProducts.findIndex((item) => item.candleId === candleId) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {btnType === "text" && candleId === undefined && (
        <button
          className="addToCartTextBtn smallText mediumBold"
          onClick={() => handleAddToCartWithoutId(typeSize, scent)}
        >
          <span>ADD TO CART</span> <span className="separatorBefore">{typeSize.price.toFixed(2)}€</span>
        </button>
      )}

      {btnType === "icon" && candleId !== undefined && (
        <div className="addToCartIconBtn" onClick={() => handleAddToCartWithId(candleId)}>
          <IconSvg iconName="addToCart" />
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
