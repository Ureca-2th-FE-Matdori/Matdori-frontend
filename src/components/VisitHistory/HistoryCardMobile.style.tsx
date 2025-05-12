// 카드 전체 wrapper
export const cardWrapper =
	"w-full bg-bg-white flex flex-col rounded-3xl overflow-hidden min-w-[280px]"; // 전체 카드 틀 (세로 정렬, 흰색 배경, 모서리 둥글게)

// 상단 요약 섹션
export const topSection =
	"flex flex-row justify-between items-center px-[5vw] py-[2vh]"; // 카드 상단: 좌우 정렬, padding 포함

// 좌측 (가게 이름 등)
export const leftSide = "flex flex-row justify-start items-center";
export const avatar = "bg-bg-primary w-12 h-12 rounded-full";
export const storeName = "text-black text-heading-h6 font-bold pl-[5vw]";

// 우측 (가게 종류 + 버튼)
export const rightSide = "flex flex-row justify-end items-center";
export const storeType = "text-black text-body-sm pr-[4vw]";
export const arrowIcon = (isOpen: boolean) =>
	`w-[6vw] h-auto transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`;

// 확장 영역 (height는 style에서 직접 제어)
export const expandableSection =
	"transition-[height] duration-500 ease-in-out overflow-hidden";

// 확장 내부 전체 컨테이너
export const expandableInnerContainer =
	"flex flex-col justify-between items-start px-[5vw] pt-[2vh] pb-[4vh] gap-5"; // 모바일: 수직 정렬

// 텍스트 묶음 (위치/링크를 표시해 주는 곳)
export const detailBlock = "flex flex-col gap-1";
export const titleText = "text-black text-body-lg text-bold";
export const detailText = "text-black text-body-sm";

// 지도
export const mapContainer = "w-full h-[30vh] flex-shrink-0";
export const mapCanvas = "w-full h-[30vh] rounded-md";
