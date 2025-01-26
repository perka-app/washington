import { Avatar, Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { CloudUpload } from '@mui/icons-material'
import { cn } from '@bem-react/classname'

import { AppDispatch } from 'state/store'
import { HiddenInput } from 'components/HidenInput'
import { ReactComponent as UserImage } from 'assets/buttons/user.svg'
import { uploadImage, uploadingImageProcessSelector, userSelector } from 'state/user'

import './User.scss'

export const User: React.FC = () => {
  const bem = cn('User')
  const user = useSelector(userSelector)
  const uploading = useSelector(uploadingImageProcessSelector)
  const dispatch = useDispatch<AppDispatch>()

  const handleUpload = (image?: File) => {
    if (!image) {
      alert('Please select an image first!')
      return
    }

    dispatch(uploadImage(image))
  }

  return (
    <div className={bem()}>
      <div className={bem('Avatar')}>
        {user?.avatarUrl ? (
          <Avatar alt="avatar" className={bem('AvatarImage')} src={user.avatarUrl} />
        ) : (
          <UserImage className={bem('Image')} />
        )}

        <Button
          color="primary"
          component="label"
          loading={uploading.pending}
          loadingPosition="start"
          startIcon={<CloudUpload />}
          variant="contained"
          role={undefined}
          fullWidth
        >
          Upload image
          <HiddenInput
            type="file"
            onChange={(event) => handleUpload(event.target.files?.[0])}
            multiple
          />
        </Button>
      </div>

      {!uploading.pending && uploading.error && (
        <Typography variant="h6" className={bem('Error')}>
          {uploading.error}
        </Typography>
      )}

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
