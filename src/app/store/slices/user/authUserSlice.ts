import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUserSlice {
	isAuth: boolean;
	role: 'CLIENT' | 'ADMIN' | null;
}

const initialState: AuthUserSlice = {
	isAuth: false,
	role: null,
};
export const authUserSlice = createSlice({
	name: 'AUTH_USER_SLICE_NAME',
	initialState,
	reducers: {
		setAuthUser(
			state,
			action: PayloadAction<{
				isAuth: boolean;
				role: 'CLIENT' | 'ADMIN' | null;
			}>
		) {
			state.isAuth = action.payload.isAuth;
			state.role = action.payload.role;
		},
		clearAuthUser(state) {
			state.isAuth = false;
			state.role = null;
		},
	},
	selectors: {
		getIsAuthUser: (state: AuthUserSlice) => state.isAuth,
		getUser: (state: AuthUserSlice) => state,
	},
});
