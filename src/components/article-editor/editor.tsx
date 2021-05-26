import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react'
import getUuidv4 from 'lib/api/uuid'
import hermes from 'lib/api/hermes'
import { getValue, useForm } from 'providers/form'
import { ArticleData } from 'components/article'
import { useEditorPageQuery } from 'lib/hooks/page-query'
import { useAlert } from 'providers/modal/alert'
import { usePrompt } from 'providers/modal/prompt'
import styles from 'sass/components/article-editor.module.scss'
import ToolBar, { command, CommandState, tools } from './toolbar'

export interface ArticleEditorProps {
  data?: ArticleData
  input?: RequestInfo
  method?: 'POST' | 'PUT'
  backPath?: string
}

export default function Editor({
  data, input, method = 'POST', backPath,
}: ArticleEditorProps) {
  const { category } = useEditorPageQuery()

  const title = useRef<HTMLInputElement>()
  const subtitle = useRef<HTMLInputElement>()
  const content = useRef<HTMLIFrameElement>()
  const [states, setStates] = useState<CommandState[]>(
    tools.map(({ command }) => ({
      command,
      active: false,
    })),
  )

  const { setOptions } = useForm()
  const { createAlert } = useAlert()
  const { createPrompt } = usePrompt()

  const imageUploader = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('id', getUuidv4())
    formData.append('file', file)
    const res = await hermes('/api/images', {
      body: formData,
      method: 'POST',
    })
    if (res.ok) {
      const { url } = await res.json()
      content.current.contentDocument.execCommand('insertImage', false, url)
    } else {
      const { error } = await res.json()
      createAlert({
        message: error,
        code: 'error',
      })
    }
  }

  const onCommand = async (cmd: command, prompt: boolean, message: string) => {
    switch (cmd) {
      case 'formatBlock':
        content.current.contentDocument.execCommand(
          cmd,
          false,
          states.find(({ command }) => command === cmd).active
            ? 'DIV'
            : message,
        )
        break
      default:
        content.current.contentDocument.execCommand(
          cmd,
          false,
          prompt ? (await createPrompt({ message })) : message,
        )
        break
    }
    setStates(
      states.map(({ command, active }) => ({
        command,
        active: command === cmd ? !active : active,
      })),
    )
  }

  useEffect(() => {
    if (!data) {
      return
    }
    title.current.value = data.title
    subtitle.current.value = data.subtitle
    content.current.contentDocument.body.innerHTML = data.content
  }, [data])

  useEffect(() => {
    setOptions({
      input: input || `/api/${category}/`,
      init: () => ({
        body: JSON.stringify({
          doc: data?.doc,
          title: getValue(title),
          subtitle: subtitle.current.value,
          content: content.current.contentDocument.body.innerHTML,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      }),
      backPath: backPath || `/${category}/1`,
      needToValidate: [title],
      containerClassName: styles.container,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
    })
  }, [])

  useEffect(() => {
    const document = content.current.contentDocument
    document.designMode = 'on'
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(iframeCSS))
    document.head.appendChild(link)
    document.head.appendChild(style)
  }, [])

  return (
    <>
      <input className={styles.title} ref={title} placeholder="제목" name="title" autoComplete="off" />
      <input className={styles.subtitle} ref={subtitle} placeholder="부제" autoComplete="off" />
      <hr className={styles.divider} />
      <ToolBar
        imageUploader={imageUploader}
        onCommand={onCommand}
      />
      <iframe className={styles.content} ref={content} title="content" />
    </>
  )
}

const iframeCSS = `
      @font-face {
        font-family: 'Chosun';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing : border-box;
      }
      html {
        font-family: 'Chosun';
        font-size: 14px;
        width : 100%;
        height : 100%;
      }

      body {
        position : relative;
        width : 100%;
        height : 100%;
        color: #faf3f3;
        line-height : 1.5;
        margin: 0; 
        padding: 0; 
        postion : relative;
      }
      body>div:not(.codeBlock) {
        margin-bottom : .25rem;
      }
      h3 {
        font-size: 1.1rem;
        margin-bottom: .5rem;
      }
      ul {
        padding-left: 2rem;
      }
      blockquote {
        padding : 1rem 0rem 1rem 2rem;
      }
      blockquote + blockquote {
        padding : 0rem 0rem 1rem 2rem;
      }
      code {
        font-family : consolas;
      }
      pre {
        font-family : consolas;
        background-color : #0e0e0e;
        padding : 1rem 1.5rem;
      }
      pre + pre {
        padding : 0rem 1.5rem 1rem 1.5rem;
      }
      pre + div {
        margin-top: .5rem;
      }
      pre, blockquote {
        font-size: .9em;
        color : #afaaaa;
        width : 100%;
      }
      img {
        display : block;
        max-width : 100%;
        margin : 0 auto;
      }
  `
