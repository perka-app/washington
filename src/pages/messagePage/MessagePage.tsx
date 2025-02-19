import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@mui/material'
import { cn } from '@bem-react/classname'

export const MessagePage: React.FC = () => {
  const bem = cn('MesagePage')
  const editorRef = useRef<any>(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current ? editorRef.current.getContent() : '')
    }
  }
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

      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        // eslint-disable-next-line immutable/no-mutation
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      />

      <button onClick={log}>Log editor content</button>
    </div>
  )
}
