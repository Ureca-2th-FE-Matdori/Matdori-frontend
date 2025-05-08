import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className="w-full h-full bg-bg-sub rounded-input p-12 text-heading-h7 shadow-4">
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default App;
