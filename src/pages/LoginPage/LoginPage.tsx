import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import postLogin from "@apis/user/postLogin";
import Button from "@components/common/Button/Button";
import LoginInput from "@components/common/logininput/loginInput";
import { setUserId } from "@stores/userSlice";
import { PATH } from "@constants/path";
import loginBackground from "@assets/loginBackground.png";
import * as styles from "./LoginPage.style";

const LoginPage = () => {
	const nav = useNavigate();
	const [id, setId] = useState<string>("");
	const [pw, setPW] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const idref = useRef<HTMLInputElement>(null);
	const pwref = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const isVaildForm = (): boolean => {
		// 유효성 검사
		if (!id.trim()) {
			setErrorMessage("아이디를 입력해주세요.");
			idref.current?.focus();
			return false;
		}

		if (!pw.trim()) {
			setErrorMessage("비밀번호를 입력해주세요.");
			pwref.current?.focus();
			return false;
		}

		return true;
	};

	const handelLoginButtonClick = async () => {
		setErrorMessage("");

		if (!isVaildForm()) return;

		try {
			const response = await postLogin({ id, pw });

			sessionStorage.setItem("userId", response.userId);
			dispatch(setUserId(response.userId));
			nav(PATH.MAIN);
		} catch (error) {
			setErrorMessage("로그인에 실패했습니다");
		}
	};

	return (
		<div
			className={styles.loginPageWrapper}
			style={{
				backgroundImage: `url(${loginBackground})`,
			}}>
			<div className={styles.loginContainer}>
				<div className={styles.loginTitle}>로그인</div>

				<div className={styles.loginFormContainer}>
					<LoginInput
						label="닉네임(ID)"
						type="text"
						value={id}
						onChange={(event) => setId(event.target.value)}
						ref={idref}
					/>
					<LoginInput
						label="비밀번호"
						type="password"
						value={pw}
						onChange={(event) => setPW(event.target.value)}
						ref={pwref}
					/>

					<div className={styles.errorMessage}>{errorMessage}</div>

					<div className={styles.signupSectionContainer}>
						<div className={styles.signupSection}>
							계정이 없으신가요?{" "}
							<button
								type="button"
								onClick={() => nav("/signup")}
								className={styles.signupLinkButton}>
								회원 가입하기
							</button>
						</div>
						<div className={styles.loginButtonContainer}>
							<Button
								label="로그인"
								size="sm"
								onClick={handelLoginButtonClick}
								type="button"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
