export const pickupResultWrapper =
	"w-full h-full bg-bg-primary flex flex-col  justify-center items-center";

export const pickupResulLottie = "flex flex-row";

export const pickupResultText = (isMobile: boolean) =>
	`w-full flex  flex-col justify-center items-center
 ${isMobile ? " text-[25px]" : "text-heading-h4"}`;

export const pickupResulmodal =
	"bg-bg-secondary w-[70vw] p-10 flex flex-col justify-center items-center rounded-input flex overflow-hidden";

export const pickupResultinfo = (isMobile: boolean) =>
	`flex flex-row gap-10 w-full  h-full mb-[5vh] justify-center items-center
${isMobile ? "ml-[10vw] ,mb-[2vh] flex-col" : "mb-[5vh]"}`;

export const pickupResultButton =
	"flex flex-row justify-around w-full justify-around";
