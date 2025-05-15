import { axiosInstance } from "@apis/axiosInstance";
import { END_POINT } from "@constants/api";

interface LoginProps {
	id: string;
	pw: string;
}

const postLogin = async ({ id, pw }: LoginProps) => {
	const response = await axiosInstance.post(`${END_POINT.LOGIN}`, {
		user_id: id,
		password: pw,
	});

	return response.data.content;
};

export default postLogin;
