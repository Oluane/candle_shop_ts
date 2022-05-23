import "./NoContent.scss";

import IconSvg from "../../Components/IconSvg/IconSvg";
import { Link } from "react-router-dom";
import React from "react";

const NoContent = ({ iconName, text, linkText, linkPath, linkCallback }) => {
	return (
		<div className="noContentContainer">
			<div className="noContentIcon">
				<IconSvg iconName={iconName} />{" "}
			</div>
			<p className="usualText">{text} </p>

			{(linkText !== undefined || linkPath !== undefined || linkCallback !== undefined) && (
				<Link
					className="buttonLink mediumText mediumBold "
					to={linkPath}
					onClick={linkCallback}
				>
					{linkText}
				</Link>
			)}
		</div>
	);
};

export default NoContent;
