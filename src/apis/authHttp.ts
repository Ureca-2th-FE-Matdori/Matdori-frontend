import axios, { AxiosResponse } from "axios";

interface authProps {
	id: string;
	pw: string;
	url: string;
}

interface ApiResponse<T> {
	content: T | null;
	message: string | null;
	url: string;
}

interface UserResponseDto {
	userId: string;
}

export const postauth = async ({
	id,
	pw,
	url,
}: authProps): Promise<AxiosResponse<ApiResponse<UserResponseDto>> | null> => {
	try {
		const response = await axios.post<ApiResponse<UserResponseDto>>(url, {
			user_id: id,
			password: pw,
		});

		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("에러 응답:", error.response?.data);
			return error.response ?? null;
		}
		console.error("알 수 없는 에러:", error);
		return null;
	}
};
