import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state

export interface User {
  _id: number;
  email: string;
  name: string;
  lastname: string;
}

interface Auth {
  status: "authenticated" | "not-authenticated" | "checking";
  errorMessage: string | null;
  user: User;
}


// Define the initial state using that type
const initialState: Auth = {
  status: "not-authenticated",
  user: {} as User,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {} as User;
      state.errorMessage = null;
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout: (state, action: PayloadAction<string | null>) => {
      state.status = "not-authenticated";
      state.user = {} as User;
      state.errorMessage = action.payload;
    },
  },
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
