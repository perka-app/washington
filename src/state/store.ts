import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from 'state/user'
import { dashboardReducer } from 'state/dashboard'

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
