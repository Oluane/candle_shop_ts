import "./CandleTypes.scss";

import IconSvg from "../IconSvg/IconSvg";
import React from "react";

const CandleTypes = ({ types, setSelectedType }) => {
	return (
		<div className="typesWrapper fadeIn">
			<h4 className="alignCenter title">Start by choosing a candle type below</h4>
			<div className="typesContainer">
				{types.map((type, i) => {
					return (
						<div
							className="typeCard"
							key={i}
							onClick={() => {
								setSelectedType(type.id);
							}}
						>
							<div className="iconWrapper">
								<div className="typeSvg">
									<IconSvg iconName={"candleType" + type.id} />
								</div>
							</div>

							<div className="typeDesc">
								<p className="alignCenter usualText">{type.enName}</p>
								<p className="alignJustify mediumText">{type.enDesc}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CandleTypes;
