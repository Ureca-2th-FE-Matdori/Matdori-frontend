import { configureStore, combineReducers } from "@reduxjs/toolkit";
import toastReducer from "@stores/slices/toastSlice";
import userReducer from "@stores/slices/userSlice";

const rootReducer = combineReducers({
	user: userReducer,
	toast: toastReducer,
});

export const store = configureStore({
	reducer: {
		rootReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
