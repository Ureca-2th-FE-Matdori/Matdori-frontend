import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "@pages/LandingPage/LandingPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import SignupPage from "@pages/SignupPage/SingupPage";
import { PATH } from "@constants/path";
import App from "./App";
import MainPage from "./pages/MainPage/MainPage";

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
