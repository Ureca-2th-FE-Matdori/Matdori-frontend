import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@stores/index";
import AppRouter from "./AppRouter";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</StrictMode>
);
