import React from 'react'
import { cn } from '@bem-react/classname'
import { useNavigate } from 'react-router'
import { Tooltip, Typography } from '@mui/material'
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
        {process.env.REACT_APP_NAME || 'PERKA'}
      </Typography>

      {user ? (
        <div className={bem('UserControls')}>
          <Typography variant="h6" className={bem('Name')}>
            {user.name}
          </Typography>

          <Tooltip title="Open user settings">
            <UserButton className={bem('UserButton')} onClick={userPage} />
          </Tooltip>

          <Tooltip title="Logout">
            <LogoutButton className={bem('LogoutButton')} onClick={logout} />
          </Tooltip>
        </div>
      ) : null}
    </div>
  )
}
