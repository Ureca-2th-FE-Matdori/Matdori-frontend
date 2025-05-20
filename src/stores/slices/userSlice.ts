// user 정보를 전역으로 사용할 수 있는 전역 상태관리 작성
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 유저 상태에 대하여 추가 고려하여 USerState로 분리
interface UserState {
	userId: string | null;
}

// 초기값 null
const initialState: UserState = {
	userId: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// userId 저장
		setUserId: (state, action: PayloadAction<string>) => {
			/* eslint-disable no-param-reassign */
			state.userId = action.payload;
		},
		// userId 초기화
		clearUserId: (state) => {
			state.userId = null;
		},
	},
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
