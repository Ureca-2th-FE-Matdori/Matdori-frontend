import { useEffect, useState } from "react";
import hamburgerIcon from "@assets/hamburger-icon.svg";
import matdoriLogo from "@assets/matdori-logo.svg";

const menuItems = ["식당뽑기", "랭킹", "방문내역"]; // menu에 집어 넣을 메뉴명들
const delayClasses = ["delay-100", "delay-300", "delay-500"]; // 글자를 순차적으로 띄우기 위한 delay 값들 (tailwind v4부터는 사전 정의된 delay 값만 설정 가능)
const reverseDelayClasses = ["delay-500", "delay-300", "delay-100"]; // delayClasses의 역순 배열 (dropdown 메뉴 닫을 때 사용)

const GlobalNavigationBar = () => {
	const [isOpen, setIsOpen] = useState(false); // 모바일 화면에서 햄버거 버튼을 클릭 했는지의 여부(드롭다운 열림/닫힘)
	const [shouldRender, setShouldRender] = useState(false); // 실제로 DOM에 드롭다운을 마운트할 지 여부 결정 -> 닫힐 때(isOpen이 false일 때)도 애니메이션 실행 시간 만큼은 DOM을 남겨두기 위해 사용
	const [renderingState, setRenderingState] = useState<
		// CSS 클래스를 동적으로 변경해서 열리는 애니메이션과 닫히는 애니메이션을 분기 처리하기 위한 state
		"opening" | "closing" | null
	>(null);

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

	return (
		<>
			{/* 헤더 */}
			<div className="max-w-full mx-auto px-[7vw] h-[10vh] flex justify-between items-center py-12 bg-bg-white">
				<img src={matdoriLogo} className="w-auto h-full" alt="맛도리로고" />

				{/* 데스크탑 메뉴 */}
				<div className="hidden md:flex flex-row items-center gap-100">
					{menuItems.map((item) => (
						<a
							key={item}
							href={`#${item}`}
							className="text-black text-heading-h5 hover:text-text-brand">
							{item}
						</a>
					))}
				</div>

				{/* 모바일 햄버거 버튼 */}
				<button
					type="button"
					className="md:hidden focus:outline-none cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="메뉴 토글">
					<img src={hamburgerIcon} alt="메뉴 버튼" className="w-auto h-full" />
				</button>
			</div>

			{/* 드롭다운 메뉴 */}
			{shouldRender && (
				<div
					className={`md:hidden overflow-hidden flex flex-col justify-between items-center gap-5 transition-all duration-500 ease-in-out bg-bg-white/50 px-[7vw]
            ${
							renderingState === "opening"
								? "max-h-[300px] opacity-100 py-6"
								: "max-h-0 opacity-0 py-0"
						}`}>
					{menuItems.map((item, idx) => {
						const isOpening = renderingState === "opening";

						// opening: delay-100, delay-300, delay-500 / closing에는 역방향(reverseDelayClasses값)으로 적용
						const delayClass =
							renderingState === "opening"
								? delayClasses[idx] || "delay-300"
								: reverseDelayClasses[idx] || "delay-100";

						const visibilityClass = isOpening // visibility에 관한 class (투명도, y축 방향 translate 값 포함)
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-2";

						return (
							<a
								key={item}
								href={`#${item}`}
								className={`hover:text-text-brand text-black text-heading-h6 font-extrabold transform transition-all duration-500 ease-out
								${delayClass}
        				${visibilityClass}
							`}>
								{item}
							</a>
						);
					})}
				</div>
			)}
		</>
	);
};

export default GlobalNavigationBar;
