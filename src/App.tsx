import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

import "./App.css";
import GlobalNavigationBar from "@components/common/GlobalNavigationBar/GlobalNavigationBar";
import { IsMobileContext } from "./stores/IsMobileContext";

function App() {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" }); // Mobile 화면 여부 확인

	return (
		<IsMobileContext.Provider value={isMobile}>
			<div className="w-full h-full bg-bg-secondary text-heading-h7">
				<GlobalNavigationBar />
				<main>
					<Outlet />
				</main>
			</div>
		</IsMobileContext.Provider>
	);
}

export default App;
