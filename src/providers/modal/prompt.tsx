import Dialog from 'components/dialog'
import React, {
  createContext, useContext, useRef, useState,
} from 'react'
import styles from 'sass/components/dialog.module.scss'
import DialogProvider, {
  useDialog, DialogMessageProps,
} from './dialog'

interface PromptContextProps {
  createPrompt: ({ ...props }: PromptMessageProps) => Promise<string>
}

const PromptContext = createContext<PromptContextProps>(null)
export const usePrompt = () => useContext(PromptContext)

type InputType = 'text' | 'password'

interface PromptMessageProps extends DialogMessageProps {
  inputType?: InputType
}

export default function PromptProvider({ children }: {
  children?: React.ReactNode
}) {
  return (
    <DialogProvider>
      <Inner>
        {children}
      </Inner>
    </DialogProvider>
  )
}

function Inner({ children }: {
  children?: React.ReactNode
}) {
  const { requests, createRefDialog } = useDialog()
  const [inputType, setInputType] = useState<InputType>('text')
  const inputRef = useRef<HTMLInputElement>()

  const createPrompt = async ({ inputType = 'text', ...props }: PromptMessageProps) => {
    setInputType(inputType)
    return (await createRefDialog<HTMLInputElement>(props, inputRef)).value
  }

  const value = {
    createPrompt,
  }

  return (
    <PromptContext.Provider value={value}>
      {children}
      {requests.map((request) => (
        <Dialog
          key={request.message}
          request={request}
          showOk
        >
          <input
            className={styles.input}
            type={inputType}
            ref={inputRef}
            autoComplete="off"
          />
        </Dialog>
      ))}
    </PromptContext.Provider>
  )
}
