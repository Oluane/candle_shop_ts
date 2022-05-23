import "./NavbarMobile.scss";

import React, { useContext, useState } from "react";

import IconSvg from "../../IconSvg/IconSvg";
import { Link } from "react-router-dom";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { viewportContext } from "../../ViewportProvider/ViewportProvider";

const NavbarMobile = ({ isLoggedUser }) => {
	const [toggleSideMenuDisplay, setToggleSideMenuDisplay] = useState(false);
	const { deviceHeight } = useContext(viewportContext);

	return (
		<>
			<div
				className="burgerIconWrapper"
				onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
			>
				<IconSvg iconName={!toggleSideMenuDisplay ? "burgerMenu" : "closeCross"} />
			</div>
			<ShoppingCart />
			<div
				className={"sideMenu" + (toggleSideMenuDisplay ? " active" : "")}
				style={{ height: deviceHeight }}
			>
				<ul className="listMenu largeText">
					<li>
						<Link
							to={
								isLoggedUser
									? "/account/user"
									: {
											pathname: "/account/login",
											state: { from: "/account/user" },
									  }
							}
							className="listRow"
							onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
						>
							<h4>MY ACCOUNT</h4>
							<div className="navArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</Link>
					</li>
					<li>
						<Link
							to="/candles"
							className="listRow"
							onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
						>
							<h4>CANDLES</h4>
							<div className="navArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</Link>
					</li>
					<li>
						<Link
							to="/about_us"
							className="listRow"
							onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
						>
							<h4>ABOUT US</h4>
							<div className="navArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</Link>
					</li>
				</ul>
			</div>
			<div className="brandLogo mobile" onClick={() => setToggleSideMenuDisplay(false)}>
				<Link to="/">
					<img src="/images/content/logo.png" alt="Candle Shop" />
				</Link>
			</div>
		</>
	);
};

export default NavbarMobile;
