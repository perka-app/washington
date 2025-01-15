import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoginCredentials } from 'models/LoginCredentials'

import { userApi } from 'api'
import { getToken, saveToken } from 'state/user/user.token'

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const token = await userApi.login(credentials)
      const user = await userApi.getUserData(token)

      saveToken(token)

      return user
    } catch (e: unknown) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error')
    }
  },
)

export const restoreUser = createAsyncThunk(
  'user/restore',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken()

      if (token) {
        const user = await userApi.getUserData(token)

        return user
      } else {
        return rejectWithValue('No token found')
      }
    } catch (e: unknown) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error')
    }
  },
)
