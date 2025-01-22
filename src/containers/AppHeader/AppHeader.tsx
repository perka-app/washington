import React from 'react'
import { cn } from '@bem-react/classname'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { userActions, restoreUser, userSelector } from 'state/user'
import { ReactComponent as LogoutButton } from 'assets/buttons/exit.svg'
import { ReactComponent as UserButton } from 'assets/buttons/user.svg'
import { AppDispatch } from 'state/store'

import './styles.scss'

export const AppHeader: React.FC = () => {
  const bem = cn('AppHeader')
  const user = useSelector(userSelector)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const logout = () => dispatch(userActions.logoutUser())
  const userPage = () => navigate('/user')

  React.useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <div className={bem()}>
      <Typography variant="h4" className={bem('Logo')}>
        PERKA
      </Typography>

      {user ? (
        <div className={bem('UserControls')}>
          <Typography variant="h6" className={bem('Name')}>
            {user.name}
          </Typography>

          <UserButton className={bem('UserButton')} onClick={userPage} />

          <LogoutButton className={bem('LogoutButton')} onClick={logout} />
        </div>
      ) : null}
    </div>
  )
}
