import "./NavbarDesktop.scss";

import IconSvg from "../../IconSvg/IconSvg";
import { Link } from "react-router-dom";
import React from "react";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";

const NavbarDesktop = ({ isLoggedUser }) => {
	return (
		<>
			<div className="navLeft smallText">
				<ul>
					<li>
						<Link to="/" className="navLinks">
							HOME
						</Link>
					</li>
					<li>
						<Link to="/candles" className="navLinks">
							CANDLES
						</Link>
					</li>
				</ul>
			</div>
			<div className="brandLogo desktop">
				<Link to="/">
					<img src="/images/content/logo.png" alt="Candle Shop" />
				</Link>
			</div>
			<div className="navRight smallText">
				<ul>
					<li>
						<Link to="/about_us" className="navLinks ">
							ABOUT US
						</Link>
					</li>
					<li>
						<Link to="/" className="navLinks ">
							MORE INFOS
						</Link>
					</li>
				</ul>
				<div className="userAccountIcons">
					<Link
						to={
							isLoggedUser
								? "/account/user"
								: { pathname: "/account/login", state: { from: "/account/user" } }
						}
					>
						<span className="userIcon">
							<IconSvg iconName="user" />
						</span>
					</Link>
					<ShoppingCart />
				</div>
			</div>
		</>
	);
};

export default NavbarDesktop;
