import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "@pages/LandingPage/LandingPage";

import LoginPage from "@pages/LoginPage/LoginPage";
import PickupPage from "@pages/PickupPage/PickupPage";
import SignupPage from "@pages/SignupPage/SignupPage";
import VisitHistoryPage from "@pages/VisitHistoryPage/VisitHistoryPage";

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
				{
					path: PATH.HISTORY,
					element: <VisitHistoryPage />,
				},
				{
					path: PATH.LOGIN,
					element: <LoginPage />,
				},
				{
					path: PATH.SIGNUP,
					element: <SignupPage />,
				},
				{
					path: PATH.PICKUP,
					element: <PickupPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
