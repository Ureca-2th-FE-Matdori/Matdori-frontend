import { END_POINT } from "@constants/api";
import type { NaverMapResponse } from "@type/randomApi";
import { axiosInstance } from "../axiosInstance";

export const getRandom = async (
	latitude: number,
	longitude: number
): Promise<NaverMapResponse> => {
	const response = await axiosInstance.get(`${END_POINT.RANDOM}`, {
		params: {
			latitude,
			longitude,
		},
	});

	return response.data.content;
};
