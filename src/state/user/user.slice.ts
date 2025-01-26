/* eslint-disable immutable/no-mutation */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { loginUser, restoreUser, uploadImage } from 'state/user/user.thunks'
import { removeToken } from 'state/user/user.token'
import { User } from 'models/UserModel'

type UserState = {
  user?: User
  processes: {
    login: {
      pending: boolean
      error: string | null
    }
    uploadingImage: {
      pending: boolean
      error: string | null
    }
  }
}

const initialState: UserState = {
  user: undefined,
  processes: {
    login: {
      pending: false,
      error: null,
    },
    uploadingImage: {
      pending: false,
      error: null,
    },
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = undefined
      removeToken()
    },
  },
  extraReducers: (builder) => {
    // Login process
    builder
      .addCase(loginUser.pending, (state) => {
        state.processes.login.pending = true
        state.processes.login.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.processes.login.pending = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.processes.login.pending = false
        state.processes.login.error = action.payload as string
      })
      .addCase(restoreUser.pending, (state) => {
        state.processes.login.pending = true
        state.processes.login.error = null
      })
      .addCase(restoreUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.processes.login.pending = false
        state.user = action.payload
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.processes.login.pending = false
      })
      .addCase(uploadImage.pending, (state) => {
        state.processes.uploadingImage.pending = true
        state.processes.uploadingImage.error = null
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.processes.uploadingImage.pending = false
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.processes.uploadingImage.pending = false
        state.processes.uploadingImage.error = action.payload as string
      })
  },
})

export const userActions = userSlice.actions

export const userReducer = userSlice.reducer
