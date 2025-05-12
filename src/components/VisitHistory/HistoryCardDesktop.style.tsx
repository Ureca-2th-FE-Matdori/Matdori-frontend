// 카드 전체 wrapper
export const cardWrapper =
	"w-full bg-bg-white flex flex-col rounded-3xl overflow-hidden min-w-[768px]"; // 전체 카드 틀 (세로 정렬, 흰색 배경, 모서리 둥글게)

// 상단 요약 섹션 (기본 카드 줄)
export const topSection =
	"flex flex-row justify-between items-center px-[3vw] py-[2vh]"; // 카드 상단: 좌우 정렬, padding 포함

// 좌측 (가게 이름 등)
export const leftSide = "flex flex-row justify-start items-center"; // 왼쪽 영역: 아바타 + 이름 수평 정렬
export const avatar = "bg-bg-primary w-24 h-24 rounded-full"; // 원형 아바타
export const storeName = "text-black text-heading-h3 pl-[3vw]"; // 가게 이름 텍스트

// 우측 (가게 종류 + 버튼)
export const rightSide = "flex flex-row justify-start items-center"; // 오른쪽 영역: 가게 종류 + 버튼 정렬
export const storeType = "text-black text-heading-h6 pr-[3vw]"; // 가게 종류 텍스트
export const arrowIcon = (isOpen: boolean) =>
	`transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`; // 버튼 클릭 시 회전 효과

// 확장 영역 배경 (height는 style에서 직접 제어)
export const expandableSection =
	"transition-[height] duration-500 ease-in-out overflow-hidden"; // height는 style 속성으로 설정

// 확장 섹션 내부 컨테이너 (텍스트 + 이미지 전체 래퍼)
export const expandableInnerContainer =
	"flex flex-row justify-between items-center px-[4vw] pt-[6vh] pb-[8vh]"; // 데스크탑: 수평 정렬

// 확장 섹션 내부에서 왼쪽 section 관련 디자인 (위치/링크를 표시해 주는 곳)
export const bottomLeftSide = "flex flex-col justify-center items-start gap-15";
export const textRow = "flex flex-row justify-start items-center"; // 아이콘과 텍스트가 있는 줄 구성
export const detailText = "text-black text-heading-h6 pl-[2vw]"; // 확장 영역의 왼쪽 부분 세부 내용 글꼴

// 지도가 들어갈 영역
export const mapContainer = "w-[40vh] h-[30vh] flex-shrink-0"; // 고정 크기 지도 이미지 컨테이너
export const mapCanvas = "w-full h-[30vh] rounded-md";
