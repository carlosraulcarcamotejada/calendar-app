import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state
interface auth {}

// Define the initial state using that type
const initialState: auth = {};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onLogin: (state) => {},
    onLogout: (state) => {},
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
