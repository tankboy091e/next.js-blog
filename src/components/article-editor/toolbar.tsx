import React, { ChangeEvent } from 'react'
import {
  BsJustifyLeft,
  BsJustify,
  BsJustifyRight,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsListOl,
  BsListUl,
  BsImage,
  BsLink,
  BsCode,
} from 'react-icons/bs'
import {
  BiHeading,
} from 'react-icons/bi'
import {
  ImQuotesLeft,
} from 'react-icons/im'
import styles from 'sass/components/article-editor.module.scss'

export type command =
  | 'justifyLeft'
  | 'justifyFull'
  | 'justifyRight'
  | 'bold'
  | 'italic'
  | 'heading'
  | 'formatBlock'
  | 'insertOrderedList'
  | 'insertUnorderedList'
  | 'underline'
  | 'createLink'
  | 'insertImage'
  | 'showCode'

export interface CommandState {
    command: command
    active: boolean
  }

export default function ToolBar({
  imageUploader,
  onCommand,
}: {
  imageUploader : (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  onCommand : (cmd: command, prompt: boolean, message: string) => Promise<void>
}) {
  return (
    <div className={styles.toolbar}>
      {tools.map(({
        command,
        message,
        prompt,
        icon,
      }) => {
        if (command === 'insertImage') {
          return (
            <label key="insertImage" className={styles.imagePickerLabel} htmlFor="imagePicker">
              {icon}
              <input
                key={command}
                className={styles.imagePicker}
                type="file"
                id="imagePicker"
                accept="image/*"
                onChange={(e) => imageUploader(e)}
                style={{
                  width: iconSize,
                  height: iconSize,
                }}
              />
            </label>
          )
        }
        return (
          <button
            key={`${command}${message}`}
            className={styles.tool}
            type="button"
            onClick={(e) => {
              onCommand(command, prompt, message)
            }}
          >
            {icon}
          </button>
        )
      })}
    </div>
  )
}

const iconSize = 24

export const tools: {
  command: command
  icon: JSX.Element
  prompt: boolean,
  message: string
}[] = [
  {
    command: 'formatBlock',
    icon: <BiHeading size={iconSize} />,
    prompt: false,
    message: 'H3',
  },
  {
    command: 'bold',
    icon: <BsTypeBold size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'italic',
    icon: <BsTypeItalic size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'underline',
    icon: <BsTypeUnderline size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'justifyLeft',
    icon: <BsJustifyLeft size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'justifyFull',
    icon: <BsJustify size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'justifyRight',
    icon: <BsJustifyRight size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'insertOrderedList',
    icon: <BsListOl size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'insertUnorderedList',
    icon: <BsListUl size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'formatBlock',
    icon: <ImQuotesLeft size={iconSize} />,
    prompt: false,
    message: 'BLOCKQUOTE',
  },
  {
    command: 'formatBlock',
    icon: <BsCode size={iconSize} />,
    prompt: false,
    message: 'PRE',
  },
  {
    command: 'insertImage',
    icon: <BsImage size={iconSize} />,
    prompt: false,
    message: null,
  },
  {
    command: 'createLink',
    icon: <BsLink size={iconSize} />,
    prompt: true,
    message: 'Enter Link here',
  },
]
