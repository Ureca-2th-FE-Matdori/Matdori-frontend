export interface visitHistory {
	// api에서 돌려줄 값
	historyId: number;
	rate: number;
	url: string | null;
	title: string;
	categoryName: string;
	roadAddress: string;
}
