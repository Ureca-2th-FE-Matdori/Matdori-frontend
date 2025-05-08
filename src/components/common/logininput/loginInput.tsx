import { useState } from "react";
import { inputStyle } from "./loginInput.style";

interface loginInputProps {
	type: "text" | "password";
	label: string;
}

const LoginInput = ({ type, label }: loginInputProps) => {
	const [value, setValue] = useState("");

	const inputId = label.toLowerCase().replace(/\s+/g, "-");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<div className=" mb-5 flex flex-col items-center justify-center">
			<label
				htmlFor={inputId}
				className=" mb-2 text-body-sm text-text-black self-start">
				{label}
			</label>
			<input
				id={inputId}
				className={inputStyle}
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
