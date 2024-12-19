import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUserSlice {
	isAuth: boolean;
}

const initialState: AuthUserSlice = {
	isAuth: false,
};

const AUTH_USER_SLICE_NAME = 'authUser';
export const authUserSlice = createSlice({
	name: 'AUTH_USER_SLICE_NAME',
	initialState,
	reducers: {
		setAuthUser(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload;
		},
		clearAuthUser(state) {
			state.isAuth = false;
		},
	},
	selectors: {
		getIsAuthUser: (state: AuthUserSlice) => state.isAuth,
	},
});

// export const { setSelectedDate, clearSelectedDate } = selectedDateSlice.actions;
// export default selectedDateSlice.reducer;
