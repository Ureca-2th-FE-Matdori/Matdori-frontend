import { createContext, useContext } from "react";

export const IsMobileContext = createContext<boolean>(false); // 화면이 768px 이하인지 아닌지 확인하는 값 저장함
export const useIsMobile = () => useContext(IsMobileContext); // IsMobileContext 값을 가져오는 custom Hook
