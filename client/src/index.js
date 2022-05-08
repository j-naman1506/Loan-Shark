import "./index.css";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { Worker } from "@react-pdf-viewer/core";
import { extendTheme } from "@chakra-ui/react";
import store from "./store";

ReactDOM.render(
	<ChakraProvider>
		<Provider store={store}>
			<React.StrictMode>
				<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
					<App />
				</Worker>
			</React.StrictMode>
		</Provider>
	</ChakraProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
