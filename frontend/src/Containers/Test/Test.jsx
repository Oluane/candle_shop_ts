import "./Test.scss";

import IconSvg from "../../Components/IconSvg/IconSvg";
import React from "react";
import iconsInfos from "../../style/icons/iconsLib";

const Test = () => {
	return (
		<div className="testWrapper">
			<div className="iconDisplayWrapper">
				<h4>Icons:</h4>
				{Object.keys(iconsInfos).map((icon) => {
					return (
						<div className="iconBlock">
							<div className="icons">
								<IconSvg iconName={icon} />
							</div>
							<p>{icon}</p>
						</div>
					);
				})}
			</div>

			<div className="colorsWrapper">
				<h4>Colors : </h4>
				<div className="previewNameWrapper">
					<div className="testColor" style={{ backgroundColor: "#f4f0ee" }}></div>
					<p>
						primary <br /> #f4f0ee
					</p>
				</div>
				<div className="previewNameWrapper">
					<div
						className="testColor"
						style={{ backgroundColor: "rgba(244, 240, 238, 0.8)" }}
					></div>
					<p>
						primaryTrans <br /> rgba(244, 240, 238, 0.8)
					</p>
				</div>
				<div className="previewNameWrapper">
					<div className="testColor" style={{ backgroundColor: "#e9dfd9" }}></div>
					<p>
						secondary <br /> #e9dfd9
					</p>
				</div>
				<div className="previewNameWrapper">
					<div className="testColor" style={{ backgroundColor: "#f1ebe8" }}></div>
					<p>
						secondaryTrans <br />
						#f1ebe8
					</p>
				</div>
				<div className="previewNameWrapper">
					<div className="testColor" style={{ backgroundColor: "#baa58d" }}></div>
					<p>
						tertiary <br />
						#baa58d
					</p>
				</div>
				<div className="previewNameWrapper">
					<div
						className="testColor"
						style={{ backgroundColor: "rgba(186, 165, 141, 0.95)" }}
					></div>
					<p>
						tertiaryTrans <br />
						rgba(186, 165, 141, 0.95)
					</p>
				</div>
				<div className="previewNameWrapper">
					<div className="testColor" style={{ backgroundColor: "#333132" }}></div>
					<p>
						lightDark <br />
						#333132
					</p>
				</div>
				<div className="previewNameWrapper">
					<div
						className="testColor"
						style={{ backgroundColor: "rgba(35, 35, 35, 0.5)" }}
					></div>
					<p>
						lightGrey <br />
						rgba(35, 35, 35, 0.5)
					</p>
				</div>
				<div className="previewNameWrapper">
					<div
						className="testColor"
						style={{ backgroundColor: "rgba(35, 35, 35, 0.1)" }}
					></div>
					<p>
						lightGreyTrans <br />
						rgba(35, 35, 35, 0.1)
					</p>
				</div>
				<div className="previewNameWrapper">
					<div className="testColor" style={{ backgroundColor: "#d49e8d" }}></div>
					<p>
						roseGold <br />
						#d49e8d
					</p>
				</div>
				<div className="previewNameWrapper">
					<div
						className="testColor"
						style={{ backgroundColor: "rgba(212, 158, 141, 0.9)" }}
					></div>
					<p>
						roseGoldTrans <br />
						rgba(212, 158, 141, 0.9)
					</p>
				</div>
			</div>
		</div>
	);
};
export default Test;
