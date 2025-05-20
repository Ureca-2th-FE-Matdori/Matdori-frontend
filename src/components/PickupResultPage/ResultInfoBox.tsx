import { useIsMobile } from "@stores/IsMobileContext";
import * as styles from "./ResultInfoBox.style";

interface ResultInfoBoxProps {
	label: string;
	value: React.ReactNode;
}

const ResultInfoBox = ({ label, value }: ResultInfoBoxProps) => {
	const isMobile = useIsMobile();

	return (
		<div className={styles.resultInfoBoxWrapper(isMobile)}>
			<div className="mx-2">{label}</div>
			<div>{value}</div>
		</div>
	);
};

export default ResultInfoBox;
