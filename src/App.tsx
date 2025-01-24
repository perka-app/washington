import React from 'react'
import { cn } from '@bem-react/classname'
import { Routes, Route, Navigate } from 'react-router'

import { AuthGuard, UnAuthGuard } from 'guards'
import { Communication } from 'pages/communication/Communication'
import { Dashboard } from 'pages/dashboard/Dashboard'
import { AppHeader } from 'containers/AppHeader/AppHeader'
import { Login } from 'pages/login/Login'
import { User } from 'pages/user/User'

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
          <Routes>
            <Route index element={<AuthGuard comp={<Dashboard />} />}></Route>

            <Route path="/user" element={<AuthGuard comp={<User />} />} />

            <Route
              path="/communication"
              element={<AuthGuard comp={<Communication />} />}
            />

            <Route path="/login" element={<UnAuthGuard comp={<Login />} />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
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
