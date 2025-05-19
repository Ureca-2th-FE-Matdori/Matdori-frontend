export const pickupResultWrapper =
	"w-full h-full bg-bg-primary flex flex-col  justify-center items-center";

export const pickupResulLottie = "flex flex-row";

export const pickupResultText = (isMobile: boolean) =>
	`w-full flex flex-col justify-center items-center
 ${isMobile ? "text-[25px] mb-5" : "w-full text-heading-h4"}`;

export const resultLineBreak = (isMobile: boolean) =>
	isMobile ? "block w-full text-center" : "";

export const pickupResulmodal = (isMobile: boolean) =>
	`bg-bg-secondary flex flex-col justify-center items-center rounded-input flex overflow-hidden ${isMobile ? "p-5 w-full" : "p-10 w-[70vw]"}`;

export const pickupResultinfo = (isMobile: boolean) =>
	`flex  w-full mb-[5vh] justify-center items-center
${isMobile ? "flex-col ,mb-[2vh]" : "flex-row gap-10 mb-[5vh] h-full"}`;

export const naverMap = (isMobile: boolean) =>
	`${isMobile ? "w-full h-auto" : "w-full h-full"}`;

export const pickupResultButton = (isMobile: boolean) =>
	`flex flex-row  w-full ${isMobile ? "gap-5 justify-center" : "justify-around"}`;
