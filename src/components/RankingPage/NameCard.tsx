// "랭킹" 화면에서 사용할 흰색 배너 (이름, 등수, 뱃지가 포함된 배너)
import { useLayoutEffect, useRef, useState } from "react";

import firstMedalIcon from "@assets/svg/first-medal.svg";
import matdoriLogo from "@assets/svg/matdori-logo.svg";
import secondMedalIcon from "@assets/svg/second-medal.svg";
import thirdMedalIcon from "@assets/svg/third-medal.svg";
import { useIsMobile } from "@stores/IsMobileContext"; // isMobile 값을 가져오는 custom Hook (Context API를 통해서..)

import * as styles from "./NameCard.style";

// 흰색 배너 컨테이너에서 사용할 Props type 정의
type NameCardProps = {
	rank: number;
	userId: string;
	point: number;
	maxPoints: number;
	delay: number;
};

// 해당하는 medal icon을 return하는 getMedalIcon
const getMedalIcon = (rank: number) => {
	if (rank === 1) return firstMedalIcon;
	if (rank === 2) return secondMedalIcon;
	if (rank === 3) return thirdMedalIcon;
	return thirdMedalIcon;
};

const NameCard = ({ rank, userId, point, maxPoints, delay }: NameCardProps) => {
	const isMobile = useIsMobile(); // 현재 화면이 모바일인지 아닌지 확인하는 boolean 값 가져오기

	const [barWidth, setBarWidth] = useState("0%"); // 막대 그래프의 초기 상태는 0%로 초기화
	const graphWrapperRef = useRef<HTMLDivElement>(null); // graphWrapper를 추적
	const pointTextRef = useRef<HTMLSpanElement>(null); // pointText span을 추적

	// react에서 제공하는 useLayoutEffect()를 통해 초기상태를 먼저 렌더, 그 다음 프레임에 변경 되도록 설정 가능
	useLayoutEffect(() => {
		const wrapperWidth = graphWrapperRef.current?.offsetWidth ?? 0;
		const pointTextWidth = pointTextRef.current?.offsetWidth ?? 0;
		const usableWidth = wrapperWidth - pointTextWidth; // 포인트가 표시되는 영역은 제외한 width 값

		// usableWidth가 유효한 경우
		if (usableWidth > 0) {
			const ratio = point / maxPoints;
			const actualBarWidth = usableWidth * ratio; // usableWidth 기준으로 비율을 매긴다
			const percentage = (actualBarWidth / wrapperWidth) * 100;

			// 1. 첫 렌더링 시에 '0px'을 DOM에 그리도록 강제 시킨다
			setBarWidth("0%");

			// 2. 다음 프레임에서 실제 width를 적용한다
			requestAnimationFrame(() => {
				setTimeout(() => {
					setBarWidth(`${percentage}%`); // point가 표시되는 부분은 제외한 비율 값으로 설정
				}, delay * 1000); // ms 단위로 지연
			});
		}
	}, [point, maxPoints, delay]);

	return (
		<div className={styles.wrapperStyle}>
			{/* 카드의 왼쪽 부분 (흰색 카드) */}
			<div className={styles.cardStyle(isMobile)}>
				{/* 이름, 아이콘, 등수를 표시하는 카드의 왼쪽 부분 */}
				<div
					className="flex flex-row items-center justify-start gap-5"
					style={{ animationDelay: `${delay}s` }}>
					<div className={styles.rankCircleStyle}>
						<span className="text-body-lg text-gray-600">{rank}</span>
					</div>
					<img src={matdoriLogo} className="w-48 h-full" alt="맛도리로고" />
					<span className={styles.nameTextStyle}>{userId}</span>
				</div>

				{/* 등수 뱃지 (1,2,3등에게 부여) */}
				<img
					src={getMedalIcon(rank)}
					className={styles.medalIconStyle(rank)}
					alt="등수 뱃지"
				/>
			</div>

			{/* 데스크탑 전용 UI, 막대 그래프 */}
			{!isMobile && (
				<div className={styles.graphWrapperStyle} ref={graphWrapperRef}>
					{/* 1. 막대 영역 */}
					<div
						className={styles.barStyle}
						style={{
							width: barWidth,
							transition: "width 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
						}}
					/>
					<span
						className={styles.pointTextStyle}
						style={{ animationDelay: `${delay + 0.5}s` }}
						ref={pointTextRef}>
						{point}points
					</span>
				</div>
			)}
		</div>
	);
};

export default NameCard;
