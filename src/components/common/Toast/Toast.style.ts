import type { ToastProps } from "./Toast";

export const toastStyle =
	"flex justify-center items-center rounded-button gap-[var(--spacing-12)] p-[var(--spacing-16)] text-white";

export const getVariantStyle = (variant: Required<ToastProps>["variant"]) => {
	return variant === "Success" ? "bg-bg-buttonPrimary" : "bg-red-400";
};

export const getActiveStyle = (isActive: Required<ToastProps>["isActive"]) => {
	return isActive ? "animate-slide-up" : "animate-slide-down";
};
