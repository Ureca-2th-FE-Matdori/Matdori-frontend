import { forwardRef } from "react";
import * as styles from "./loginInput.style";

interface LoginInputProps {
	type: "text" | "password";
	label: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
	({ type, label, value, onChange }, ref) => {
		const inputId = label.toLowerCase().replace(/\s+/g, "-");

		return (
			<div className={styles.inputWrapper}>
				<label htmlFor={inputId} className={styles.labelStyle}>
					{label}
				</label>
				<input
					id={inputId}
					className={styles.inputStyle}
					type={type}
					value={value}
					ref={ref}
					onChange={onChange}
					placeholder={
						type === "password"
							? "비밀번호를 입력하세요"
							: "아이디를 입력하세요"
					}
				/>
			</div>
		);
	}
);

export default LoginInput;
