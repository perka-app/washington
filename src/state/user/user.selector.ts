import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

const selectUserSlice = (state: RootState) => state.user

export const userSelector = createSelector(selectUserSlice, (userState) => userState.user)

export const isAuthorizedSelector = createSelector(selectUserSlice, (userState) =>
  userState.user ? true : false,
)

export const loginProcessSelector = createSelector(
  selectUserSlice,
  (userState) => userState.processes.login,
)
