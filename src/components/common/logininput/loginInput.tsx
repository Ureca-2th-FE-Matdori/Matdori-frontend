import * as styles from "./loginInput.style";

interface LoginInputProps {
	type: "text" | "password";
	label: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = ({ type, label, value, onChange }: LoginInputProps) => {
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
				onChange={onChange}
				placeholder={
					type === "password" ? "비밀번호를 입력하세요" : "아이디를 입력하세요"
				}
			/>
		</div>
	);
};

export default LoginInput;
