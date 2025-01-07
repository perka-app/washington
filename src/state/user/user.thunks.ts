import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials } from "models/LoginCredentials";
import { User } from "models/UserModel";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (credentials.login) {
        return {
          name: credentials.login,
        } as User;
      } else {
        return rejectWithValue("Invalid login credentials");
      }
    } catch (e) {
      return rejectWithValue("An error occurred");
    }
  }
);
