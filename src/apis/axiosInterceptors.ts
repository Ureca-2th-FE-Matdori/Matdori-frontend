import { AxiosError } from "axios";
import { HttpError } from "@apis/HttpError";

interface ErrorResponse {
	status: number;
	content: null;
	message: string;
}

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
	if (!error.response) throw error;

	const { data, status } = error.response;

	throw new HttpError(status, data.message);
};
