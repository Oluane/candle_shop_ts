import "./LogRegisterPage.scss";

import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoginForm from "../../Components/LogRegisterForm/LoginForm";
import RegisterForm from "../../Components/LogRegisterForm/RegisterForm";

const LogRegisterPage = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { type } = useParams();

  useEffect(() => {
    if (type === "login") {
      setIsLogIn(true);
      setIsRegister(false);
    }
    if (type === "register") {
      setIsRegister(true);
      setIsLogIn(false);
    }
  }, [type]);

  return (
    <div className="logRegisterContainer">
      {isLogIn && <LoginForm />}
      {isRegister && <RegisterForm />}
    </div>
  );
};

export default LogRegisterPage;
