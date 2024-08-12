import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
