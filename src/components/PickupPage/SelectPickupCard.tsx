import Button from "@components/common/Button/Button";
import Lottie from "lottie-react";
import { useIsMobile } from "@stores/IsMobileContext";
import * as styles from "./SelectPickupCard.style";

interface SelectPickupCardProps {
	title: string;
	animationData: object;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	buttonlabel: string;
}

const SelectPickupCard = ({
	title,
	animationData,
	onClick,
	buttonlabel,
}: SelectPickupCardProps) => {
	const isMobile = useIsMobile();

	return (
		<div className={styles.pickupCardContainer}>
			<div className={styles.pickupCardTitle}>{title}</div>
			{!isMobile && (
				<Lottie
					loop
					animationData={animationData}
					style={{ width: 300, height: 250 }}
				/>
			)}

			<div className={styles.pickupButtonContainer}>
				<Button size="sm" label={buttonlabel} onClick={onClick} />
			</div>
		</div>
	);
};

export default SelectPickupCard;
