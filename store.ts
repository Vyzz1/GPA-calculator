import { configureStore } from "@reduxjs/toolkit";
import cumulativeReducer from "./features/cumulative";

export const store = configureStore({
  reducer: {
    // Add reducers here
    cumulative: cumulativeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
