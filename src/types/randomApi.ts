export interface RestaurantItem {
	title: string;
	link: string;
	category: string;
	roadAddress: string;
	mapx: string;
	mapy: string;
}

export interface NaverMapResponse {
	categoryName: string;
	response: {
		total: number;
		display: number;
		items: RestaurantItem[];
	};
}
