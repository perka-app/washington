import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoginCredentials } from 'models/LoginCredentials'

import { userApi } from 'api'
import { getToken, saveToken } from 'state/user/user.token'

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      const token = await userApi.login(credentials)

      if (token) {
        const user = await userApi.getUserData(token)

        saveToken(token)

        return user
      } else {
        return rejectWithValue('Invalid login credentials')
      }
    } catch (e) {
      return rejectWithValue('An error occurred')
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
    } catch (e) {
      return rejectWithValue('An error occurred')
    }
  },
)
