import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      email: "",
      photoUrl: "",
    },
    pending: false,
    error: false,
  },
  reducers: {
    signInSuccessful: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.error = false;
    },
    startSignIn: (state) => {
      state.pending = true;
      state.error = false;
    },
    logOut: (state) => {
      state.userInfo = { name: "", email: "", photoUrl: "" };
    },
  },
});

export const { startSignIn, signInSuccessful, logOut } = userSlice.actions;

export default userSlice.reducer;
