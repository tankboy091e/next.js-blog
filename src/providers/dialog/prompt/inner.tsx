import React, { createContext, useContext, useRef } from 'react'
import styles from 'sass/components/prompt.module.scss'
import Alert, { AlertHeaderProps } from 'components/alert'
import { useDialog } from '..'

interface PromptMessageProps extends AlertHeaderProps {
  type?: InputType
}

interface PromptContextProps {
  createPrompt: ({ ...props }: PromptMessageProps) => Promise<string>
}

const PromptContext = createContext<PromptContextProps>(null)
export const usePrompt = () => useContext(PromptContext)

type InputType = 'text' | 'password'

export default function Inner({ children }: { children?: React.ReactNode }) {
  const { buildDialog } = useDialog()

  const inputRef = useRef<string>()

  const intializeInputRef = () => {
    inputRef.current = null
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value
  }

  const createPrompt = async ({
    type = 'text',
    ...header
  }: PromptMessageProps) => {
    const res = await buildDialog()
      .insert(({ ok, cancle }) => (
        <Alert
          header={header}
          ok={ok}
          cancle={cancle}
          showCancle
        >
          <input
            className={styles.input}
            type={type}
            autoComplete="off"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={onInputChange}
          />
        </Alert>
      ))
      .open()

    const result = inputRef.current

    intializeInputRef()

    if (!res) {
      return null
    }

    if (!result) {
      return null
    }

    return result
  }

  const value = {
    createPrompt,
  }

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  )
}

Inner.defaultProps = {
  children: null,
}
