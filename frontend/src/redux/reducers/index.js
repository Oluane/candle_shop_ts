import { combineReducers } from "redux";

import addresses from "./addressesReducer";
import cart from "./cartReducer";
import user from "./userReducer";
import wishlist from "./wishlistReducer";

export default combineReducers({ user, wishlist, cart, addresses });
