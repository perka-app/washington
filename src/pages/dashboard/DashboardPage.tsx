import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@bem-react/classname'

import { DebugInfo } from 'components'
import { AppDispatch } from 'state/store'
import { userSelector } from 'state/user'

import './DashboardPage.scss'

export const DashboardPage: React.FC = () => {
  const bem = cn('Dashboard')
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(userSelector)
  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1)
  }, [])

  useEffect(() => {
    console.log('User:', user)
  }, [user])

  useEffect(() => {
    dispatch({ type: 'user/fetchUserData' })
  }, [dispatch])

  return (
    <div className={bem()}>
      <DebugInfo info={renderCount} />
      Dashboard Page
    </div>
  )
}
