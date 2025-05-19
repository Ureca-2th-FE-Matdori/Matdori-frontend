import { useNavigate } from "react-router-dom";
import MatdoriLogo from "@assets/svg/matdori-logo.svg";
import Button from "@components/common/Button/Button";
import { PATH } from "@constants/path";

const UnauthorizedPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center gap-[var(--spacing-100)]">
			<img className="w-[300px] h-[300px]" src={MatdoriLogo} alt="Logo" />
			<div className=" flex justify-center items-center">
				<div className="flex flex-col gap-[var(--spacing-32)]">
					<p className="text-heading-h1 text-text-black font-bold">
						잘못된 접근입니다.
					</p>
					<div className="flex flex-col gap-[var(--spacing-16)] text-gray-600">
						<p className="text-body-lg">
							이 페이지는 로그인한 사용자만 접근할 수 있습니다.
						</p>
						<p className="text-body-lg">로그인 후 다시 시도해주세요.</p>
					</div>
					<div className="h-48">
						<Button
							label="시작 하기"
							size="sm"
							onClick={() => navigate(PATH.ROOT)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UnauthorizedPage;
