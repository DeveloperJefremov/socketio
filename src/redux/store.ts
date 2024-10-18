import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';
import userSlice from './userSlice';
const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		chat: chatSlice.reducer,
	},
});
export default store;
