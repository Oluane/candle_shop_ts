import AboutUs from "../Containers/AboutUs/AboutUs";
import Account from "../Containers/Account/Account";
import Candles from "../Containers/Candles/Candles";
import Checkout from "../Containers/Checkout/Checkout";
import Home from "../Containers/Home/Home";
import LogRegisterPage from "../Containers/LogRegisterPage/LogRegisterPage";
import ScentFamily from "../Containers/ScentFamily/ScentFamily";
import Test from "../Containers/Test/Test";

export const routes = {
	Home: { path: "/", component: Home, isPrivate: false },
	Account: { path: "/account/user", component: Account, isPrivate: true },
	LogRegisterPage: { path: "/account/:type", component: LogRegisterPage, isPrivate: false },
	ScentFamily: { path: "/scents_families/:catId", component: ScentFamily, isPrivate: false },
	AboutUs: { path: "/about_us", component: AboutUs, isPrivate: false },
	Candles: { path: "/candles", component: Candles, isPrivate: false },
	Checkout: { path: "/checkout", component: Checkout, isPrivate: true },
	Test: { path: "/test", component: Test, isPrivate: false },
};
