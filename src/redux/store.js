
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userSlice from "./slice/userSlice";
import movieSlices from "./slice/movieSlices";
import trailerSlice from "./slice/watchTrailer";
import bookMarkSlice from "./slice/bookMarkSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData'] // Only persist userData reducer
};

const rootReducer = combineReducers({
  userData: userSlice,
  movie: movieSlices,
  trailerOpen: trailerSlice,
  bookMark: bookMarkSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
