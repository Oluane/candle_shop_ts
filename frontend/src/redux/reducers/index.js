import addresses from "./addressesReducer";
import cart from "./cartReducer";
import { combineReducers } from "redux";
import user from "./userReducer";
import wishlist from "./wishlistReducer";

export default combineReducers({ user, wishlist, cart, addresses });
