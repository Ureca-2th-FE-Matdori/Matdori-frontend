import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import postHistory from "@apis/history/postHistory";
import { getCategory } from "@apis/select/getCategory";
import { getPrefer } from "@apis/select/getPrefer";
import { getRandom } from "@apis/select/getRandom";
import fireworks1 from "@assets/json/fireworks1.json";

import Button from "@components/common/Button/Button";
import NaverDynamicMap from "@components/common/NaverDynamicMap/NaverDynamicMap";
import ResultInfoBox from "@components/PickupResultPage/ResultInfoBox";

import Lottie from "lottie-react";
import { RootState } from "@stores/index";
import { useIsMobile } from "@stores/IsMobileContext";

import useCurrentPosition from "@hooks/useCurrentPosition";
import useToast from "@hooks/useToast";

import { CATEGORY_MAP } from "@constants/category";
import { PATH } from "@constants/path";
import type { RestaurantItem } from "@type/randomApi";
import * as styles from "./PickupResultPage.style";

const PickupResultPage = () => {
	const [searchParams] = useSearchParams();
	const modeParam = searchParams.get("mode");

	const mode = modeParam as "RANDOM" | "PREFER" | keyof typeof CATEGORY_MAP;
	// 처음 선택한 식당
	const [selectedRestaurant, setSelectedRestaurant] =
		useState<RestaurantItem | null>(null);
	// 중복으로 나오는 걸 방지 하여 나온 음식점을 제거
	const restaurantsRef = useRef<RestaurantItem[]>([]);
	const categoryNameRef = useRef<string>("");
	const rerollCountRef = useRef(0);
	const isMobile = useIsMobile();
	const userId = useSelector(
		(state: RootState) => state.rootReducer.user.userId
	);
	const nav = useNavigate();
	const { makeToast } = useToast();
	const { getCurrentPosition } = useCurrentPosition();

	const lat = selectedRestaurant
		? parseFloat(selectedRestaurant.mapy) / 1e7
		: 0;
	const lng = selectedRestaurant
		? parseFloat(selectedRestaurant.mapx) / 1e7
		: 0;

	const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

	// CATEGORY_MAP 정확한 key 값 지정
	const isCategoryKey = (key: string): key is keyof typeof CATEGORY_MAP => {
		return key in CATEGORY_MAP;
	};

	// 랜덤 뽑기
	const pickRandomRestaurant = (items: RestaurantItem[]): RestaurantItem => {
		return items[Math.floor(Math.random() * items.length)];
	};

	// 빈배열 랜덤 뽑기 처리
	const handleApiResponse = (items: RestaurantItem[]) => {
		if (!items || items.length === 0) {
			makeToast(
				"Warning",
				`주변에 ${categoryNameRef.current} 카테고리를 찾지 못하였습니다.`
			);

			if (isCategoryKey(mode)) {
				nav(PATH.CATEGORY);
			} else {
				nav(PATH.PICKUP);
			}
			return;
		}

		restaurantsRef.current = items;
		const randomPick = pickRandomRestaurant(items);
		setSelectedRestaurant(randomPick);
	};

	// 랜덤 API 호출
	const fetchRandomRestaurants = async () => {
		try {
			const { latitude, longitude } = await getCurrentPosition();
			const randomResult = await getRandom(latitude, longitude);
			categoryNameRef.current = randomResult?.categoryName;

			if (
				!randomResult?.response.items ||
				randomResult.response.items.length === 0
			) {
				// 빈 배열일 때 다시 호출
				console.warn("빈 배열이 반환되었습니다. 다시 호출합니다.");
				await fetchRandomRestaurants();
				return;
			}

			handleApiResponse(randomResult?.response.items);
		} catch (error) {
			console.error("랜덤 API 에러:", error);
		}
	};

	// 선호도 API 호출
	const fetchPreferRestaurants = async () => {
		if (!userId) return;

		try {
			const { latitude, longitude } = await getCurrentPosition();
			const preferResult = await getPrefer(userId, latitude, longitude);
			categoryNameRef.current = preferResult?.categoryName;

			handleApiResponse(preferResult?.response.items);
		} catch (error) {
			console.error("선호도 API 에러:", error);
		}
	};

	const fetchCategoryRestaurants = async () => {
		try {
			const { latitude, longitude } = await getCurrentPosition();
			const categoryResult = await getCategory(mode, latitude, longitude);
			categoryNameRef.current = categoryResult?.categoryName;

			handleApiResponse(categoryResult?.response.items);
		} catch (error) {
			console.error("카테고리 API 에러:", error);
		}
	};

	useEffect(() => {
		if (mode === "RANDOM") {
			fetchRandomRestaurants();
		} else if (mode === "PREFER") {
			fetchPreferRestaurants();
		} else if (isCategoryKey(mode)) {
			fetchCategoryRestaurants();
		}
	}, [mode, userId]);

	if (!userId) {
		return null;
	}

	const handlePostHistory = async () => {
		try {
			if (!selectedRestaurant) return;
			await postHistory({
				user: userId,
				category: categoryNameRef.current,
				title: stripHtml(selectedRestaurant.title),
				link: selectedRestaurant.link,
				roadAddress: selectedRestaurant.roadAddress,
			});
			makeToast("Success", "히스토리 등록을 성공하였습니다.");
			nav(PATH.HISTORY);
		} catch (error) {
			console.error("히스토리 등록 실패", error);
			makeToast("Warning", "등록에 실패했습니다.");
		}
	};
	// RANDOM 모드 재호출
	const rerollRandomRestaurant = () => {
		if (rerollCountRef.current >= 10) {
			makeToast("Warning", "다시뽑기 10회를 다 사용하였습니다.😭");
			nav(PATH.PICKUP);
		}

		rerollCountRef.current += 1;
		fetchRandomRestaurants();
	};

	// CATEGORY 모드 filter로 중복제거
	const rerollCategoryRestaurant = () => {
		const filtered = restaurantsRef.current.filter(
			(item) => item.link !== selectedRestaurant?.link
		);

		if (filtered.length === 0) {
			makeToast("Warning", "근처에 더이상 카테고리에 맞는 음식점이 없습니다.");
			nav(PATH.PICKUP);
			return;
		}

		const newPick = pickRandomRestaurant(filtered);
		setSelectedRestaurant(newPick);
		restaurantsRef.current = filtered;
	};

	const handleReroll = async () => {
		if (mode === "RANDOM") {
			rerollRandomRestaurant();
		} else {
			rerollCategoryRestaurant();
		}
	};

	if (!selectedRestaurant) return null;

	return (
		<div className={styles.pickupResultWrapper}>
			<div className={styles.pickupResulLottie}>
				{!isMobile && (
					<Lottie
						loop
						animationData={fireworks1}
						style={{ width: 300, height: 180 }}
					/>
				)}
				<div className={styles.pickupResultText(isMobile)}>
					<div>맛도리 랜드에서 오늘은</div>
					<div>
						[{stripHtml(selectedRestaurant.title)}]
						<span className={styles.resultLineBreak(isMobile)}>
							에서 맛있는 여행
						</span>
					</div>
				</div>
				{!isMobile && (
					<Lottie
						loop
						animationData={fireworks1}
						style={{ width: 300, height: 180 }}
					/>
				)}
			</div>
			<div className={styles.pickupResulmodal(isMobile)}>
				<div className={styles.pickupResultinfo(isMobile)}>
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
						<ResultInfoBox
							label="링크:"
							value={
								selectedRestaurant.link ? (
									<a
										href={selectedRestaurant.link}
										target="_blank"
										rel="noopener noreferrer"
										style={{ textDecoration: "underline" }}>
										{selectedRestaurant.link}
									</a>
								) : (
									<span>링크 없음</span>
								)
							}
						/>
					</div>
					<div className="flex-1">
						<div className={styles.naverMap(isMobile)}>
							<NaverDynamicMap lat={lat} lng={lng} />
						</div>
					</div>
				</div>
				<div className={styles.pickupResultButton(isMobile)}>
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
