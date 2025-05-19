import { END_POINT } from "@constants/api";
import type { NaverMapResponse } from "@type/randomApi";
import { axiosInstance } from "../axiosInstance";

export const getPrefer = async (
	userId: string,
	latitude: number,
	longitude: number
): Promise<NaverMapResponse> => {
	const response = await axiosInstance.get(END_POINT.PREFER(userId), {
		params: {
			latitude,
			longitude,
		},
	});

	return response.data.content;
};
