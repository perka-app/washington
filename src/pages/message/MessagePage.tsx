// #region Imports
// eslint-disable max-lines
/* prettier-ignore */ import { Box, Button, IconButton, Input, Modal, Paper, Stack, Switch, Tooltip, Typography } from '@mui/material'
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Editor } from '@tinymce/tinymce-react'
import { Close } from '@mui/icons-material'
import { cn } from '@bem-react/classname'

import { DebugInfo } from 'shared/components'
import { AppDispatch } from 'state/store'
import { messageActions } from 'state/message/message.slice'
import {
  messageSuccessSelector,
  sendingMessageProcessSelector,
} from 'state/message/message.selectors'

import './MessagePage.scss'
// eslint-enable max-lines
// #endregion
export const MessagePage: React.FC = () => {
  const bem = cn('MessagePage')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const editorRef = useRef<any>(null)
  const processing = useSelector(sendingMessageProcessSelector)
  const success = useSelector(messageSuccessSelector)

  const [modalChecked, setModalChecked] = useState(false)
  const [renderCount, setRenderCount] = useState<number>(0)
  const [modalShown, setModalShown] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')

  // #region Handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(event.target.value)
  }

  const handleShowModal = (): void => {
    setModalShown(true)
  }

  const handleHideModal = (): void => {
    dispatch(messageActions.reset())
    setModalShown(false)
    setErrorMessage(null)
    setSuccessMessage(null)
  }

  const handleModalChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModalChecked(event.target.checked)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  const handleSaveMessage = (): void => {
    if (!message || !title) {
      setErrorMessage('Message and title are required')
      return
    }

    if (modalChecked) {
      dispatch(messageActions.sendMessage({ title, message }))
      return
    }

    dispatch(messageActions.sendTestMessage({ title, message, email }))
  }

  const handleEditorChange = (content: string): void => {
    setMessage(content)

    if (editorRef.current) {
      // console.log(editorRef.current ? editorRef.current.getContent() : '')
    }
  }
  // #endregion
  // #region Hooks
  useEffect(() => {
    if (processing.error) {
      setErrorMessage(processing.error)
    } else {
      setErrorMessage(null)
    }
  }, [processing.error])

  useEffect(() => {
    if (success) {
      const time = formatTimestamp(success.sentAt)
      setSuccessMessage(
        `Message sent to ${success.reciversCount} subscriber(s) at ${time}`,
      )
    } else {
      setSuccessMessage(null)
    }
  }, [success])

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1)
  }, [])
  // #endregion
  // #region Utils
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }
  // #endregion
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

      <Stack direction="row" className={bem('TitleRow')}>
        <Input
          className={bem('Title')}
          placeholder="Message title"
          value={title}
          onChange={handleTitleChange}
        />

        <Button
          className={bem('NextButton')}
          variant="contained"
          disabled={!message || !title || modalShown}
          onClick={handleShowModal}
        >
          Next
        </Button>
      </Stack>

      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        // eslint-disable-next-line immutable/no-mutation
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onEditorChange={handleEditorChange}
      />

      <DebugInfo info={`rendered ${renderCount} times`} />

      <Modal open={modalShown}>
        <Box className={bem('Modal')}>
          <IconButton className={bem('ModalClose')} onClick={handleHideModal}>
            <Close />
          </IconButton>

          <Paper className={bem('ModalPreview')}>
            <Typography variant="h6">{title}</Typography>
            <div dangerouslySetInnerHTML={{ __html: message || '' }} />
          </Paper>

          <div className={bem('ModalContent')}>
            <Stack direction="row" className={bem('ModalSwitch')}>
              <Tooltip title="Send test message to specified email">
                <Typography>Test</Typography>
              </Tooltip>

              <Switch
                checked={modalChecked}
                onChange={handleModalChecked}
                inputProps={{ 'aria-label': 'controlled' }}
              />

              <Typography>Send to subscribers</Typography>
            </Stack>

            <Input
              className={bem('ModalEmailInput')}
              placeholder="Email for test message"
              disabled={modalChecked}
              value={email}
              onChange={handleEmailChange}
            />

            <Button
              className={bem('ModalSubmit')}
              variant="contained"
              loading={processing.pending}
              disabled={processing.pending || !emailValid}
              onClick={handleSaveMessage}
            >
              Send
            </Button>
          </div>

          {errorMessage && <div className={bem('ModalError')}>Error: {errorMessage}</div>}
          {successMessage && <div className={bem('ModalSuccess')}>{successMessage}</div>}
        </Box>
      </Modal>
    </div>
  )
}
