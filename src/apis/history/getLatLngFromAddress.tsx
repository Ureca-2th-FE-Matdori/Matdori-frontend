// 네이버 geocoding api를 이용해서 도로명 주소에서 위도/경도 값을 추출
const getLatLngFromAddress = async (
	address: string
): Promise<{ lat: number; lng: number }> => {
	return new Promise((resolve, reject) => {
		if (!window.naver || !window.naver.maps) {
			console.log("Naver Maps JS SDK가 로드되지 않았습니다.");
			reject(new Error("Naver Maps SDK not loaded"));
			return;
		}

		let lng: number;
		let lat: number;

		// naver.maps.Service 서브 객체에서 geocode 메소드 호출
		naver.maps.Service.geocode(
			{
				query: address,
			},
			(status, response) => {
				if (status === naver.maps.Service.Status.ERROR) {
					// 정상 응답이 아닌 경우
					resolve({ lat: 37.511579, lng: 126.998678 });
				}
				const result = response.v2; // 검색 결과
				if (result.addresses.length === 0) {
					// 아무런 검색 결과가 없을 경우
					resolve({ lat: 37.511579, lng: 126.998678 });
					return;
				}

				lng = parseFloat(result.addresses[0].x);
				lat = parseFloat(result.addresses[0].y);
				resolve({ lat, lng });
			}
		);
	});
};

export default getLatLngFromAddress;
