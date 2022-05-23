import "./Checkout.scss";

import React, { useContext, useState } from "react";

import CheckoutInfos from "../../Components/CheckoutSections/CheckoutInfos/CheckoutInfos";
import IconSvg from "../../Components/IconSvg/IconSvg";
import { Link } from "react-router-dom";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";

const breadCrumbsSections = [
	{ id: "informations", name: "INFORMATIONS", component: <CheckoutInfos /> },
	{ id: "delivery", name: "DELIVERY", component: null },
	{ id: "payment", name: "PAYMENT", component: null },
];

const Checkout = () => {
	const { deviceWidth, deviceHeight } = useContext(viewportContext);
	const [displayedSectionIdx, setDisplayedSectionIdx] = useState(0);

	return (
		<div className="checkoutWrapper" style={{ width: deviceWidth, height: deviceHeight }}>
			<header className="checkoutHeader">
				<Link to="/" className="goBackLink usualText">
					<div className="arrowBackIcon">
						<IconSvg iconName="leftArrow" />
					</div>
					Go back shopping
				</Link>

				<div className="brandLogo desktop">
					<Link to="/">
						<img src="/images/content/logo.png" alt="Candle Shop" />
					</Link>
				</div>
			</header>
			<nav className="checkoutBreadCrumbs">
				<ul className="mediumText">
					{breadCrumbsSections.map((section, i) => {
						return (
							<li
								className={
									"breadCrumb" + (displayedSectionIdx === i ? " active" : "")
								}
								key={"breadCrumb" + i}
								id={section.id}
							>
								<span className="stepIndex">{i + 1}</span>
								{section.name}
							</li>
						);
					})}
				</ul>
			</nav>

			{breadCrumbsSections[displayedSectionIdx].component}
		</div>
	);
};

export default Checkout;
