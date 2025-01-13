import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography } from '@mui/material'
import { cn } from '@bem-react/classname'

import { loginProcessSelector } from 'state/user/user.selector'
import { AppDispatch } from 'state/store'
import { loginUser } from 'state/user/user.thunks'
import BaseContainer from 'components/perka/Board'

import './styles.scss'

export default function LoginPage() {
  const bem = cn('Login')
  const dispatch = useDispatch<AppDispatch>()
  const loginLoader = useSelector(loginProcessSelector)

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')

  const loginHandler = () => {
    const credentials = {
      login,
      password,
    }

    dispatch(loginUser(credentials))
  }

  return (
    <div className={bem()}>
      <BaseContainer>
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
        />

        <Button
          onClick={loginHandler}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          disabled={loginLoader}
        >
          Login
        </Button>
      </BaseContainer>
    </div>
  )
}
