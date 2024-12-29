import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/UserModel";

interface UserState {
  user: User | undefined;
}

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
