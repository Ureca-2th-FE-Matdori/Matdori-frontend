import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import "./index.css";
import { store } from "./stores";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</StrictMode>
);
