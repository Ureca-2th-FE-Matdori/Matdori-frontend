import CategoryMap from "@assets/svg/category-map.svg";
import CategoryIcon from "@components/CategoryPage/CategoryIcon/CategoryIcon";
import { CATEGORY_MAP } from "@constants/category";

const positions = [
	{ x: 20, y: 37 },
	{ x: 16, y: 68 },
	{ x: 38, y: 45 },
	{ x: 44, y: 22 },
	{ x: 55, y: 44 },
	{ x: 57, y: 84 },
	{ x: 70, y: 36 },
	{ x: 82, y: 25 },
	{ x: 54, y: 26 },
	{ x: 32, y: 84 },
	{ x: 45, y: 78 },
	{ x: 90, y: 72 },
	{ x: 70, y: 75 },
	{ x: 82, y: 63 },
	{ x: 43, y: 58 },
];

const CategoryPage = () => {
	const categories = Object.keys(CATEGORY_MAP);

	return (
		<div
			className="w-full h-full max-h-[1080px] bg-cover bg-center bg-no-repeat relative"
			style={{
				backgroundImage: `url(${CategoryMap})`,
			}}>
			{categories.map((category, index) => (
				<CategoryIcon
					key={category}
					categoryType={category}
					position={positions[index]}
				/>
			))}
		</div>
	);
};

export default CategoryPage;
