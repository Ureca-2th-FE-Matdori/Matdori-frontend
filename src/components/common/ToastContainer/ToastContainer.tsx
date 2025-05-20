import { useSelector } from "react-redux";
import Toast from "@components/common/Toast/Toast";
import type { RootState } from "@stores/index";

const ToastContainer = () => {
	const { variant, message, isVisible, isActive } = useSelector(
		(state: RootState) => state.rootReducer.toast
	);

	return (
		<div className="fixed bottom-[50px] z-2">
			{isVisible && (
				<Toast variant={variant} message={message} isActive={isActive} />
			)}
		</div>
	);
};

export default ToastContainer;
