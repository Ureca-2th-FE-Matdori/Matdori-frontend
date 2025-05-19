import useToast from "@hooks/useToast";

const useCurrentPosition = () => {
	const { makeToast } = useToast();

	const getCurrentPosition = (): Promise<{
		latitude: number;
		longitude: number;
	}> => {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				makeToast("Warning", "⚠️ 브라우저가 위치 정보를 지원하지 않아요.");
				reject(new Error("브라우저가 위치 정보를 지원하지 않습니다"));
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					let message = " 위치 정보를 가져올 수 없습니다.";
					switch (error.code) {
						case error.PERMISSION_DENIED:
							message = "현재 웹브라우저에서 위치기반 설정을 허용해주세요!";
							break;
						case error.POSITION_UNAVAILABLE:
							message = "위치 정보를 사용할 수 없어요.";
							break;
						case error.TIMEOUT:
							message = "위치 요청 시간이 초과되었어요.";
							break;
						default:
							message = "위치 정보를 가져올 수 없습니다.";
					}

					makeToast("Warning", message);
					reject(error);
				}
			);
		});
	};

	return { getCurrentPosition };
};

export default useCurrentPosition;
