import { redirect } from "react-router-dom";
import { PATH } from "@constants/path";

export const authLoader = () => {
	const userId = sessionStorage.getItem("userId");

	if (!userId) {
		return redirect(PATH.UNAUTHORIZED);
	}

	return null;
};
