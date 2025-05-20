import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import hamburgerIcon from "@assets/svg/hamburger-icon.svg";
import homeIcon from "@assets/svg/home-icon.svg";
import logoutIcon from "@assets/svg/logout-icon.svg";
import matdoriLogo from "@assets/svg/matdori-logo.svg";
import { PATH } from "@constants/path"; // 경로 관련 상수(PATH) import
import * as styles from "./GlobalNavigationBar.style"; // 관련 스타일 내용들 import

const menuItems = ["식당뽑기", "랭킹", "방문내역"]; // menu에 집어 넣을 메뉴명들
const menuPaths = [PATH.PICKUP, PATH.RANKING, PATH.HISTORY]; // 각 페이지의 경로 값들을 저장해 놓은 배열
const delayClasses = ["delay-100", "delay-300", "delay-500"]; // 0.1s, 0.3s, 0.5s (tailwind v4부터는 사전 정의된 delay 값만 설정 가능)
const reverseDelayClasses = ["delay-500", "delay-300", "delay-100"]; // 닫힐 때 반대로 애니메이션

const GlobalNavigationBar = () => {
	const [isOpen, setIsOpen] = useState(false); // 모바일 화면에서 햄버거 버튼을 클릭 했는지의 여부(드롭다운 열림/닫힘)
	const [shouldRender, setShouldRender] = useState(false); // 실제로 DOM에 드롭다운을 마운트할 지 여부 결정 -> 닫힐 때(isOpen이 false일 때)도 애니메이션 실행 시간 만큼은 DOM을 남겨두기 위해 사용
	const [renderingState, setRenderingState] = useState<
		// CSS 클래스를 동적으로 변경해서 열리는 애니메이션과 닫히는 애니메이션을 분기 처리하기 위한 state
		"opening" | "closing" | null
	>(null);
	const location = useLocation(); // 현재 location(경로) 정보를 가져 온다
	const [isLogoPressed, setIsLogoPressed] = useState(false); // 로고(맛도리 로고) 버튼이 눌렸는지에 대한 상태값
	const navigate = useNavigate();

	// isOpen 상태 변화 감지
	useEffect(() => {
		let openingTimer: NodeJS.Timeout; // 비동기 타이머는 컴포넌트가 사라질 때 정리 필요 -> 변수로 선언해 놓고, 나중에 clear!
		let closingTimer: NodeJS.Timeout; // 비동기 타이머는 컴포넌트가 사라질 때 정리 필요 -> 변수로 선언해 놓고, 나중에 clear!

		if (isOpen) {
			setShouldRender(true); // mount
			openingTimer = setTimeout(() => setRenderingState("opening"), 10); // 다음 프레임에 열림 상태 적용
		} else {
			setRenderingState("closing"); // 애니메이션 실행
			closingTimer = setTimeout(() => {
				setShouldRender(false); // DOM 제거
				setRenderingState(null); // 애니메이션 시간
			}, 500);
		}

		// side-effect에 대한 정리 필요
		return () => {
			clearTimeout(openingTimer);
			clearTimeout(closingTimer);
		};
	}, [isOpen]);

	const handleLogoutClick = () => {
		const storeId = sessionStorage.getItem("userId");

		if (storeId) {
			sessionStorage.removeItem("userId");
		}

		navigate(PATH.LOGIN);
	};

	const handlePickupClick = () => {
		setIsLogoPressed(!setIsLogoPressed);
		navigate(PATH.PICKUP);
	};

	return (
		<>
			{/* 헤더 */}
			<div className={styles.headerWrapper}>
				{/* 맛도리 로고는 하단에 모달을 띄우기 위한 버튼 역할을 한다 */}
				<button
					type="button"
					className={styles.logoButtonWrapper}
					onClick={() => {
						setIsLogoPressed(!isLogoPressed);
					}}>
					<img
						src={matdoriLogo}
						className={styles.logoStyle}
						alt="맛도리로고"
					/>
				</button>

				{/* 로고 버튼이 눌렸는지의 여부를 감지하여 모달을 띄운다 */}
				{isLogoPressed && (
					<div className="absolute top-[11vh] left-[7vw] w-auto h-auto flex flex-col bg-white rounded-button p-3 gap-3 items-start z-2 shadow-md">
						<button
							type="button"
							className="flex flex-row gap-2 justify-start w-full h-[5vh] items-center cursor-pointer rounded-md hover:bg-bg-sub p-4 pr-[var(--spacing-80)]"
							onClick={handlePickupClick}>
							<img src={homeIcon} className="w-auto h-full" alt="집 아이콘" />
							<span className="text-xl">홈</span>
						</button>

						<button
							type="button"
							className="flex flex-row gap-2 justify-start h-[5vh] items-center cursor-pointer rounded-md hover:bg-bg-sub p-4 pr-[var(--spacing-80)]"
							onClick={handleLogoutClick}>
							<img
								src={logoutIcon}
								className="w-auto h-full"
								alt="로그아웃 아이콘"
							/>
							<span className="text-xl">로그아웃</span>
						</button>
					</div>
				)}

				{/* 데스크탑 메뉴 */}
				<div className={styles.desktopMenuWrapper}>
					{menuItems.map((item, idx) => (
						<Link
							key={item}
							to={menuPaths[idx]}
							className={styles.desktopMenuItem(
								location.pathname === menuPaths[idx]
							)} // 인덱스로 현재 선택된 페이지가 무엇인지 감지
						>
							{item}
						</Link>
					))}
				</div>

				{/* 모바일 햄버거 버튼 */}
				<button
					type="button"
					className={styles.mobileButton}
					onClick={() => setIsOpen(!isOpen)}
					aria-label="메뉴 토글">
					<img src={hamburgerIcon} alt="메뉴 버튼" className="w-auto h-full" />
				</button>
			</div>

			{/* 드롭다운 메뉴 */}
			{shouldRender && (
				<div className={styles.mobileDropdownWrapper(renderingState)}>
					{menuItems.map((item, idx) => {
						const isOpening = renderingState === "opening";

						// opening: delay-100, delay-300, delay-500 / closing에는 역방향(reverseDelayClasses값)으로 적용
						const delayClass =
							renderingState === "opening"
								? delayClasses[idx] || "delay-300"
								: reverseDelayClasses[idx] || "delay-100";

						return (
							<Link
								key={item}
								to={menuPaths[idx]}
								className={styles.mobileMenuItem(isOpening, delayClass)}
								onClick={() => setIsOpen(!isOpen)}>
								{item}
							</Link>
						);
					})}
				</div>
			)}
		</>
	);
};

export default GlobalNavigationBar;
