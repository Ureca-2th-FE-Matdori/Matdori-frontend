export const Container = "w-full h-full flex";

export const imagePosition = {
	topLeft: "absolute top-0 left-0 overflow-hidden",
	bottomLeft: "absolute bottom-0 left-0 overflow-hidden",
	topRight: "absolute top-0 right-0 overflow-hidden",
	bottomRight: "absolute bottom-0 right-0 overflow-hidden",
	bottomMidRight: "absolute bottom-0 right-[30%] overflow-hidden",
	topMidRight: "absolute top-0 right-[30%] overflow-hidden",
	innerTopRight: "absolute top-[5%] right-[5%] overflow-hidden",
	innerBottomRight: "absolute bottom-[10%] right-0 overflow-hidden",
};

export const logoImage = {
	logo1: "w-[15vw] -translate-x-[40px] -translate-y-[40px] rotate-[-230deg]",
	logo2: "w-[15vw] -translate-x-[40px] translate-y-[40px] rotate-[45deg]",
	logo3: "w-[15vw] translate-x-[60px] -translate-y-[60px] rotate-[210deg]",
	logo4: "w-[15vw] translate-x-[30px] translate-y-[30px] rotate-[-45deg]",
	logo5: "w-[15vw] translate-y-[120px]",
	logo6: "w-[15vw] -translate-y-[80px] rotate-[180deg]",
	logo7: "w-[15vw] rotate-[20deg]",
	logo8: "w-[15vw] rotate-[-30deg]",
};

export const leftContainer = "w-2/5 relative";

export const contentContainer = "w-3/5 flex justify-center items-center";

export const motionContainer = "flex flex-col gap-[var(--spacing-20)]";

export const textWrapper = "flex flex-col text-center";

export const logoText =
	"text-heading-logo text-text-info font-bold leading-[1]";

export const descriptionText = "text-lg text-text-black font-bold";

export const buttonContainer =
	"flex flex-col p-[var(--spacing-28)] gap-[var(--spacing-4)]";

export const buttonWrapper = "h-48";

export const loginWrapper =
	"flex justify-center items-center gap-[var(--spacing-12)]";

export const loginText = "text-body-md font-bold";

export const loginLink =
	"text-body-md font-bold text-text-info hover:text-text-brand";
