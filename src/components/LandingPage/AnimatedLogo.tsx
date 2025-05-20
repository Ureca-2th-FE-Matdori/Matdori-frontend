import MatdoriLogo from "@assets/svg/matdori-logo.svg";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
	className: string;
	delay: number;
}

const AnimatedLogo = ({ className, delay }: AnimatedLogoProps) => {
	return (
		<motion.img
			src={MatdoriLogo}
			alt="MatdoriLogo"
			className={className}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay, duration: 0.8 }}
		/>
	);
};

export default AnimatedLogo;
