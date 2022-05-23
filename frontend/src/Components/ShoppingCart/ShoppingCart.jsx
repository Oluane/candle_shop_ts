import "./ShoppingCart.scss";

import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IconSvg from "../IconSvg/IconSvg";
import NoContent from "../NoContent/NoContent";
import { viewportContext } from "../ViewportProvider/ViewportProvider";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";

const ShoppingCart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const cartTotalCost = useSelector((state) => state.cart.totalCost);
  const { deviceWidth, deviceHeight } = useContext(viewportContext);
  const [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false);

  const history = useHistory();

  const checkingCartValidityForCheckout = () => {
    return cartProducts.every((product) => product.isAvailable);
  };

  return (
    <>
      <div
        className={"userCartPreview" + (deviceWidth > 688 ? " desktop" : " mobile")}
        onClick={() => setIsShoppingCartDisplayed(!isShoppingCartDisplayed)}
      >
        <span className="cartIcon">
          <IconSvg iconName="shoppingCart" />
        </span>
        <div className="itemsCountContainer">
          <span className="smallText itemsCount">{cartProducts[0].candleId !== -1 ? cartProducts.length : "0"}</span>
        </div>
      </div>

      <div
        className={"shoppingCartWrapper" + (isShoppingCartDisplayed ? " displayed" : "")}
        style={{ height: deviceHeight }}
      >
        <header>
          <div className="closeIcon" onClick={() => setIsShoppingCartDisplayed(false)}>
            <IconSvg iconName="closeCross" />
          </div>
          <h2 className="sectionTitle">YOUR CART</h2>
        </header>
        {cartProducts[0].candleId !== -1 ? (
          <>
            <div className="cartContent">
              {cartProducts.map((product) => {
                return <ShoppingCartItem product={product} key={"cartItem" + product.candleId} isCheckout={false} />;
              })}
            </div>
            <div className="btnContainer">
              <button
                className="mediumText mediumBold"
                disabled={!checkingCartValidityForCheckout()}
                onClick={() => {
                  if (checkingCartValidityForCheckout()) {
                    setIsShoppingCartDisplayed(false);
                    history.push("/checkout");
                  }
                }}
              >
                CHECKOUT | {cartTotalCost.toFixed(2)}€
              </button>
            </div>
          </>
        ) : (
          <NoContent
            iconName="emptyBox"
            text="You haven't any candle in your cart yet !"
            linkText="Start shopping !"
            linkPath="/candles"
            linkCallback={() => setIsShoppingCartDisplayed(false)}
          />
        )}
      </div>

      {/* <div
				className={"shoppingCartOverlay" + (isShoppingCartDisplayed ? " visible" : "")}
				onClick={() => setIsShoppingCartDisplayed(false)}
			/> */}
    </>
  );
};

export default ShoppingCart;
