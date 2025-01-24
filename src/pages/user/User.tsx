import React from 'react'
import { cn } from '@bem-react/classname'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as UserImage } from 'assets/buttons/user.svg'
import { userSelector } from 'state/user'

import './User.scss'

export const User: React.FC = () => {
  const bem = cn('User')
  const user = useSelector(userSelector)

  const loadImageHandler = () => {
    console.log('Loading image...')
    // Implement image loading (Open file load dialog):
    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  }

  return (
    <div className={bem()}>
      <div className={bem('Avatar')}>
        <UserImage className={bem('Image')} />

        <Button
          startIcon={<EditIcon />}
          onClick={loadImageHandler}
          variant="contained"
          color="primary"
          fullWidth
        >
          Edit user image
        </Button>
      </div>

      <div className={bem('Info')}>
        <div>Login:</div>
        <div>{user?.login}</div>
        <div>Organisation:</div>
        <div>{user?.name}</div>
        <div>Email:</div>
        <div>{user?.email}</div>
        <div>Description:</div>
        <div>{user?.description}</div>
      </div>
    </div>
  )
}
