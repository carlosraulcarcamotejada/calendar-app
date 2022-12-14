import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import calendarSlice from "./calendar/calendarSlice";
import uiSlice from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    calendar: calendarSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
