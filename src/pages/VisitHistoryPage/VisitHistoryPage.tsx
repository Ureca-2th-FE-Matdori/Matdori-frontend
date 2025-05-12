import HistoryCardDesktop from "@components/VisitHistory/HistoryCardDesktop";
import HistoryCardMobile from "@components/VisitHistory/HistoryCardMobile";

import { useIsMobile } from "@stores/IsMobileContext"; // isMobile 값을 가져오는 custom Hook (Context API를 통해서..)

const VisitHistoryPage = () => {
	const isMobile = useIsMobile(); // 현재 화면이 모바일인지 아닌지 확인하는 boolean 값 가져오기

	return (
		<div className="bg-bg-secondary w-full h-full flex flex-col justify-start items-center px-[5vw] pt-[5vh] md:px-[12vw] md:pt-[7vh]">
			{/* 방문 내역 페이지 상단의 제목 */}
			<span className="text-text-secondary text-heading-h3 md:text-heading-h1 pb-[5vh]">
				기처리님의 방문내역
			</span>

			{/* 방문 내역 카드가 보일 곳 */}
			<div className="w-full flex flex-col gap-9">
				{isMobile ? <HistoryCardMobile /> : <HistoryCardDesktop />}
				{isMobile ? <HistoryCardMobile /> : <HistoryCardDesktop />}
			</div>
			<div>방문내역 조회 가능한 페이지입니다</div>
		</div>
	);
};

export default VisitHistoryPage;
