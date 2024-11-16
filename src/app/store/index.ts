import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
	// [userSlice.name]: userSlice.reducer,
	// [userApi.reducerPath]: userApi.reducer,
	// [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	blacklist: [],
	//[authApi.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			[]
			//[authApi.middleware, userApi.middleware]
		),
});

export const persistor = persistStore(store);
export default store;
