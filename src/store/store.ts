import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middlewares";
import { appReducer } from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
