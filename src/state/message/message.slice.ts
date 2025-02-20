/* eslint-disable immutable/no-mutation */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MessageState = {
  message: string | null
  proccesses: {
    sendingMessage: {
      pending: boolean
      error: string | null
    }
  }
}

const initialState: MessageState = {
  message: null,
  proccesses: {
    sendingMessage: {
      pending: false,
      error: null,
    },
  },
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<{ title: string; message: string }>) => {
      state.proccesses.sendingMessage.pending = true
      state.proccesses.sendingMessage.error = null
    },
    sendMessageSuccess: (state) => {
      state.proccesses.sendingMessage.pending = false
    },
    sendMessageError: (state, action) => {
      state.proccesses.sendingMessage.pending = false
      state.proccesses.sendingMessage.error = action.payload || 'Failed to send message'
    },
  },
})

export const messageActions = messageSlice.actions
export const messageReducer = messageSlice.reducer
