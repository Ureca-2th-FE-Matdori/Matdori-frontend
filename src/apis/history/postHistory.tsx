import { axiosInstance } from "@apis/axiosInstance";
import { END_POINT } from "@constants/api";
import { CATEGORY_MAP } from "@constants/category";

interface postHistoryProps {
	user: string;
	category: string;
	title: string;
	link: string;
	roadAddress: string;
}

const postHistory = async ({
	user,
	category,
	title,
	link,
	roadAddress,
}: postHistoryProps) => {
	const categoryId = CATEGORY_MAP[category];

	const response = await axiosInstance.post(`${END_POINT.HISTORY}`, {
		user_id: user,
		restaurant_info: {
			title,
			roadAddress,
			url: link,
			category_id: categoryId,
		},
	});

	return response.data.content;
};

export default postHistory;
