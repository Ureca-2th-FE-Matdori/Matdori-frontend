// 회원들을 포인트에 따라 Top10 랭킹을 표시하는 RankingPage
import { useEffect, useState } from "react";

import NameCard from "@components/RankingPage/NameCard";
import * as styles from "./RankingPage.style"; // 관련 스타일 내용들 import

type userType = {
	rank: number;
	name: string;
	points: number;
};

const RankingPage = () => {
	const [users, setUsers] = useState<userType[]>([]); // 유저들의 정보를 포함하고 있는 users state
	const [maxPoints, setMaxPoints] = useState(0); // points 최댓값 저장하는 maxPoints

	// RankingPage가 최초 렌더링 될 때에만 값 변경
	useEffect(() => {
		const usersValue = [
			{ rank: 1, name: "허준호", points: 2630 },
			{ rank: 2, name: "허기철", points: 2200 },
			{ rank: 3, name: "허기영", points: 2120 },
			{ rank: 4, name: "허주노", points: 1200 },
			{ rank: 5, name: "춘식이", points: 800 },
			{ rank: 6, name: "라이언", points: 600 },
		];
		const maxPointsValue = Math.max(...usersValue.map((user) => user.points));
		setUsers(usersValue);
		setMaxPoints(maxPointsValue);
	}, []);

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
						name={user.name}
						points={user.points}
						maxPoints={maxPoints}
						delay={idx * 0.3}
					/>
				))}
			</div>
		</div>
	);
};

export default RankingPage;
