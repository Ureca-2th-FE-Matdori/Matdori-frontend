import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import { setUserId } from "./stores/userSlice";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const storeId = sessionStorage.getItem("userId");
		if (storeId) {
			dispatch(setUserId(storeId));
		}
	}, []);

	return (
		<div>
			<Outlet />
		</div>
	);
}

export default App;
