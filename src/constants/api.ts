export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const NETWORK_TIMEOUT = 30000;

export const END_POINT = {
	LOGIN: "users/login",
	SIGNUP: "users/createAccount",
	HISTORY: "select/finalize",
	TOP10: "/ranking/top10",
	RANDOM: "select/random",
	PREFER: (userId: string) => `select/prefer/${userId}`,
	CATEGORY: "select",
	GETHISTORY: "/history",
};
