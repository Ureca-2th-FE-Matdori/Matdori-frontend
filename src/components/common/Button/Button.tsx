import * as styles from "./Button.style";

export interface ButtonProps {
	label: string;
	type?: "button" | "submit";
	size?: "lg" | "sm";
	disabled?: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	label,
	type = "button",
	size = "lg",
	disabled = false,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={`${styles.buttonStyle} ${styles.getButtonStateStyle(disabled)} ${styles.getButtonSizeStyle(size)}`}
			type={type === "submit" ? "submit" : "button"}
			disabled={disabled}
			onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
