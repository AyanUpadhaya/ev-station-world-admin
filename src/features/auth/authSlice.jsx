import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null, 
  password:null
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state,action) => {
      state.email = "",
      state.password = "",
      localStorage.removeItem("evAuth");

    },
  },
});

export default authSlice.reducer;
export const {setAuth,logout} = authSlice.actions

