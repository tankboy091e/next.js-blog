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
import styles from 'sass/components/article-editor.module.scss'

export type command =
  | 'justifyLeft'
  | 'justifyFull'
  | 'justifyRight'
  | 'bold'
  | 'italic'
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
  onCommand : (cmd: command, index: number, message: string) => Promise<void>
}) {
  return (
    <div className={styles.toolbar}>
      {tools.map((value, index) => {
        const { command: cmd, message, icon } = value
        if (cmd === 'insertImage') {
          return (
            <label key={cmd} className={styles.imagePickerLabel} htmlFor="imagePicker">
              {icon}
              <input
                key={cmd}
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
            key={cmd}
            className={styles.tool}
            type="button"
            onClick={(e) => {
              onCommand(cmd, index, message)
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
  message: string
}[] = [
  {
    command: 'justifyLeft',
    icon: <BsJustifyLeft size={iconSize} />,
    message: null,
  },
  {
    command: 'justifyFull',
    icon: <BsJustify size={iconSize} />,
    message: null,
  },
  {
    command: 'justifyRight',
    icon: <BsJustifyRight size={iconSize} />,
    message: null,
  },
  {
    command: 'bold',
    icon: <BsTypeBold size={iconSize} />,
    message: null,
  },
  {
    command: 'italic',
    icon: <BsTypeItalic size={iconSize} />,
    message: null,
  },
  {
    command: 'underline',
    icon: <BsTypeUnderline size={iconSize} />,
    message: null,
  },
  {
    command: 'insertOrderedList',
    icon: <BsListOl size={iconSize} />,
    message: null,
  },
  {
    command: 'insertUnorderedList',
    icon: <BsListUl size={iconSize} />,
    message: null,
  },
  {
    command: 'showCode',
    icon: <BsCode size={iconSize} />,
    message: null,
  },
  {
    command: 'insertImage',
    icon: <BsImage size={iconSize} />,
    message: 'Enter Link here',
  },
  {
    command: 'createLink',
    icon: <BsLink size={iconSize} />,
    message: 'Enter Link here',
  },
]
