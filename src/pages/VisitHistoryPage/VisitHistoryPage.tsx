import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getHistory from "@apis/history/getHistory";

import HistoryCardDesktop from "@components/VisitHistory/HistoryCardDesktop";
import HistoryCardMobile from "@components/VisitHistory/HistoryCardMobile";

import { RootState } from "@stores/index";
import { useIsMobile } from "@stores/IsMobileContext"; // isMobile 값을 가져오는 custom Hook (Context API를 통해서..)
import { visitHistory } from "../../types/VisitHistory";

const VisitHistoryPage = () => {
	const isMobile = useIsMobile(); // 현재 화면이 모바일인지 아닌지 확인하는 boolean 값 가져오기
	const userId = useSelector(
		// redux 저장소로부터 userId를 받아온다
		(state: RootState) => state.rootReducer.user.userId
	);
	const [historyList, setHistoryList] = useState<visitHistory[]>([]);

	// historyList에 들어갈 정보들을 가져오는 fetchHistoryData
	const fetchHistoryData = async () => {
		try {
			const data = await getHistory(userId);
			setHistoryList(data);
		} catch (e) {
			alert(`방문 내역 로딩 실패! 오류 내용: ${e}`);
		}
	};

	// userId를 불러왔을 때에만 historyData 로딩
	useEffect(() => {
		if (!userId) return; // userId가 없다면.. return
		fetchHistoryData();
	}, [userId]);

	return (
		<div className="bg-bg-secondary w-full h-full flex flex-col justify-start items-center px-[5vw] pt-[5vh] md:px-[12vw] md:pt-[7vh]">
			{/* 방문 내역 페이지 상단의 제목 */}
			<span className="text-text-secondary text-heading-h3 md:text-heading-h1 pb-[5vh]">
				{userId}님의 방문내역
			</span>

			{/* 방문 내역 카드가 보일 곳 */}
			<div className="w-full flex flex-col gap-9">
				{historyList.map((history) => {
					if (isMobile) {
						// 모바일 화면일 경우
						return (
							<HistoryCardMobile
								key={history.historyId}
								url={history.url}
								title={history.title}
								roadAddress={history.roadAddress}
								categoryName={history.categoryName}
							/>
						);
					} // 데스크탑 화면일 경우
					return (
						<HistoryCardDesktop
							key={history.historyId}
							url={history.url}
							title={history.title}
							roadAddress={history.roadAddress}
							categoryName={history.categoryName}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default VisitHistoryPage;
