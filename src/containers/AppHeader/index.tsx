import React from 'react'
import { cn } from '@bem-react/classname'
import LogoutIcon from '@mui/icons-material/Logout'
import { Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser, restoreUser, userSelector } from 'state/user'
import { AppDispatch } from 'state/store'

import './styles.scss'

export const AppHeader: React.FC = () => {
  const bem = cn('AppHeader')
  const user = useSelector(userSelector)
  const dispatch = useDispatch<AppDispatch>()

  const logout = () => {
    dispatch(logoutUser())
  }

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
          <Typography variant="h6">{user.name}</Typography>

          <Button
            variant="outlined"
            onClick={logout}
            startIcon={<LogoutIcon />}
            className={bem('LogoutButton')}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  )
}
