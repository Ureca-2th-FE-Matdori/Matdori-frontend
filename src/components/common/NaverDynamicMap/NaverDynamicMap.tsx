import { useEffect, useRef } from "react";

// 타입 전역 선언 (@types/navermaps 라는 타입을 npm 이용해서 설치해 놓은 상태)
// --> 네이버 지도 객체가 전역으로 주입된다고 가정하고 타입을 보강
declare global {
	interface Window {
		naver: typeof naver;
	}
}

// props로 넘어오는 값들의 type 정의 (외부에서 넘겨 받는 위도, 경도를 기반으로 지도 렌더링)
type NaverDynamicMapProps = {
	lat: number;
	lng: number;
};

// 네이버 Dynamic Map API를 이용해서 지도 이미지를 return하는 NaverStaticMap (마커 포함)
const NaverDynamicMap = ({ lat, lng }: NaverDynamicMapProps) => {
	const mapRef = useRef<HTMLDivElement | null>(null); // 실제 지도를 렌더링할 HTML 요소를 참조 (div에 연결됨)

	useEffect(() => {
		const { naver } = window;
		if (!mapRef.current || !naver) return; // naver 객체나 map DOM 요소가 없으면 초기화 생략

		// 지도 초기화 옵션 설정
		// center: 지도의 중심 좌표, zoom: 확대 수준(1~21, 숫자가 클수록 확대)
		const mapOptions = {
			center: new naver.maps.LatLng(lat, lng),
			zoom: 17,
		};

		// 네이버 지도 인스턴스 생성 및 mapRef에 렌더링
		const map = new naver.maps.Map(mapRef.current, mapOptions);

		// 지도에 마커 추가 (특정 좌표에 위치 표시), 해당 경우엔 eslint 경고를 무시해야 함
		// eslint-disable-next-line no-new
		new naver.maps.Marker({
			position: new naver.maps.LatLng(lat, lng),
			map, // 마커가 어느 지도에 표시될지 명시
			animation: naver.maps.Animation.BOUNCE, // 마커 bounce 되는 효과
		});
	}, [lat, lng]);

	return <div ref={mapRef} className="w-full h-[30vh] rounded-lg" />;
};

export default NaverDynamicMap;
