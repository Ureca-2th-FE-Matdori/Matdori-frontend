import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import AnimatedLogo from "@components/LandingPage/AnimatedLogo";
import { motion } from "framer-motion";
import { useIsMobile } from "@stores/IsMobileContext";
import { PATH } from "@constants/path";
import * as styles from "./LandingPage.style";

const logoPositions = [
	{
		position: styles.imagePosition.topLeft,
		className: styles.logoImage.logo1,
		delay: 0.1,
	},
	{
		position: styles.imagePosition.bottomLeft,
		className: styles.logoImage.logo2,
		delay: 0.3,
	},
	{
		position: styles.imagePosition.topRight,
		className: styles.logoImage.logo3,
		delay: 0.5,
	},
	{
		position: styles.imagePosition.bottomRight,
		className: styles.logoImage.logo4,
		delay: 0.7,
	},
	{
		position: styles.imagePosition.bottomMidRight,
		className: styles.logoImage.logo5,
		delay: 0.9,
	},
	{
		position: styles.imagePosition.topMidRight,
		className: styles.logoImage.logo6,
		delay: 1.1,
	},
];

const innerlogoPositions = [
	{
		position: styles.imagePosition.innerTopRight,
		className: styles.logoImage.logo7,
		delay: 1.3,
	},
	{
		position: styles.imagePosition.innerBottomRight,
		className: styles.logoImage.logo8,
		delay: 1.5,
	},
];

const logoPositionsM = [
	{
		position: styles.imagePosition.topLeft,
		className: styles.logoImageM.logo1,
		delay: 0.1,
	},
	{
		position: styles.imagePosition.bottomLeft,
		className: styles.logoImageM.logo2,
		delay: 0.3,
	},
	{
		position: styles.imagePosition.topRight,
		className: styles.logoImageM.logo3,
		delay: 0.5,
	},
	{
		position: styles.imagePosition.bottomRight,
		className: styles.logoImageM.logo4,
		delay: 0.7,
	},
];

const LandingPage = () => {
	const isMobile = useIsMobile();
	const navigate = useNavigate();

	return (
		<div className={styles.Container}>
			{!isMobile ? (
				<>
					{logoPositions.map(({ position, className, delay }) => (
						<div className={position} key={className}>
							<AnimatedLogo className={className} delay={delay} />
						</div>
					))}
				</>
			) : (
				<>
					{logoPositionsM.map(({ position, className, delay }) => (
						<div className={position} key={className}>
							<AnimatedLogo className={className} delay={delay} />
						</div>
					))}
				</>
			)}

			{!isMobile && (
				<div className={styles.leftContainer}>
					{innerlogoPositions.map(({ position, className, delay }) => (
						<div className={position}>
							<AnimatedLogo className={className} delay={delay} />
						</div>
					))}
				</div>
			)}

			<div
				className={`flex justify-center items-center ${
					isMobile ? "w-full flex-col text-center px-6" : "w-3/5"
				}`}>
				<motion.div
					className={`flex flex-col gap-[var(--spacing-20)] ${isMobile ? "w-full" : ""}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: isMobile ? 0.9 : 1.7, duration: 0.8 }}>
					<div
						className={`flex flex-col text-center ${isMobile ? "gap-[var(--spacing-20)]" : ""}`}>
						<p
							className={`text-text-info leading-[1] font-bold ${
								isMobile ? "text-7xl" : "text-heading-logo"
							}`}>
							Matdori
						</p>
						<p
							className={`font-bold text-text-black ${
								isMobile ? "text-xl" : "text-lg"
							}`}>
							“오늘 뭐 먹지?” 고민될 때, “맛도리”가 너를 대신해서 메뉴를
							픽해준다고?
						</p>
					</div>
					<div className={styles.buttonContainer}>
						<div className={styles.buttonWrapper}>
							<Button
								label="시작 하기"
								size="sm"
								onClick={() => navigate(PATH.LOGIN)}
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default LandingPage;
