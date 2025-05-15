import { useEffect, useRef } from "react";
import useToast from "@hooks/useToast";
import Success from "@assets/success-circle.svg";
import Warning from "@assets/warning-circle.svg";
import * as style from "./Toast.style";

export interface ToastProps {
	variant: "Success" | "Warning";
	message: string;
	isActive: boolean;
}

const Toast = ({ variant, message, isActive }: ToastProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { removeToast } = useToast();

	useEffect(() => {
		if (isActive || ref.current === null) return;

		ref.current.getAnimations().forEach((animation) => {
			// eslint-disable-next-line no-param-reassign
			animation.onfinish = () => {
				removeToast();
			};
		});
	}, [isActive, removeToast]);

	return (
		<div
			ref={ref}
			className={`${style.toastStyle} ${style.getVariantStyle(variant)} ${style.getActiveStyle(isActive)}`}>
			<img
				className="w-[20px], h-[20px]"
				src={variant === "Success" ? Success : Warning}
				alt="Toast"
			/>
			<p>{message}</p>
		</div>
	);
};

export default Toast;
