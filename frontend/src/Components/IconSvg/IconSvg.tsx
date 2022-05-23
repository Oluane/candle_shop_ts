import React from "react";

import { iconInfos } from "../../style/icons/iconsLib";

//const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

type IconSvgProps = {
  iconName: keyof typeof iconInfos;
  className?: string;
};

const IconSvg = ({ iconName, className }: IconSvgProps) => {
  const pathArr = iconInfos[iconName].path;

  return (
    <svg
      className={className}
      viewBox={iconInfos[iconName].viewBox}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {pathArr.map((path, i) => {
        return <path key={i} fill={path.fillColor} d={path.d} />;
      })}
    </svg>
  );
};

export default IconSvg;
