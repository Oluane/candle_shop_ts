import "./Account.scss";

import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import IconSvg from "../../Components/IconSvg/IconSvg";
import MyAddresses from "../../Components/MyAddresses/MyAddresses";
import MyOrders from "../../Components/MyOrders/MyOrders";
import MyProfile from "../../Components/MyProfile/MyProfile";
import MyWishlist from "../../Components/MyWishlist/MyWishlist";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";
import addressesActions from "../../redux/actions/addressesActions";
import userActions from "../../redux/actions/userActions";
import wishlistActions from "../../redux/actions/wishlistActions";

const navSections = [
  { id: "profile", name: "MY PROFILE", component: <MyProfile /> },
  { id: "orders", name: "MY ORDERS", component: <MyOrders /> },
  { id: "addresses", name: "MY ADDRESSES", component: <MyAddresses /> },
  { id: "wishlist", name: "MY WISHLIST", component: <MyWishlist /> },
];

const Account = () => {
  //const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const history = useHistory();

  const { deviceWidth } = useContext(viewportContext);

  const logOut = () => {
    dispatch(userActions.USER_LOGOUT);
    dispatch(wishlistActions.WISHLIST_LOGOUT_INITIAL);
    dispatch(addressesActions.ADDRESSES_LOGOUT_INITIAL);
    localStorage.removeItem("xsrfToken");
    history.push("/");
  };

  const [displayedSectionIndex, setDisplayedSectionIndex] = useState(2);

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="account">
      <nav className="accountNav">
        {deviceWidth > 688 ? (
          <ul className="accountNavList mediumText">
            {navSections.map((section, i) => {
              return (
                <li
                  key={"accountNavListItems" + i}
                  id={section.id}
                  className={"accountNavListItems lightDarkColor" + (displayedSectionIndex === i ? " active" : "")}
                  onClick={() => setDisplayedSectionIndex(i)}
                >
                  {section.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <div className="selectorCustom" onClick={() => setShowDropdown(!showDropdown)}>
              <span className="selectorCustomValue usualText">{navSections[displayedSectionIndex].name}</span>
              <div className="selectorArrow">
                <IconSvg iconName="rightArrow" />
              </div>
            </div>
            <div className={"selectorDropdown" + (showDropdown ? " visible" : "")}>
              {navSections.map((section, i) => {
                if (i !== displayedSectionIndex) {
                  return (
                    <p
                      key={"selectorValues" + i}
                      className="selectorValues usualText"
                      onClick={() => {
                        setDisplayedSectionIndex(i);
                        setShowDropdown(false);
                      }}
                    >
                      {section.name}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </>
        )}
        <button className="smallText lightGreyColor" onClick={() => logOut()}>
          LOG OUT
        </button>
      </nav>
      <div className="sectionWrapper">
        {/* <p className="largeText mediumBold alignCenter">
					Welcome, {currentUser.firstName} !
				</p> */}

        {navSections[displayedSectionIndex].component}
      </div>
      <div className={"dropdownOverlay" + (showDropdown ? " visible" : "")} onClick={() => setShowDropdown(false)} />
    </div>
  );
};

export default Account;
