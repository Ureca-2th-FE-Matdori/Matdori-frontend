import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
	variant: "Success" | "Warning";
	message: string;
	isVisible: boolean;
	isActive: boolean;
}

const initialState: ToastState = {
	variant: "Success",
	message: "",
	isVisible: false,
	isActive: false,
};

const toastSlice = createSlice({
	name: "Toast",
	initialState,
	reducers: {
		setToast: (
			state,
			action: PayloadAction<Pick<ToastState, "variant" | "message">>
		) => {
			/* eslint-disable no-param-reassign */
			state.variant = action.payload.variant;
			state.message = action.payload.message;
			state.isVisible = true;
			state.isActive = true;
		},

		deactivateToast: (state) => {
			state.isActive = false;
		},

		removeToast: (state) => {
			state.isVisible = false;
		},
	},
});

export const { setToast, deactivateToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
