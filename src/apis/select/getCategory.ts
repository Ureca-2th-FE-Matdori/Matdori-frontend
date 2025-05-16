import { NaverMapResponse } from "@type/randomApi";
import { END_POINT } from "@constants/api";
import { axiosInstance } from "../axiosInstance";

export const getCategory = async (
	categoryName: string,
	latitude: number,
	longitude: number
): Promise<NaverMapResponse> => {
	const path = END_POINT.CATEGORY.replace("{categoryName}", categoryName);

	const response = await axiosInstance.get(path, {
		params: {
			latitude,
			longitude,
		},
	});

	return response.data.content;
};
