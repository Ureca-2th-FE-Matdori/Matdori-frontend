export const pickupWrapper =
	"bg-bg-secondary w-full h-full flex flex-col justify-center items-center overflow-x-hidden";

export const pickupTitle = (isMobile: boolean) =>
	`text-center ${isMobile ? "text-heading-h6 mb-[5vh]" : "text-heading-h3 mb-[5vh]"}`;

export const pickupCardWrapper = (isMobile: boolean) =>
	`flex justify-center ${
		isMobile ? "flex-col items-center gap-[5vw]" : "flex-row gap-[5vw]"
	}`;
