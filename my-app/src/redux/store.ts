import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';

// Kết hợp các reducer
const rootReducer = combineReducers({
    user: userReducer,
});

// Cấu hình Redux Persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Tắt kiểm tra tuần tự hóa
        }),
});

// Tạo persistor
export const persistor = persistStore(store);

// Các kiểu hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
