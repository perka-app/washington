import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from 'state/user'
import { messageEpics, messageReducer } from 'state/message'
import { dashboardReducer, dashboardEpics } from 'state/dashboard'

const epicMiddleware = createEpicMiddleware()
const epics = combineEpics(dashboardEpics, messageEpics)

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

epicMiddleware.run(epics)
