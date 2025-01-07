import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "state/user/user.thunks";
import { User } from "models/UserModel";

interface UserState {
  user?: User;
  processes: {
    login: {
      pending: boolean;
      error: string | null;
    };
  };
}

const initialState: UserState = {
  user: undefined,
  processes: {
    login: {
      pending: false,
      error: null,
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // Login process
    builder
      .addCase(loginUser.pending, (state) => {
        state.processes.login.pending = true;
        state.processes.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.processes.login.pending = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.processes.login.pending = false;
        state.processes.login.error =
          (action.payload as string) || "Unknown error";
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
