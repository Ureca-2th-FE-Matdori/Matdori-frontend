import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import LoginInput from "@components/common/logininput/loginInput";
import { postauth } from "@apis/authHttp";
import { PATH } from "@constants/path";
import loginBackground from "@assets/loginBackground.png";
import * as styles from "./SignupPage.style";

const SignupPage = () => {
	const nav = useNavigate();
	const [id, setId] = useState<string>("");
	const [pw, setPW] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [pwConfirm, setPwconfirm] = useState<string>("");

	const idref = useRef<HTMLInputElement>(null);
	const pwref = useRef<HTMLInputElement>(null);
	const pwConfirmRef = useRef<HTMLInputElement>(null);

	const isVaildForm = (): boolean => {
		// 유효성 검사
		// 아이디 비었을 때 focus
		if (!id.trim()) {
			setErrorMessage("아이디를 입력해주세요");
			idref.current?.focus();
			return false;
		}
		// 비번이 비었을 때 focus
		if (!pw.trim()) {
			setErrorMessage("비빌번호 설정을 입력해주세요");
			pwref.current?.focus();
			return false;
		}
		// 확인 비번이 비었을 때 focus
		if (!pwConfirm.trim()) {
			setErrorMessage("비밀번호 확인을 입력해주세요");
			pwConfirmRef.current?.focus();
			return false;
		}
		// 아이디 길이 검사
		if (id.length < 5 || id.length > 10) {
			setErrorMessage("아이디는 5자 이상 10자 이하로 입력해주세요.");
			return false;
		}

		// 비번 길이 검사
		if (pw.length < 5 || pw.length > 16) {
			setErrorMessage("비밀번호는 5자 이상 16자 이하로 입력해주세요.");
			return false;
		}

		// 비번과 확인 비번 일치 검사
		if (pw !== pwConfirm) {
			setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
			return false;
		}
		return true;
	};

	const handelSignupButtonClick = async () => {
		setErrorMessage("");
		if (!isVaildForm()) return;

		// 회원 가입 진행
		const result = await postauth({
			id,
			pw,
			url: "http://localhost:8080/ureca/users/createAccount",
		});

		if (result?.status === 200) {
			console.log("서버 응답", result);
			alert("회원가입 성공하였습니다.");
			nav(PATH.LOGIN);
		} else {
			console.log("요청 실패", result);
			setErrorMessage(result?.data?.message || "로그인에 실패했습니다");
		}
	};

	return (
		<div
			className={styles.signupPageWrapper}
			style={{
				backgroundImage: `url(${loginBackground})`,
			}}>
			<div className={styles.signupContainer}>
				<div className={styles.signupTitle}>회원가입</div>

				<div className={styles.signupFormContainer}>
					<LoginInput
						label="닉네임 (ID) (5자리 이상 10자리 이하)"
						type="text"
						value={id}
						ref={idref}
						onChange={(event) => setId(event.target.value)}
					/>
					<LoginInput
						label="비밀번호 설정(5자리 이상 16자리 이하)"
						type="password"
						value={pw}
						ref={pwref}
						onChange={(event) => setPW(event.target.value)}
					/>

					<LoginInput
						label="비밀번호 확인"
						type="password"
						value={pwConfirm}
						ref={pwConfirmRef}
						onChange={(event) => setPwconfirm(event.target.value)}
					/>
					<div className={styles.errorMessage}>{errorMessage}</div>

					<div className={styles.signupSectionContainer}>
						<div className={styles.signupButtonContainer}>
							<Button
								label="회원가입"
								size="sm"
								onClick={handelSignupButtonClick}
								type="button"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
