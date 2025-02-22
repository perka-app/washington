import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'state/store'

const selectMessageSlice = (state: RootState) => state.message

export const sendingMessageProcessSelector = createSelector(
  selectMessageSlice,
  (messageState) => messageState.proccesses.sendingMessage,
)

export const messageSuccessSelector = createSelector(
  selectMessageSlice,
  (messageState) => messageState.success,
)
