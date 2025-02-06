import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'state/store'

const selectDashboardSlice = (state: RootState) => state.dashboard

export const dataSelector = createSelector(selectDashboardSlice, (s) => s.data)

export const loadingSelector = createSelector(
  selectDashboardSlice,
  (s) => s.processes.fetchingData.pending,
)

export const errorSelector = createSelector(
  selectDashboardSlice,
  (s) => s.processes.fetchingData.error,
)
