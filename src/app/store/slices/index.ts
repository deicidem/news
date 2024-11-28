import { combineReducers } from '@reduxjs/toolkit';
import { selectedDateSlice } from './selectedDate/selectedDateSlice';

const rootReducer = combineReducers({
	//[userSlice.name]: userSlice.reducer,
	[selectedDateSlice.name]: selectedDateSlice.reducer,
});

export default rootReducer;
