import "./Input.scss";

import React from "react";

import { isInputFilled } from "../../services/utils/inputsUtils";

const Input = ({ type, name, value, onChange, specialClasses, isMidWidth, placeHolder, required, pattern }) => {
  return (
    <div
      className={
        "inputLabel" +
        (isMidWidth ? " midWidthInput" : "") +
        (specialClasses !== undefined ? " specialDisplay" : isInputFilled(value) ? " filled" : "")
      }
    >
      <input
        type={type}
        name={name}
        value={value === null ? "" : value}
        onChange={({ target: { value } }) => onChange(value)}
        className="formInput usualText"
        maxLength="90"
        required={required}
        pattern={pattern}
      />
      <span className="smallText inputPlaceholder">{placeHolder}</span>
    </div>
  );
};

export default Input;
