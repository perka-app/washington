import React from 'react'
import { cn } from '@bem-react/classname'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Tooltip, Typography } from '@mui/material'

import { userActions, restoreUser, userSelector } from 'state/user'
import { ReactComponent as LogoutButton } from 'assets/buttons/exit.svg'
import { ReactComponent as UserButton } from 'assets/buttons/user.svg'
import { AppDispatch } from 'state/store'

import './AppHeader.scss'

export const AppHeader: React.FC = () => {
  const bem = cn('AppHeader')
  const user = useSelector(userSelector)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const logout = () => dispatch(userActions.logoutUser())
  const openUserPage = () => navigate('/user')

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
            {user.avatarUrl ? (
              <Avatar
                alt="avatar"
                className={bem('UserButton')}
                src={user.avatarUrl}
                onClick={openUserPage}
              />
            ) : (
              <UserButton className={bem('UserButton')} onClick={openUserPage} />
            )}
          </Tooltip>

          <Tooltip title="Logout">
            <LogoutButton className={bem('LogoutButton')} onClick={logout} />
          </Tooltip>
        </div>
      ) : null}
    </div>
  )
}
