import "./NoContent.scss";

import React from "react";
import { Link } from "react-router-dom";

import IconSvg from "../../Components/IconSvg/IconSvg";

const NoContent = ({ iconName, text, linkText, linkPath, linkCallback }) => {
  return (
    <div className="noContentContainer">
      <div className="noContentIcon">
        <IconSvg iconName={iconName} />{" "}
      </div>
      <p className="usualText">{text} </p>

      {(linkText !== undefined || linkPath !== undefined || linkCallback !== undefined) && (
        <Link className="buttonLink mediumText mediumBold " to={linkPath} onClick={linkCallback}>
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default NoContent;
