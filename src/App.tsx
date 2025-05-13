import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Outlet, useLocation } from "react-router-dom";
import GlobalNavigationBar from "@components/common/GlobalNavigationBar/GlobalNavigationBar";
import { IsMobileContext } from "@stores/IsMobileContext";
import { setUserId } from "@stores/userSlice";
import { PATH } from "@constants/path";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" }); // Mobile 화면 여부 확인
	const location = useLocation();
	const isNavigationBarVisible = [PATH.PICKUP, PATH.HISTORY].some((path) =>
		location.pathname.includes(path)
	);
	useEffect(() => {
		const storeId = sessionStorage.getItem("userId");
		if (storeId) {
			dispatch(setUserId(storeId));
		}
	}, []);
	return (
		<IsMobileContext.Provider value={isMobile}>
			<div className="w-full h-full flex flex-col">
				{isNavigationBarVisible && <GlobalNavigationBar />}
				<main>
					<Outlet />
				</main>
			</div>
		</IsMobileContext.Provider>
	);
}
export default App;
