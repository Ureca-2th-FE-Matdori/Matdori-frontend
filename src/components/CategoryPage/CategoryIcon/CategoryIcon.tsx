import { useNavigate } from "react-router-dom";
import * as CategoryImages from "@assets/svg/index";
import { CATEGORY_MAP } from "@constants/category";
import { PATH } from "@constants/path";

interface CategoryIconProps {
	categoryType: keyof typeof CATEGORY_MAP;
	position: {
		x: number;
		y: number;
	};
}

const CategoryIcon = ({ categoryType, position }: CategoryIconProps) => {
	const navigate = useNavigate();

	const imageKey =
		`Category${CATEGORY_MAP[categoryType]}` as keyof typeof CategoryImages;
	const imageHoverKey =
		`Category${CATEGORY_MAP[categoryType]}Hover` as keyof typeof CategoryImages;

	return (
		<button
			type="button"
			className="absolute group w-[7vw] aspect-square hover:w-[8vw] cursor-pointer"
			style={{
				left: `${position.x}%`,
				top: `${position.y}%`,
				transform: "translate(-50%, -50%)",
			}}
			onClick={() => navigate(`${PATH.RESULT}?mode=${categoryType}`)}>
			<img
				src={CategoryImages[imageKey]}
				alt={categoryType}
				className="w-full h-full"
			/>
			<img
				src={CategoryImages[imageHoverKey]}
				alt={categoryType}
				className="absolute w-[300px] h-[150px] top-0 right-0 translate-x-[70%] -translate-y-[60%] opacity-0 group-hover:opacity-100 pointer-events-none"
			/>
		</button>
	);
};

export default CategoryIcon;
