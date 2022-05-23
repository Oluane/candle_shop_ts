import React, { createContext, ReactNode, useEffect, useState } from "react";

export const viewportContext = createContext({ deviceWidth: 0, deviceHeight: 0 });

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWindowResize = () => {
      setDeviceWidth(window.innerWidth);
      setDeviceHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return <viewportContext.Provider value={{ deviceWidth, deviceHeight }}>{children}</viewportContext.Provider>;
};
