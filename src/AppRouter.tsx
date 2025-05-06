import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "@pages/LandingPage/LandingPage";
import { PATH } from "@constants/path";
import App from "./App";

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: PATH.ROOT,
			element: <App />,
			children: [
				{
					path: "",
					element: <LandingPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
