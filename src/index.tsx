import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './index.css'
import { App } from './App'
import { theme } from './theme'
import { store } from 'state/store'
import { BrowserRouter } from 'react-router'
import { http, setupInterceptors } from 'api/http'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

setupInterceptors(http(), store)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
