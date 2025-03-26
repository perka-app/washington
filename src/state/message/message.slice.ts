/* eslint-disable immutable/no-mutation */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

type MessageState = {
  proccesses: {
    sendingMessage: {
      pending: boolean
      error: string | null
    }
  }
  success: {
    sentAt: string
    reciversCount: number
  } | null
}

const initialState: MessageState = {
  proccesses: {
    sendingMessage: {
      pending: false,
      error: null,
    },
  },
  success: null,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<{ title: string; message: string }>) => {
      state.proccesses.sendingMessage.pending = true
      state.proccesses.sendingMessage.error = null
    },
    sendTestMessage: (
      state,
      action: PayloadAction<{ title: string; message: string; email: string }>,
    ) => {
      state.proccesses.sendingMessage.pending = true
      state.proccesses.sendingMessage.error = null
    },
    sendMessageSuccess: (
      state,
      action: PayloadAction<{ sentAt: string; reciversCount: number }>,
    ) => {
      state.proccesses.sendingMessage.pending = false
      state.success = action.payload
    },
    sendMessageError: (state, action) => {
      state.proccesses.sendingMessage.pending = false
      state.proccesses.sendingMessage.error = action.payload || 'Failed to send message'
    },
    reset: () => initialState,
  },
})

export const messageActions = messageSlice.actions
export const messageReducer = messageSlice.reducer
