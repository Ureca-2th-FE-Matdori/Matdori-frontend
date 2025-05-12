import { useEffect, useRef, useState } from "react";

import * as styles from "@components/VisitHistory/HistoryCardMobile.style";
import NaverDynamicMap from "@components/VisitHistory/NaverDynamicMap";
import downArrowIcon from "@assets/down-arrow.svg";

const HistoryCardMobile = () => {
	const [isOpen, setIsOpen] = useState(false); // 확장 섹션의 존재 여부(드롭다운 열림/닫힘)
	const [shouldRender, setShouldRender] = useState(false); // 확장 섹션 자체의 렌더 여부
	const [height, setHeight] = useState("0px"); // 확장 영역의 실제 height

	const contentRef = useRef<HTMLDivElement>(null); // 확장 영역 div 참조용 ref

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

	return (
		<div className={styles.cardWrapper}>
			<div className={styles.topSection}>
				<div className={styles.leftSide}>
					<div className={styles.avatar} />
					<span className={styles.storeName}>마담밍</span>
				</div>
				<div className={styles.rightSide}>
					<span className={styles.storeType}>중식</span>
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

			{shouldRender && (
				<div
					ref={contentRef}
					style={{ height }}
					className={styles.expandableSection}>
					<div className={styles.expandableInnerContainer}>
						{/* "위치" 정보 표시하는 block */}
						<div className={styles.detailBlock}>
							<span className={styles.titleText}>위치: </span>
							<span className={styles.detailText}>
								서울 강남구 선릉로86길 5-4 1층
							</span>
						</div>

						{/* "링크" 정보 표시하는 block */}
						<div className={styles.detailBlock}>
							<span className={styles.titleText}>링크:</span>
							<span className={styles.detailText}>
								http://www.madammming.com/
							</span>
						</div>

						{/* 이후 네이버 지도 API를 갖고 와서 embed할 예정, 지금은 dummy 이미지 삽입 */}
						<div className={styles.mapContainer}>
							<div className={styles.mapContainer}>
								<NaverDynamicMap lat={37.3595963} lng={127.1054328} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HistoryCardMobile;
