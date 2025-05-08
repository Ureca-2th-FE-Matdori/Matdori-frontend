import { useState } from "react";
import * as styles from "./loginInput.style";

interface LoginInputProps {
	type: "text" | "password";
	label: string;
}

const LoginInput = ({ type, label }: LoginInputProps) => {
	const [value, setValue] = useState<string>("");
	const inputId = label.toLowerCase().replace(/\s+/g, "-");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

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
				onChange={handleChange}
				placeholder={
					type === "password" ? "비밀번호를 입력하세요" : "아이디를 입력하세요"
				}
			/>
		</div>
	);
};

export default LoginInput;
