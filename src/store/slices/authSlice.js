import { createSlice } from "@reduxjs/toolkit";
import { loginUserTC, registerUserTC, logoutUserTC } from "../thunks/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserTC.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserTC.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUserTC.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserTC.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUserTC.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUserTC.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
