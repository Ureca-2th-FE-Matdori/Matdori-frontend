import { useNavigate } from "react-router-dom";
import SelectPickupCard from "@components/PickupPage/SelectPickupCard";
import { useIsMobile } from "@stores/IsMobileContext";
import favoritePickupJson from "@assets/favoritePickup.json";
import mapJson from "@assets/map.json";
import rouletteJson from "@assets/roulette.json";
import * as styles from "./pickupPage.style";

const PickupPage = () => {
	// 각자 맞는 페이지로 이동 우선 landingpage로 작성
	const nav = useNavigate();
	const isMobile = useIsMobile();
	return (
		<div className={styles.pickupWrapper}>
			<div className={styles.pickupTitle(isMobile)}>
				<div className="text-bg-primary">MATDORI RAND 에서</div>
				<div>오늘의 음식점을 뽑아보세요</div>
			</div>
			<div className={styles.pickupCardWrapper(isMobile)}>
				<SelectPickupCard
					title="근처 음식점 무작위 뽑기"
					animationData={rouletteJson}
					onClick={() => nav("/")}
					buttonlabel="완전 랜덤 뽑기"
				/>
				<SelectPickupCard
					title="15개의 음식점 카테고리 선택"
					animationData={mapJson}
					onClick={() => nav("/")}
					buttonlabel="카테고리별 뽑기"
				/>
				<SelectPickupCard
					title="나의 선호 카테고리 뽑기"
					animationData={favoritePickupJson}
					onClick={() => nav("/")}
					buttonlabel="선호도 뽑기"
				/>
			</div>
		</div>
	);
};

export default PickupPage;
