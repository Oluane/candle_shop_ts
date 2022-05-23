import { useContext } from "react";

import { viewportContext } from "../Components/ViewportProvider/ViewportProvider";

export const useViewport = () => {
  const { deviceWidth, deviceHeight } = useContext(viewportContext);
  return { deviceWidth, deviceHeight };
};
