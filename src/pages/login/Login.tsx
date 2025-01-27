import React from 'react'
import { cn } from '@bem-react/classname'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography } from '@mui/material'

import { loginProcessSelector } from 'state/user/user.selector'
import { AppDispatch } from 'state/store'
import { loginUser } from 'state/user/user.thunks'

import { Board } from 'components/board'

import './Login.scss'

export const Login: React.FC = () => {
  const bem = cn('Login')
  const dispatch = useDispatch<AppDispatch>()
  const loginProcess = useSelector(loginProcessSelector)

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      loginHandler()
    }
  }

  const loginHandler = () => {
    dispatch(loginUser({ login, password }))
  }

  return (
    <div className={bem()}>
      <Board>
        <Typography variant="h4" className={bem('Title')}>
          PERKA DASHBOARD
        </Typography>

        <Typography variant="h6" className={bem('Slogan')}>
          Manage your community here!
        </Typography>

        <TextField
          id="login"
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          onClick={loginHandler}
          variant="contained"
          color="primary"
          fullWidth
          style={{ margin: '1rem auto' }}
          disabled={loginProcess.pending}
        >
          Login
        </Button>

        {!loginProcess.pending && loginProcess.error && (
          <Typography variant="h6" className={bem('Error')}>
            {loginProcess.error}
          </Typography>
        )}
      </Board>
    </div>
  )
}
