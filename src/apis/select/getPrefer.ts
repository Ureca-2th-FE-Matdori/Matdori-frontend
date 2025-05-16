import { END_POINT } from "@constants/api";
import type { NaverMapResponse } from "@type/randomApi";
import { axiosInstance } from "../axiosInstance";

export const getPrefer = async (
	userId: string,
	latitude: number,
	longitude: number
): Promise<NaverMapResponse> => {
	const path = END_POINT.PREFER.replace("{userId}", userId);
	const response = await axiosInstance.get(path, {
		params: {
			latitude,
			longitude,
		},
	});

	return response.data.content;
};
