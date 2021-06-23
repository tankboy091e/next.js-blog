import {
  ChangeEvent, MutableRefObject, useEffect, useRef, useState,
} from 'react'
import getUuidv4 from 'lib/api/uuid'
import hermes from 'lib/api/hermes'
import { getValue, useForm } from 'providers/form'
import { ArticleData } from 'components/article'
import { useEditorPageQuery } from 'lib/hooks/page-query'
import { useAlert } from 'providers/dialog/alert/inner'
import { usePrompt } from 'providers/dialog/prompt/inner'
import styles from 'sass/components/article-editor.module.scss'
import getAuthor from 'lib/util/author'
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
  const footnote = useRef<HTMLIFrameElement>()

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
        title: 'error',
        text: error,
      })
    }
  }

  const onSuperscript = async () => {
    const document = content.current.contentDocument
    const footnoteDocument = footnote.current.contentDocument

    const { length } = footnoteDocument.body.querySelectorAll('li')
    if (length === 0) {
      const ol = footnoteDocument.createElement('ol')
      footnoteDocument.body.appendChild(ol)
    }
    const li = footnoteDocument.createElement('li')

    const book = await createPrompt({
      title: '검색',
      text: '책의 이름을 입력하세요',
    })

    if (book) {
      const res = await hermes(`/api/books/search?value=${book}&from=library`)
      if (res.ok) {
        const {
          author: authorquery, title, publisher, pubDate,
        } = await res.json()
        const page = await createPrompt({
          title,
          text: '페이지 수를 입력하세요',
        })
        const { author, translator, editor } = getAuthor(authorquery)
        const [date] = pubDate.split('-')
        li.innerHTML = `<a href="javascript:void(0)">[${length + 1}]</a> ${author}, <cite>『${title}』</cite>,${translator ? ` ${translator} 옮김,` : ''}${editor ? ` ${editor} 엮음,` : ''} ${publisher}, ${date}, ${page}쪽`
      } else {
        const { error } = await res.json()
        await createAlert({
          title: 'error',
          text: error,
        })
      }
    }

    footnoteDocument.querySelector('ol').appendChild(li)
    document.execCommand(
      'insertHTML',
      false,
      `<sup>${length + 1}</sup>`,
    )
    document.execCommand(
      'superscript',
      false,
      null,
    )
  }

  const onHyperlink = async () => {
    const document = content.current.contentDocument
    const href = await createPrompt({
      text: '링크를 입력하세요',
    })
    const label = await createPrompt({
      text: '내용을 입력하세요',
    })
    if (!label) {
      document.execCommand(
        'createLink',
        false,
        href,
      )
      return
    }
    document.execCommand(
      'insertHTML',
      false,
      `<a href="${href}" target="_blank">${label}</a>`,
    )
  }

  const onCommand = async (cmd: command, prompt: boolean, message: string) => {
    const document = content.current.contentDocument
    switch (cmd) {
      case 'createLink':
        onHyperlink()
        break
      case 'superscript':
        onSuperscript()
        break
      case 'formatBlock':
        document.execCommand(
          cmd,
          false,
          states.find(({ command }) => command === cmd).active
            ? 'DIV'
            : message,
        )
        break
      default:
        document.execCommand(
          cmd,
          false,
          prompt ? (await createPrompt({ text: message })) : message,
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

  const initializeIframe = (ref : MutableRefObject<HTMLIFrameElement>, css: string) => {
    const document = ref.current.contentDocument
    document.designMode = 'on'
    ref.current.focus()
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
  }

  const initializeFootnote = async () => {
    initializeIframe(footnote, footNoteStyle)
  }

  useEffect(() => {
    if (!data) {
      return
    }
    title.current.value = data.title
    subtitle.current.value = data.subtitle
    content.current.contentDocument.body.innerHTML = data.content
    footnote.current.contentDocument.body.innerHTML = data.footnote
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
          footnote: footnote.current.contentDocument.body.innerHTML,
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
    initializeFootnote()
    initializeIframe(content, contentStyle)
  }, [])

  return (
    <>
      <input className={styles.title} ref={title} placeholder="제목" name="title" autoComplete="off" />
      <input className={styles.subtitle} ref={subtitle} placeholder="부제" autoComplete="off" />
      <ToolBar
        imageUploader={imageUploader}
        onCommand={onCommand}
      />
      <iframe className={styles.content} ref={content} title="content" />
      <iframe className={styles.footnote} ref={footnote} title="footnote" />
    </>
  )
}

const commonStyle = `
  * {
    margin: 0;
    padding: 0;
    box-sizing : border-box;
  }

  ol, ul {
    list-style: none;
  }

  html {
    font-family: '바탕', sans-serif;
    font-size: 16px;
    width : 100%;
    height : 100%;
  }

  body {
    position : relative;
    width : 100%;
    height : 100%;
    color: #faf3f3;
    line-height : 1.5;
  }
`

const footNoteStyle = `
  ${commonStyle}
  cite {
    font-style: normal;
  }
`

const contentStyle = `
  ${commonStyle}
  body>div:not(.codeBlock) {
    margin-bottom : .25rem;
  }
  h3 {
    font-size: 1.1rem;
    margin-bottom: .5rem;
  }
  blockquote {
    padding : 1rem;
  }
  blockquote + blockquote {
    padding : 0rem 1rem 1rem 1rem;
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
  a {
    color: #c3688a;
  }
  img {
    display : block;
    max-width : 100%;
    margin : 0 auto;
  }
`
