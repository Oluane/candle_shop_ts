import "./Footer.scss";

import React, { useEffect, useState } from "react";

import EngagementSection from "../EngagementSection/EngagementSection";
import IconSvg from "../IconSvg/IconSvg";
import { useLocation } from "react-router-dom";

const Footer = () => {
	const [isHomepage, setIsHomepage] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setIsHomepage(location.pathname === "/" ? true : false);
	}, [location]);

	return (
		<>
			{!isHomepage && <EngagementSection />}
			<footer>
				<div className="socialContainer">
					<div className="footerLogo">
						<img src="/images/content/logoAlt.png" alt="Candle Shop" />
					</div>
					<div className="socialLinksContainer">
						<a href="/" className="socialLinks">
							<div>
								<IconSvg iconName="facebook" />
							</div>
						</a>
						<a href="/" className="socialLinks">
							<div>
								<IconSvg iconName="instagram" />
							</div>
						</a>
						<a href="/" className="socialLinks">
							<div>
								<IconSvg iconName="twitter" />
							</div>
						</a>
					</div>
				</div>
				<div className="menusContainer">
					<div className="menu mediumText">
						<h6 className="menuTitle smallText">About</h6>
						<ul className="menuItems">
							<li>
								<a href="/about_us">Who are we ?</a>
							</li>
							<li>
								<a href="/candles">Our products</a>
							</li>
							<li>
								<a href="/">Contact us</a>
							</li>
							<li>
								<a href="/">Shipping and returning</a>
							</li>
						</ul>
					</div>
					<div className="menu mediumText">
						<h6 className="menuTitle smallText">Informations</h6>
						<ul className="menuItems">
							<li>
								<a href="/">Who are we ?</a>
							</li>
							<li>
								<a href="/">Our products</a>
							</li>
							<li>
								<a href="/">Contact us</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
