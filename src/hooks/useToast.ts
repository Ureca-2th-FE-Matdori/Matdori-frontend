import { useDispatch } from "react-redux";
import {
	setToast,
	deactivateToast,
	removeToast,
} from "@stores/slices/toastSlice";

const useToast = () => {
	const dispatch = useDispatch();

	const makeToast = (variant: "Success" | "Warning", message: string) => {
		dispatch(setToast({ variant, message }));

		setTimeout(() => {
			dispatch(deactivateToast());
		}, 3000);
	};

	return { makeToast, removeToast: () => dispatch(removeToast()) };
};

export default useToast;
