import "./index.css";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { extendTheme } from "@chakra-ui/react";

const colors = {
	// brand: {
	// 	900: "#1a365d",
	// 	800: "#153e75",
	// 	700: "#2a69ac",
	// },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
