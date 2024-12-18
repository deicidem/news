import { combineReducers } from '@reduxjs/toolkit';
import { selectedDateSlice } from './selectedDate/selectedDateSlice';
import { loadingSlice } from '@/app/store/slices/loading/loadingSlice';

const rootReducer = combineReducers({
	//[userSlice.name]: userSlice.reducer,
	[selectedDateSlice.name]: selectedDateSlice.reducer,
	[loadingSlice.name]: loadingSlice.reducer,
});

export default rootReducer;
