import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for admin authentication
 */
export const adminAuthSlice = createSlice({
  name: "adminauth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    authenticate: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

//exported actions
const { actions, reducer } = adminAuthSlice;

export const { authenticate, logout } = actions;

export const logOutAction = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};
