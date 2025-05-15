import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postHistory from "@apis/history/postHistory";
import Button from "@components/common/Button/Button";
import NaverDynamicMap from "@components/common/NaverDynamicMap/NaverDynamicMap";
import ResultInfoBox from "@components/PickupResultPage/ResultInfoBox";
import Lottie from "lottie-react";
import { RootState } from "@stores/index";
import { useIsMobile } from "@stores/IsMobileContext";
import { PATH } from "@constants/path";
import fireworks1 from "@assets/fireworks1.json";
import * as styles from "./PickupResultPage.style";

// 추후 mockData 제외 후 api 불러와서 처리
interface Restaurant {
	title: string;
	link: string;
	category: string;
	roadAddress: string;
	mapx: string;
	mapy: string;
}

interface pickupPageProps {
	mode: "RANDOM" | "CATEGORY";
}

const mockData = [
	{
		title: "나나방콕 <b>태국</b>",
		link: "https://www.instagram.com/nanabangkok_jj",
		category: "태국음식",
		roadAddress:
			"경기도 성남시 분당구 정자일로 121 더샾스타파크 상가동 1층 D동 01, 02호",
		mapx: "1271058006",
		mapy: "373611119",
	},
	{
		title: "란반",
		link: "",
		category: "한식",
		roadAddress: "경기도 성남시 분당구 내정로11번길 9 1층",
		mapx: "1271135646",
		mapy: "373609919",
	},
	{
		title: "효뜨꽌",
		link: "https://instagram.com/hieutu_seoul?igshid=pwlezfsllo7l",
		category: "베트남음식",
		roadAddress:
			"경기도 성남시 분당구 정자일로 140 정자역엠코헤리츠 2단지 1층 122호",
		mapx: "1271067031",
		mapy: "373626784",
	},
	{
		title: "몬안베띠 정자점",
		link: "https://www.monanpetit.com/",
		category: "베트남음식",
		roadAddress: "경기도 성남시 분당구 정자일로 220 동양정자파라곤 1층 109호",
		mapx: "1271061591",
		mapy: "373698487",
	},
	{
		title: "포메인 분당정자본점",
		link: "http://www.phomein.com/",
		category: "베트남음식",
		roadAddress: "경기도 성남시 분당구 정자일로 230 동양정자파라곤 1층 101호",
		mapx: "1271061119",
		mapy: "373702564",
	},
];

const PickupResultPage = ({ mode }: pickupPageProps) => {
	// 처음 선택한 식당
	const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
		mockData[0]
	);
	// 중복으로 나오는 걸 방지 하여 나온 음식점을 제거한 상태저장
	const [remainingRestaurants, setRemainingRestaurants] =
		useState<Restaurant[]>(mockData);

	const isMobile = useIsMobile();
	const userId = useSelector(
		(state: RootState) => state.rootReducer.user.userId
	);
	const nav = useNavigate();

	const lat = parseFloat(selectedRestaurant.mapy) / 1e7;
	const lng = parseFloat(selectedRestaurant.mapx) / 1e7;

	const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

	if (!userId) {
		console.warn("유저 정보가 없습니다.");
		return null;
	}

	const handlePostHistory = async () => {
		try {
			await postHistory({
				user: userId,
				category: selectedRestaurant.category,
				title: selectedRestaurant.title,
				link: selectedRestaurant.link,
				roadAddress: selectedRestaurant.roadAddress,
			});
			alert("히스토리 등록을 성공하였습니다.");
		} catch (error) {
			console.error("히스토리 등록 실패", error);
			alert("등록에 실패했습니다.");
		}
	};

	const handleReroll = () => {
		let candidates: Restaurant[] = [];

		if (remainingRestaurants.length === 0) {
			alert("근처에 더이상 카테고리에 맞는 음식점이 없습니다.");
			nav(PATH.PICKUP);
		}

		if (mode === "RANDOM") {
			// 랜덤 API에서 새 데이터 받아오기 (현재는 목데이터 유지)
			candidates = mockData;
		} else {
			// CATEGORY 모드
			candidates = mockData;
		}

		if (candidates.length === 0) {
			alert("해당 조건에 맞는 음식점이 없습니다.");
			return;
		}

		// remainingRestaurants에서 랜덤으로 음식점 뽑기
		const newPick =
			remainingRestaurants[
				Math.floor(Math.random() * remainingRestaurants.length)
			];
		setSelectedRestaurant(newPick);

		// 선택된 음식점은 remainingRestaurants에서 제거
		setRemainingRestaurants((prev) =>
			prev.filter((resturant) => resturant.title !== newPick.title)
		);
	};

	return (
		<div className={styles.pickupResultWrapper}>
			<div className={styles.pickupResulLottie}>
				<Lottie
					loop
					animationData={fireworks1}
					style={{ width: 300, height: 180 }}
				/>
				<div className={styles.pickupResultText(isMobile)}>
					<div>맛도리 랜드에서 오늘은</div>
					<div>[{stripHtml(selectedRestaurant.title)}]에서 맛있는 여행</div>
				</div>
				<Lottie
					loop
					animationData={fireworks1}
					style={{ width: 300, height: 180 }}
				/>
			</div>
			<div className={styles.pickupResulmodal}>
				<div className={styles.pickupResultinfo}>
					<div className="flex-1 ">
						<ResultInfoBox
							label="음식점:"
							value={stripHtml(selectedRestaurant.title)}
						/>
						<ResultInfoBox
							label="카테고리:"
							value={selectedRestaurant.category}
						/>
						<ResultInfoBox
							label="위치:"
							value={selectedRestaurant.roadAddress}
						/>
						<ResultInfoBox label="링크:" value={selectedRestaurant.link} />
					</div>
					<div className="flex-1">
						<div className="w-full h-full">
							<NaverDynamicMap lat={lat} lng={lng} />
						</div>
					</div>
				</div>
				<div className={styles.pickupResultButton}>
					<div className="w-[150px]">
						<Button size="sm" label="다시뽑기" onClick={handleReroll} />
					</div>
					<div className="w-[150px]">
						<Button size="sm" label="확정하기" onClick={handlePostHistory} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PickupResultPage;
