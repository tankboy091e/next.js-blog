import React, {
  createContext, useContext, useRef, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'

export interface PromptProps {
  children?: React.ReactNode
}

interface PromptContextProps {
  createPrompt: ({ ...props } : Props) => Promise<string>
}

const PromptContext = createContext<PromptContextProps>(null)
export const usePrompt = () => useContext(PromptContext)

interface Props {
  message: string
  code?: string
  type?: inputType
}

interface CallbackProps {
  ok: (e: React.FormEvent) => void
  cancle: () => void
}

type inputType = 'text' | 'password'

export default function PromptProvider({ children }: PromptProps) {
  const [props, setProps] = useState<Props>({
    message: null,
  })
  const [callbacks, setCallbacks] = useState<CallbackProps>({
    ok: null,
    cancle: null,
  })

  const [active, setActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>()

  const createPrompt = ({ message, code, type } : Props) => {
    setProps({ message, code, type })
    setActive(true)
    return new Promise<string>((resolve) => {
      const ok = (e : React.FormEvent) => {
        e.preventDefault()
        resolve(inputRef.current.value)
        finish()
      }
      const cancle = () => {
        resolve(null)
        finish()
      }
      setCallbacks({
        ok,
        cancle,
      })
    })
  }

  const finish = () => {
    setCallbacks({
      ok: null,
      cancle: null,
    })
    setProps({
      message: null,
    })
    setActive(false)
  }

  const { message, code, type } = props
  const { ok, cancle } = callbacks

  const value = {
    createPrompt,
  }

  return (
    <PromptContext.Provider value={value}>
      {children}
      <Modal immediate={active} setImmediate={setActive} off={cancle}>
        <form className={styles.window} onSubmit={ok}>
          {code && <h4 className={styles.code}>{code}</h4>}
          {message && <p className={styles.message}>{message}</p>}
          <input className={styles.input} type={type} ref={inputRef} autoComplete="off" />
          <div className={styles.menu}>
            <button type="submit">
              확인
            </button>
          </div>
        </form>
      </Modal>
    </PromptContext.Provider>
  )
}
