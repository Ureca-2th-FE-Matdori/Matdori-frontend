import * as styles from "./ResultInfoBox.style";

interface ResultInfoBoxProps {
	label: string;
	value: string;
}

const ResultInfoBox = ({ label, value }: ResultInfoBoxProps) => {
	return (
		<div className={styles.resultInfoBoxWrapper}>
			<div className="mx-2">{label}</div>
			<div>{value}</div>
		</div>
	);
};

export default ResultInfoBox;
