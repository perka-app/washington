import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoginCredentials } from 'shared/models/LoginCredentials'

import { userApi } from 'api'
import { getToken, saveToken } from 'state/user/user.token'
import { User } from 'shared/models/User'

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

      if (!token) {
        return rejectWithValue('No token found')
      }

      const user = await userApi.getUserData(token)

      return user
    } catch (e: unknown) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error')
    }
  },
)

export const uploadImage = createAsyncThunk(
  'user/uploadImage',
  async (image: File, { rejectWithValue }) => {
    try {
      const token = getToken()

      if (!token) {
        return rejectWithValue('No token found')
      }

      return await userApi.uploadImage(token, image)
    } catch (e: unknown) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error')
    }
  },
)

export const saveUserData = createAsyncThunk(
  'user/saveUserData',
  async (user: User, { rejectWithValue }) => {
    try {
      const token = getToken()

      if (!token) {
        return rejectWithValue('No token found')
      }

      await userApi.saveUserData(token, user)

      return user
    } catch (e: unknown) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error')
    }
  },
)
