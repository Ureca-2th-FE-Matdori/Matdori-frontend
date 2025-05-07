import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className="w-100 h-100 bg-bg-primary rounded-input p-12 text-heading-h7 shadow-4">
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default App;
