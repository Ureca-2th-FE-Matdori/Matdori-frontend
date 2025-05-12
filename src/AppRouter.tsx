import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "@pages/LandingPage/LandingPage";

import LoginPage from "@pages/LoginPage/LoginPage";
import MainPage from "@pages/MainPage/MainPage";
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
					path: PATH.MAIN,
					element: <MainPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
