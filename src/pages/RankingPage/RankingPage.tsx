// 회원들을 포인트에 따라 Top10 랭킹을 표시하는 RankingPage
import { useEffect, useState } from "react";
import { showRanking } from "@apis/ranking/showRanking";

import NameCard from "@components/RankingPage/NameCard";
import * as styles from "./RankingPage.style"; // 관련 스타일 내용들 import

interface userType {
	rank: number;
	user_id: string;
	point: number;
}

const RankingPage = () => {
	const [users, setUsers] = useState<userType[]>([]); // 유저들의 정보를 포함하고 있는 users state
	const [maxPoints, setMaxPoints] = useState(0); // points 최댓값 저장하는 maxPoints

	// RankingPage가 최초 렌더링 될 때에만 값 변경
	useEffect(() => {
		const fetchTopTen = async () => {
			try {
				const result = await showRanking(); // Top10 유저 정보를 가져오는 API 호출
				setUsers(result); // 지역 상태에 저장
			} catch (error) {
				console.error("랭킹 데이터를 불러오지 못함.", error);
			}
		};

		fetchTopTen(); // 화면 최초 렌더링 시 1회만 호출
	}, []);

	// users가 비어있지 않을 때만, setMaxPoints 업데이트 (useEffect문 분리)
	useEffect(() => {
		if (users.length !== 0) {
			setMaxPoints(users[0].point);
		}
	}, [users]);

	return (
		<div className={styles.wrapperStyle}>
			{/* 방문 내역 페이지 상단의 제목 */}
			<span className={styles.titleStyle}>Top10 Ranking</span>

			{/* 유저들의 랭킹이 보이는 section */}
			<div className={styles.cardContainerStyle}>
				{users?.map((user, idx) => (
					<NameCard
						key={user.rank} // key 값으로 idx를 사용할 경우, 불안정한 key로 간주됨
						rank={user.rank}
						userId={user.user_id}
						point={user.point}
						maxPoints={maxPoints}
						delay={idx * 0.3}
					/>
				))}
			</div>
		</div>
	);
};

export default RankingPage;
