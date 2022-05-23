import React, { useContext } from "react";

import { viewportContext } from "../Components/ViewportProvider/ViewportProvider";

export const useViewport = () => {
	const { width, height } = useContext(viewportContext);
	return { width, height };
};
