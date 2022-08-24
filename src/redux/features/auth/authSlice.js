import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isAdmin: localStorage.getItem('isAdmin'),
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId')
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    loadUser(state) {
      state.isAdmin = localStorage.getItem('isAdmin') || false;
      state.token = localStorage.getItem('token') || null;
      state.isLoggedIn = localStorage.getItem('token') ? true : false;
      state.userId = localStorage.getItem('userId') || null;
    },
    signIn(state, action) {
      const { payload } = action;
      const { token, id, isAdmin } = payload;

      state.token = token;
      state.isAdmin = isAdmin;
      state.isLoggedIn = true;
      state.userId = id;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('isAdmin', isAdmin);
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.isAdmin = false;
      state.userId = null;
      localStorage.clear();
    },
  },
});

export const { signIn, signOut, setLoading, loadUser } = authSlice.actions;

export default authSlice.reducer;
