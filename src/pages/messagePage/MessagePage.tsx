import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input } from '@mui/material'
import { useNavigate } from 'react-router'
import { Editor } from '@tinymce/tinymce-react'
import { cn } from '@bem-react/classname'

import { DebugInfo } from 'shared/components'
import { AppDispatch } from 'state/store'
import { messageActions } from 'state/message/message.slice'
import { sendingMessageProcessSelector } from 'state/message/message.selectors'

import './MessagePage.scss'

export const MessagePage: React.FC = () => {
  const bem = cn('MessagePage')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const editorRef = useRef<any>(null)
  const processing = useSelector(sendingMessageProcessSelector)

  const [renderCount, setRenderCount] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')

  // #region Handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value)
  }

  const handleSaveMessage = () => {
    if (!!message && !!title) {
      dispatch(messageActions.sendMessage({ title, message }))
    }
  }

  const handleEditorChange = (content: string) => {
    setMessage(content)
    if (editorRef.current) {
      // console.log(editorRef.current ? editorRef.current.getContent() : '')
    }
  }
  // #endregion
  // #region Hooks
  // Show error alert if processing.error is not null
  useEffect(() => {
    if (processing.error) {
      setError(processing.error)
    }
  }, [processing.error])

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1)
  }, [])
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

      <div className={bem('TitleRow')}>
        <Input
          className={bem('Title')}
          placeholder="Message title"
          value={title}
          onChange={handleTitleChange}
        />

        <Button
          className={bem('Submit')}
          loading={processing.pending}
          loadingPosition="start"
          variant="contained"
          disabled={!message || !title || processing.pending}
          onClick={handleSaveMessage}
        >
          Save
        </Button>
      </div>

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

      {error && <div className={bem('Error')}>Error: {error}</div>}
      <DebugInfo info={`rendered ${renderCount} times`} />
    </div>
  )
}
