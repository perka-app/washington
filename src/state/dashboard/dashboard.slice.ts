/* eslint-disable immutable/no-mutation */
import { createSlice } from '@reduxjs/toolkit'

import { ClientRecord } from 'models'

type DashboardState = {
  data: {
    clientsCount: number
    clientsRecords: ClientRecord[]
  } | null
  processes: {
    fetchingData: {
      pending: boolean
      error: string | null
    }
  }
}

const initialState: DashboardState = {
  data: null,
  processes: {
    fetchingData: {
      pending: false,
      error: null,
    },
  },
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.data = null
      state.processes.fetchingData.pending = true
      state.processes.fetchingData.error = null
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload
      state.processes.fetchingData.pending = false
    },
    fetchDataError: (state, action) => {
      state.processes.fetchingData.pending = false
      state.processes.fetchingData.error = action.payload || 'Failed to fetch data'
    },
  },
})

export const dashboardActions = dashboardSlice.actions
export const dashboardReducer = dashboardSlice.reducer
