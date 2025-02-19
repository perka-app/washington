import { useNavigate } from 'react-router'
import { Button } from '@mui/material'
import { cn } from '@bem-react/classname'
import React from 'react'

export const MessagePage: React.FC = () => {
  const bem = cn('User')

  const navigate = useNavigate()

  return (
    <div className={bem()}>
      <Button
        className={bem('GoToDashboard')}
        onClick={() => navigate('/dashboard')}
        color="primary"
        style={{ margin: '1rem auto' }}
        variant="contained"
        size="small"
      >
        {'<'} Dashboard
      </Button>
    </div>
  )
}
