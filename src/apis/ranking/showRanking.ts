import { axiosInstance } from "@apis/axiosInstance";
import { END_POINT } from "@constants/api";

interface rawUserType {
	rank: number;
	user_id: string;
	point: number;
}

interface rankedUser extends rawUserType {
	rank: number;
}

// 포인트 상위 10명을 보여주는 메소드 showRanking
export const showRanking = async (): Promise<rankedUser[]> => {
	const response = await axiosInstance.get(`${END_POINT.TOP10}`);

	// 동순위 처리를 위해 필요한 변수
	let currentRank = 1;
	let prevPoint = -1;

	// rank 옵션이 추가된 응답 형태로 가공
	const rankedUsers: rankedUser[] = response.data.content.map(
		(user: rawUserType, index: number) => {
			if (user.point !== prevPoint) {
				// user.point랑 prevPoint가 다른 경우에만 currentRank를 현재 인덱스로 갱신
				currentRank = index + 1;
			}
			prevPoint = user.point; // prevPoint를 현재 point로 갱신

			return {
				...user,
				rank: currentRank, // rank 옵션을 추가한다
			};
		}
	);

	return rankedUsers;
};
