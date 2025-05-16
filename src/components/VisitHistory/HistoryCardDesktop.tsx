import { useEffect, useRef, useState } from "react";

import getLatLngFromAddress from "@apis/history/getLatLngFromAddress";
import NaverDynamicMap from "@components/common/NaverDynamicMap/NaverDynamicMap";
import * as styles from "@components/VisitHistory/HistoryCardDesktop.style";

import downArrowIcon from "@assets/down-arrow.svg";
// import mapPreviewImg from "@assets/map-preview.png";
import matdoriLogo from "@assets/matdori-logo.svg";

export interface historyCardProps {
	// historyId: number;
	// rate: number;
	url?: string | null;
	title: string;
	roadAddress: string;
	categoryName: string;
}

const HistoryCardDesktop = ({
	url,
	title,
	roadAddress,
	categoryName,
}: historyCardProps) => {
	const [isOpen, setIsOpen] = useState(false); // 확장 섹션의 존재 여부(드롭다운 열림/닫힘)
	const [shouldRender, setShouldRender] = useState(false); // 확장 섹션 자체의 렌더 여부
	const [height, setHeight] = useState("0px"); // 확장 영역의 실제 height
	const [showMap, setShowMap] = useState(true); // 확장 영역의 우측에 '지도'를 보여줄 지의 여부를 판단
	const [latitude, setLatitude] = useState<number>(0); // 위도 값
	const [longitude, setLongitude] = useState<number>(0); // 경도 값

	const contentRef = useRef<HTMLDivElement>(null); // 확장 영역 div 참조용 ref
	const wrapperRef = useRef<HTMLDivElement>(null); // 카드 전체의 wrapper ref (지도를 보여줄지 여부를 전체 카드 넓이로 판단)

	// 컴포넌트를 mount한 후에 위도/경도 값 비동기 계산
	useEffect(() => {
		let isMounted = true; // 메모리 누수 방지용
		getLatLngFromAddress(roadAddress).then(({ lat, lng }) => {
			if (isMounted) {
				setLatitude(lat);
				setLongitude(lng);
			}
		});
		return () => {
			isMounted = false;
		};
	}, [roadAddress]);

	// 현재 구조에서, ref.current를 접근하려는 시점에 그 DOM 자체가 없기 때문에 null, 이로 인해 애니메이션도 실행 X
	// --> 조건 분기 없이, 아래와 같이 순차적으로 상태 변경을 분리하는 패턴이 필요
	// Step1: isOpen -> shouldRender = true 먼저 설정
	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
		}
	}, [isOpen]);

	// Step2: shouldRender가 true가 된 다음 실제 height를 적용
	useEffect(() => {
		if (shouldRender && isOpen && contentRef.current) {
			const fullHeight = contentRef.current.scrollHeight;
			setHeight(`${fullHeight}px`);
		}
		return () => {}; // 조건을 만족하지 않는 경우에도 아무것도 하지 않는 cleanup 함수 반환
	}, [shouldRender, isOpen]);

	// Step3: 닫을 때만 기존 로직 유지
	useEffect(() => {
		if (!isOpen) {
			setHeight("0px");

			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 500);
			return () => clearTimeout(timer);
		}
		return () => {}; // 조건을 만족하지 않는 경우에도 아무것도 하지 않는 cleanup 함수 반환
	}, [isOpen]);

	// Step4: 크기에 따라 지도 보이기 여부 결정
	useEffect(() => {
		const checkWidth = () => {
			// wrapperRef로 참조되어 있는 div의 width를 체킹하는 메소드 checkWidth
			if (wrapperRef.current) {
				const width = wrapperRef.current.offsetWidth;
				setShowMap(width > 900); // 800px 이하일 경우 지도 숨김
			}
		};

		checkWidth(); // 최초 실행
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	}, []);

	return (
		<div
			ref={wrapperRef}
			className={`opacity-0 animate-fade-in ${styles.cardWrapper}`}>
			{/* 좌측의 가게명이 나와있는 section */}
			<div className={styles.topSection}>
				<div className={styles.leftSide}>
					<div className={styles.avatar} />
					<span className={styles.storeName}>{title}</span>
				</div>

				{/* 우측의 가게 종류와 화살표 버튼이 나와있는 section */}
				<div className={styles.rightSide}>
					<span className={styles.storeType}>{categoryName}</span>
					<button
						type="button"
						className="focus:outline-none cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="메뉴 토글">
						<img
							src={downArrowIcon}
							alt="화살표 버튼"
							className={styles.arrowIcon(isOpen)}
						/>
					</button>
				</div>
			</div>

			{/* 확장 Section */}
			{shouldRender && (
				<div
					ref={contentRef}
					style={{ height }}
					className={styles.expandableSection}>
					<div className={styles.expandableInnerContainer}>
						<div className={styles.bottomLeftSide}>
							{/* 위치를 표시해 주는 블럭 */}
							<div className={styles.textRow}>
								<img
									src={matdoriLogo}
									className="w-[44px] h-[44px]"
									alt="맛도리 로고"
								/>
								<span className={styles.detailText}>{roadAddress}</span>
							</div>

							{/* 링크를 표시해 주는 블럭 */}
							<div className={styles.textRow}>
								<img
									src={matdoriLogo}
									className="w-[44px] h-[44px]"
									alt="맛도리 로고"
								/>
								<span className={styles.detailText}>
									{url === "" ? "링크 없음" : url}
								</span>
							</div>
						</div>

						{/* 네이버 지도 API를 갖고 와서 embed, 지도는 조건부 렌더링 */}
						{showMap && latitude !== 0 && longitude !== 0 && (
							<div className={styles.mapContainer}>
								<div className={styles.mapCanvas}>
									<NaverDynamicMap lat={latitude} lng={longitude} />
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default HistoryCardDesktop;
