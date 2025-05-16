// DB에 저장되어 있는 History 모두를 가져오는 api
import { axiosInstance } from "@apis/axiosInstance";
import { END_POINT } from "@constants/api";
import { CATEGORY_MAP_REVERSE } from "@constants/category";

import { visitHistory } from "../../types/VisitHistory";

interface historyType {
	// 날아오는 history 값
	history_id: number;
	user_id2: string;
	rate: number;
	url: string | null;
	title: string;
	roadAddress: string;
	category_id2: number;
}

const getHistory = async (userId: string | null): Promise<visitHistory[]> => {
	const response = await axiosInstance.get(`${END_POINT.GETHISTORY}/${userId}`);
	const historyList: historyType[] = response.data.content;

	// map 함수를 이용해서 content 배열의 각 원소마다 정보를 가공해야 한다
	const returnValue: visitHistory[] = await Promise.all(
		historyList.map(async (history: historyType) => {
			const categoryName = CATEGORY_MAP_REVERSE[history.category_id2]; // 카테고리 이름 가져오기

			// 가공된 값 돌려주기
			return {
				historyId: history.history_id,
				rate: history.rate,
				url: history.url,
				title: history.title,
				categoryName,
				roadAddress: history.roadAddress,
			};
		})
	);

	return returnValue;
};

export default getHistory;
