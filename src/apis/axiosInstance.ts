import axios from "axios";
import { handleAPIError } from "@apis/axiosInterceptors";
import { BASE_URL, NETWORK_TIMEOUT } from "@constants/api";

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: NETWORK_TIMEOUT,
	withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => response, handleAPIError);
