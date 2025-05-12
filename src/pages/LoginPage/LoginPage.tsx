import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import LoginInput from "@components/common/logininput/loginInput";
import { setUserId } from "@stores/userSlice";
import { postauth } from "@apis/authHttp";
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

	const handelLoginButtonClick = async () => {
		setErrorMessage("");
		// 유효성 검사
		if (!id.trim()) {
			setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
			idref.current?.focus();
			return;
		}

		if (!pw.trim()) {
			setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
			pwref.current?.focus();
			return;
		}

		// 로그인 api 통신 처리 //브라우저에서 세션 저장 처리리
		const result = await postauth({
			id,
			pw,
			url: "http://localhost:8080/ureca/users/login",
		});

		console.log(result);

		if (result?.status === 200 && result.data.content) {
			console.log("서버 응답", result);
			sessionStorage.setItem("userId", result.data.content.userId);
			dispatch(setUserId(result?.data.content.userId));
			nav(PATH.MAIN);
		} else {
			console.log("요청 실패", result);
			setErrorMessage(result?.data?.message || "로그인에 실패했습니다");
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
