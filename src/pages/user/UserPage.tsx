import { CloudUpload, Edit, Close } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { cn } from '@bem-react/classname'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  Tooltip,
  Typography,
  TextareaAutosize,
} from '@mui/material'

import {
  saveUserData,
  uploadImage,
  uploadingImageProcessSelector,
  uploadingUserDataProcessSelector,
  userSelector,
} from 'state/user'
import { User } from 'models/UserModel'
import { AppDispatch } from 'state/store'
import { HiddenInput } from 'components/HidenInput'
import { ReactComponent as UserImage } from 'assets/buttons/user.svg'

import './UserPage.scss'

export const UserPage: React.FC = () => {
  const bem = cn('User')
  const user = useSelector(userSelector)
  const saving = useSelector(uploadingUserDataProcessSelector)
  const uploading = useSelector(uploadingImageProcessSelector)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [openDesc, setOpenDesc] = useState(false)
  const [openEmail, setOpenEmail] = useState(false)
  const [description, setDescription] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [descriptionError, setDescriptionError] = useState('')
  const [isDescriptionValid, setIsDescriptionValid] = useState(false)

  const handleOpenDesc = () => {
    setDescription(user?.description || '')
    setOpenDesc(true)
  }
  const handleCloseDesc = () => setOpenDesc(false)
  const handleCloseEmail = () => setOpenEmail(false)
  // const handleOpenEmail = () => setOpenEmail(true)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setDescription(value)
    if (value.length > 150) {
      setDescriptionError('Description must be less than 150 characters long.')
      setIsDescriptionValid(false)
    } else if (!/^[a-zA-Z0-9\s.,!?'"-]*$/.test(value)) {
      setDescriptionError('Description contains invalid characters.')
      setIsDescriptionValid(false)
    } else {
      setDescriptionError('')
      setIsDescriptionValid(true)
    }
  }

  const handleSaveEmail = () => dispatch(saveUserData({ ...user, email } as User))
  const handleSaveDesc = () => dispatch(saveUserData({ ...user, description } as User))
  const handleUpload = (image?: File) => {
    if (!image) {
      alert('Please select an image first!')
      return
    }

    dispatch(uploadImage(image))
  }

  useEffect(() => {
    setOpenEmail(false)
    setOpenDesc(false)
  }, [user])

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

      <div className={bem('Avatar')}>
        {user?.avatarUrl ? (
          <Avatar alt="avatar" className={bem('AvatarImage')} src={user.avatarUrl}>
            {user.name[0]}
          </Avatar>
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
        >
          Upload avatar image
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
        <div className={bem('Label')}>Login:</div>
        <div className={bem('Value')}>{user?.login}</div>
        <div>Organisation:</div>
        <div>{user?.name}</div>
        <div>Email:</div>
        <div className={bem('Value')}>
          <div className={bem('Text')}>{user?.email}</div>
          {/* <Tooltip title="Edit email">
            <IconButton
              className={bem('IconButton')}
              onClick={handleOpenEmail}
            >
              <Edit />
            </IconButton>
          </Tooltip> */}
        </div>
        <div>Description:</div>
        <div className={bem('Value')}>
          <div className={bem('Text')}>{user?.description}</div>
          <Tooltip title="Edit description">
            <IconButton className={bem('IconButton')} onClick={handleOpenDesc}>
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Modal
        open={openEmail}
        onClose={handleCloseEmail}
        aria-labelledby="email-modal-title"
        aria-describedby="email-modal-desc"
      >
        <Box className={bem('Modal')}>
          <IconButton className={bem('ModalClose')} onClick={handleCloseEmail}>
            <Close />
          </IconButton>
          <Typography id="email-modal-title" variant="h6" sx={{ mb: 2 }}>
            Change your email
          </Typography>
          <Typography id="email-modal-desc" variant="h6" className={bem('ModalContent')}>
            <Input placeholder="Email" value={email} onChange={handleEmailChange} />
            <Button
              loading={saving.pending}
              loadingPosition="start"
              variant="contained"
              disabled={!isEmailValid}
              onClick={handleSaveEmail}
            >
              Save
            </Button>
            {saving.error && (
              <Typography className={bem('ModalError')}>{saving.error}</Typography>
            )}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openDesc}
        onClose={handleCloseDesc}
        aria-labelledby="desc-modal-title"
        aria-describedby="desc-modal-desc"
      >
        <Box className={bem('Modal')}>
          <IconButton className={bem('ModalClose')} onClick={handleCloseDesc}>
            <Close />
          </IconButton>
          <Typography id="desc-modal-title" variant="h6" sx={{ mb: 2 }}>
            Enter text describing yourself
          </Typography>
          <Typography id="desc-modal-desc" variant="h6" className={bem('ModalContent')}>
            <TextareaAutosize
              className={bem('ModalTextarea')}
              minRows={5}
              maxRows={15}
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <Button
              loading={saving.pending}
              loadingPosition="start"
              variant="contained"
              disabled={!isDescriptionValid}
              onClick={handleSaveDesc}
            >
              Save
            </Button>
            {descriptionError && (
              <Typography className={bem('ModalError')}>{descriptionError}</Typography>
            )}
            {saving.error && (
              <Typography className={bem('ModalError')}>{saving.error}</Typography>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
