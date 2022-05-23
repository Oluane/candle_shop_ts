import "./SkeletonItem.scss";

import React from "react";

const SkeletonItem = ({ style, className }) => {
  return <div className={"skeletonItem" + (className ? className : "")} style={style}></div>;
};

export default SkeletonItem;
