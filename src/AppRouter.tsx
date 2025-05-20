import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CategoryPage from "@pages/CategoryPage/CategoryPage";
import LandingPage from "@pages/LandingPage/LandingPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import PickupPage from "@pages/PickupPage/PickupPage";
import PickupResultPage from "@pages/PickupResultPage/PickupResultPage";
import RankingPage from "@pages/RankingPage/RankingPage";
import SignupPage from "@pages/SignupPage/SignupPage";
import UnauthorizedPage from "@pages/UnauthorizedPage/UnauthorizedPage";
import VisitHistoryPage from "@pages/VisitHistoryPage/VisitHistoryPage";
import { authLoader } from "@utils/authLoader";
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
					loader: authLoader,
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
					loader: authLoader,
				},
				{
					path: PATH.RESULT,
					element: <PickupResultPage />,
					loader: authLoader,
				},
				{
					path: PATH.RANKING,
					element: <RankingPage />,
					loader: authLoader,
				},
				{
					path: PATH.CATEGORY,
					element: <CategoryPage />,
					loader: authLoader,
				},
				{
					path: PATH.UNAUTHORIZED,
					element: <UnauthorizedPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
