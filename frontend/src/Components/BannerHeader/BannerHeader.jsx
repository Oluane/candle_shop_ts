import React from "react";
import "./BannerHeader.scss";

const BannerHeader = () => {
	return (
		<header className="bannerHeader">
			<div className="bannerTitle">
				<h1>
					Welcome to <br />
					<span className="textHighlight">Candle Shop</span>.
				</h1>
			</div>
			<div className="bannerText">
				<p className="descText largeText">
					Lorem Ipsum sic dolor net consectigur. Ameno tantum rosae victus amunam.
				</p>
			</div>
		</header>
	);
};

export default BannerHeader;
