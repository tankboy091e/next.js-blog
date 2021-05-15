import React, {
  createContext, useContext, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'

export interface ConfirmProps {
  children?: React.ReactNode
}

interface ConfirmContextProps {
  createConfirm: ({ ...props } : Props) => Promise<boolean>
}

const PromptContext = createContext<ConfirmContextProps>(null)
export const useConfirm = () => useContext(PromptContext)

interface Props {
  message: string
  code?: string
}

interface CallbackProps {
  ok: (e: React.FormEvent) => void
  cancle: () => void
}

export default function ConfirmProvider({ children }: ConfirmProps) {
  const [props, setProps] = useState<Props>({
    message: null,
  })
  const [callbacks, setCallbacks] = useState<CallbackProps>({
    ok: null,
    cancle: null,
  })

  const [active, setActive] = useState(false)

  const createConfirm = ({ message, code } : Props) => {
    setProps({ message, code })
    setActive(true)
    return new Promise<boolean>((resolve) => {
      const ok = (e : React.FormEvent) => {
        e.preventDefault()
        resolve(true)
        finish()
      }
      const cancle = () => {
        resolve(false)
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

  const { message, code } = props
  const { ok, cancle } = callbacks

  const value = {
    createConfirm,
  }

  return (
    <PromptContext.Provider value={value}>
      {children}
      <Modal immediate={active} setImmediate={setActive} off={cancle}>
        <form className={styles.window} onSubmit={ok}>
          {code && <h4 className={styles.code}>{code}</h4>}
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.menu}>
            <button type="submit">
              확인
            </button>
            <button type="button" onClick={() => cancle()}>
              취소
            </button>
          </div>
        </form>
      </Modal>
    </PromptContext.Provider>
  )
}
