import axios, { AxiosResponse } from "axios";

interface LoginProps {
	id: string;
	pw: string;
}

interface ApiResponse<T> {
	content: T | null;
	message: string | null;
}

interface UserResponseDto {
	userId: string;
}

export const postLogin = async ({
	id,
	pw,
}: LoginProps): Promise<AxiosResponse<ApiResponse<UserResponseDto>> | null> => {
	try {
		const response = await axios.post<ApiResponse<UserResponseDto>>(
			"http://localhost:8080/ureca/users/login",
			{
				user_id: id,
				password: pw,
			}
		);

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
