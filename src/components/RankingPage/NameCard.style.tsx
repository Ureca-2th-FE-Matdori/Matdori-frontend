// src/components/RankingPage/NameCard.style.ts

export const wrapperStyle =
	"w-full h-[10vh] flex items-center justify-start gap-5";

export const cardStyle = (isMobile: boolean) =>
	`${isMobile ? "w-full" : "w-2/5"} h-[10vh] flex items-center justify-between bg-bg-white rounded-2xl shadow-md p-[2vh] gap-[4vw] opacity-0 animate-fade-in`;

export const rankCircleStyle =
	"w-40 h-40 flex items-center justify-center rounded-full bg-bg-white border-1 border-gray-300";

export const nameTextStyle =
	"text-heading-h6 font-bold max-w-[140px] truncate whitespace-nowrap";

export const medalIconStyle = (rank: number) =>
	`w-48 h-full ${rank > 3 ? "invisible" : ""}`;

export const graphWrapperStyle =
	"w-3/5 h-full flex items-center justify-start gap-3.5";

export const barStyle = "h-full bg-bg-primary rounded-xl shadow-md";

export const pointTextStyle = "text-heading-h7 opacity-0 animate-fade-in";
