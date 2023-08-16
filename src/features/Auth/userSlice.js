import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "api/userApi";

export const register = createAsyncThunk("user/register", async (payload) => {
  // fetch api to register

  const data = await userAPI.register(payload);
  // save data to local storage
  localStorage.setItem("access_token", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  // fetch api to register

  const data = await userAPI.login(payload);
  // save data to local storage
  localStorage.setItem("access_token", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      // remove user for LocalStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;
