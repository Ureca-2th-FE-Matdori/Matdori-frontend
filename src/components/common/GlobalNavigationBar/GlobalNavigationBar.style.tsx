// GlobalNavigationBar 컴포넌트와 관련한 Tailwind style 값들을 저장한 style 파일

// 전체 GNB wrapper 스타일
export const headerWrapper =
	"w-full mx-auto px-[7vw] h-[10vh] flex justify-between items-center py-12 bg-bg-white"; // 양옆 여백 + 중앙 정렬 + 배경색 흰색

// 로고 이미지 스타일
export const logoStyle = "w-auto h-full"; // 가로 비율 유지, 세로 전체 높이 채우기

// 데스크탑 메뉴 래퍼 스타일 (768px 이상에서만 보임)
export const desktopMenuWrapper =
	"hidden md:flex flex-row items-center gap-100"; // 숨김 처리 후 md 이상에서 수평 정렬 및 간격 조정

// 데스크탑 메뉴 각각의 항목 스타일
export const desktopMenuItem =
	"text-black text-heading-h5 hover:text-text-brand"; // 검정 텍스트 + hover 시 브랜드 컬러

// 모바일 햄버거 버튼 스타일
export const mobileButton = "md:hidden focus:outline-none cursor-pointer"; // md 이하에서만 보임 + 포커스 제거 + 커서 변경

// 모바일 드롭다운 전체 wrapper 스타일 (열림/닫힘 상태에 따라 동적 처리)
export const mobileDropdownWrapper = (state: "opening" | "closing" | null) =>
	`md:hidden flex flex-col justify-between items-center gap-5 
   transition-all duration-500 ease-in-out bg-bg-white/50 px-[7vw] 
   ${
			state === "opening"
				? "max-h-[300px] opacity-100 py-6" // 드롭다운 열릴 때: 최대 높이, 불투명, padding 있음
				: "max-h-0 opacity-0 py-0" // 드롭다운 닫힐 때: 높이 0, 투명, padding 없음
		}`;

// 모바일 메뉴 항목 스타일 (열림 여부 + delay 값 기반)
export const mobileMenuItem = (isOpening: boolean, delay: string) =>
	`hover:text-text-brand text-black text-heading-h6 font-extrabold transform 
   transition-opacity duration-500 ease-out 
   ${delay} 
   ${isOpening ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"}`; // 열릴 때 서서히 나타남
