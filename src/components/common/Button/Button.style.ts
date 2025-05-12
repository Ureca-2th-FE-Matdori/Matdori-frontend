import type { ButtonProps } from "./Button";

export const buttonStyle =
	"w-full h-full flex justify-center items-center rounded-button p-[var(--spacing-16)]";

export const getButtonStateStyle = (
	disabled: Required<ButtonProps>["disabled"]
) => {
	return disabled
		? "bg-bg-disabled text-text-gray"
		: "bg-bg-buttonPrimary text-white cursor-pointer hover:bg-bg-hover-buttonPrimary";
};

export const getButtonSizeStyle = (size: Required<ButtonProps>["size"]) => {
	return size === "lg" ? "text-heading-h6" : "text-body-md";
};
