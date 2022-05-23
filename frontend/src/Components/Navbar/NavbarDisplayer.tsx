import "./NavbarDisplayer.scss";

import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";

import { viewportContext } from "../ViewportProvider/ViewportProvider";
import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";

const NavbarDisplayer = () => {
  const { deviceWidth } = useContext(viewportContext);
  const isLoggedUser = useSelector((state: any) => state.user.isLoggedIn);

  return (
    <nav className="mainNavbar">
      {deviceWidth > 688 ? <NavbarDesktop isLoggedUser={isLoggedUser} /> : <NavbarMobile isLoggedUser={isLoggedUser} />}
    </nav>
  );
};

export default NavbarDisplayer;
