import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from 'state/user'
import { dashboardReducer } from 'state/dashboard'
import { dashboardEpics } from 'state/dashboard/dashboard.epics'

const epicMiddleware = createEpicMiddleware()
const epics = combineEpics(dashboardEpics)

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

epicMiddleware.run(epics)
