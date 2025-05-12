import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import AnimatedLogo from "@components/LandingPage/AnimatedLogo";
import { motion } from "framer-motion";
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

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.Container}>
			{logoPositions.map(({ position, className, delay }) => (
				<div className={position}>
					<AnimatedLogo className={className} delay={delay} />
				</div>
			))}

			<div className={styles.leftContainer}>
				{innerlogoPositions.map(({ position, className, delay }) => (
					<div className={position}>
						<AnimatedLogo className={className} delay={delay} />
					</div>
				))}
			</div>

			<div className={styles.contentContainer}>
				<motion.div
					className={styles.motionContainer}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.7, duration: 0.8 }}>
					<div className={styles.textWrapper}>
						<p className={styles.logoText}>Matdori</p>
						<p className={styles.descriptionText}>
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
