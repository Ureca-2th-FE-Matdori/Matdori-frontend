import { NaverMapResponse } from "@type/randomApi";
import { END_POINT } from "@constants/api";
import { axiosInstance } from "../axiosInstance";

export const getCategory = async (
	categoryName: string,
	latitude: number,
	longitude: number
): Promise<NaverMapResponse> => {
	const response = await axiosInstance.get(END_POINT.CATEGORY, {
		params: {
			selectCategoryName: categoryName,
			latitude,
			longitude,
		},
	});

	return response.data.content;
};
