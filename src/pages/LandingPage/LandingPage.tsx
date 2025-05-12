import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import { PATH } from "@constants/path";
import MatdoriLogo from "@assets/matdori-logo.svg";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full h-full flex">
			<div className="absolute top-0 left-0 overflow-hidden">
				<img
					src={MatdoriLogo}
					alt="MatdoriLogo"
					className="w-[15vw] -translate-x-[40px] -translate-y-[40px] rotate-[-230deg] "
				/>
			</div>
			<div className="absolute bottom-0 left-0 overflow-hidden">
				<img
					src={MatdoriLogo}
					alt="MatdoriLogo"
					className="w-[15vw] -translate-x-[40px] translate-y-[40px] rotate-[45deg]"
				/>
			</div>
			<div className="absolute top-0 right-0 overflow-hidden">
				<img
					src={MatdoriLogo}
					alt="MatdoriLogo"
					className="w-[15vw] translate-x-[60px] -translate-y-[60px] rotate-[210deg]"
				/>
			</div>
			<div className="absolute bottom-0 right-0 overflow-hidden">
				<img
					src={MatdoriLogo}
					alt="MatdoriLogo"
					className="w-[15vw] translate-x-[30px] translate-y-[30px] rotate-[-45deg]"
				/>
			</div>
			<div className="absolute bottom-0 right-[30%] overflow-hidden">
				<img
					src={MatdoriLogo}
					alt="MatdoriLogo"
					className="w-[15vw] translate-y-[120px]"
				/>
			</div>
			<div className="absolute top-0 right-[30%] overflow-hidden">
				<img
					src={MatdoriLogo}
					alt="MatdoriLogo"
					className="w-[15vw] -translate-y-[80px] rotate-[180deg]"
				/>
			</div>
			<div className="w-2/5 relative">
				<div className="absolute top-[5%] right-[5%] overflow-hidden	">
					<img
						src={MatdoriLogo}
						alt="MatdoriLogo"
						className="w-[15vw] rotate-[20deg]"
					/>
				</div>
				<div className="absolute bottom-[10%] right-0 overflow-hidden ">
					<img
						src={MatdoriLogo}
						alt="MatdoriLogo"
						className="w-[15vw] rotate-[-30deg]"
					/>
				</div>
			</div>
			<div className="w-3/5 flex justify-center items-center">
				<div className="flex flex-col gap-[var(--spacing-20)]">
					<div className="flex flex-col text-center">
						<p className="text-heading-logo text-text-info font-bold leading-[1]">
							Matdori
						</p>
						<p className="text-lg text-text-black font-bold">
							“오늘 뭐 먹지?” 고민될 때, “맛도리”가 너를 대신해서 메뉴를
							픽해준다고?
						</p>
					</div>
					<div className="flex flex-col p-[var(--spacing-28)] gap-[var(--spacing-4)]">
						<div className="h-48">
							<Button
								label="시작 하기"
								size="sm"
								onClick={() => navigate(PATH.SIGNUP)}
							/>
						</div>
						<div className="flex justify-center items-center gap-[var(--spacing-12)]">
							<p className="text-body-md font-bold">계정이 있으신가요?</p>
							<a
								className="text-body-md font-bold text-text-info hover:text-text-brand"
								href={PATH.LOGIN}>
								로그인하기
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
