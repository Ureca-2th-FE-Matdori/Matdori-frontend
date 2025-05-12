import { setUserId } from "./stores/userSlice";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import "./App.css";

import GlobalNavigationBar from "@components/common/GlobalNavigationBar/GlobalNavigationBar";
import { IsMobileContext } from "./stores/IsMobileContext";

function App() {
	const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" }); // Mobile 화면 여부 확인

	useEffect(() => {
		const storeId = sessionStorage.getItem("userId");
		if (storeId) {
			dispatch(setUserId(storeId));
		}
	}, []);

	return (
    <IsMobileContext.Provider value={isMobile}>
      <GlobalNavigationBar />
      <div>
        <Outlet />
      </div>
    </IsMobileContext.Provider>
	);
}

export default App;
