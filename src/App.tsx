import React from 'react'
import { cn } from '@bem-react/classname'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { AuthGuard, UnAuthGuard } from 'guards'
import { CommunicationPage } from 'pages/communication'
import { DashboardPage } from 'pages/dashboard'
import { LoginPage } from 'pages/login'
import { AppHeader } from 'containers/AppHeader'

import 'App.scss'

export const App: React.FC = () => {
  const bem = cn('App')
  const arrow = (id: number) => bem('Arrow', { [id]: true })
  const images = './assets/images'

  return (
    <div className={bem()}>
      <AppHeader />

      <div className={bem('Body')}>
        <div className={bem('LeftBar')}>
          <img className={arrow(1)} src={`${images}/arrow_3.png`} alt="arr1" />
          <img className={arrow(2)} src={`${images}/arrow_4.png`} alt="arr2" />
          <img className={arrow(3)} src={`${images}/arrow_2.png`} alt="arr3" />
        </div>

        <div className="App-Content">
          <BrowserRouter>
            <Routes>
              <Route index element={<AuthGuard comp={<DashboardPage />} />}></Route>

              <Route
                path="/communication"
                element={<AuthGuard comp={<CommunicationPage />} />}
              />

              <Route path="/login" element={<UnAuthGuard comp={<LoginPage />} />} />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </div>

        <div className="App-RightBar">
          <img className={arrow(1)} src={`${images}/arrow_2.png`} alt="arr1" />
          <img className={arrow(2)} src={`${images}/arrow_4.png`} alt="arr2" />
          <img className={arrow(3)} src={`${images}/arrow_3.png`} alt="arr3" />
        </div>
      </div>
    </div>
  )
}
