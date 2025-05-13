import { axiosInstance } from "@apis/axiosInstance";
import { END_POINT } from "@constants/api";

interface SignupProps {
	id: string;
	pw: string;
}

const postSignUp = async ({ id, pw }: SignupProps) => {
	const response = await axiosInstance.post(`${END_POINT.SIGNUP}`, {
		user_id: id,
		password: pw,
	});

	return response.data.content;
};

export default postSignUp;
