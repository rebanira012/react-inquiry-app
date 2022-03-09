import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import staffReducer from "../features/staffSlice";
import { save, load } from 'redux-localstorage-simple';

export const store = configureStore({
  reducer: {
    staff: staffReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save())
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
