import React, {
  createContext, useContext, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'

export interface AlertProps {
  children?: React.ReactNode
}

interface AlertContextProps {
  createAlert: ({ ...props } : Props) => Promise<void>
}

const AlertContext = createContext<AlertContextProps>(null)
export const useAlert = () => useContext(AlertContext)

interface Props {
  message: string
  code?: string
}

export default function AlertProvider({ children }: AlertProps) {
  const [props, setProps] = useState<Props>({
    message: null,
  })

  const [active, setActive] = useState(false)
  const [callbacks, setCallbacks] = useState<{close:() => void}>({ close: null })

  const createAlert = ({ message, code } : Props) => {
    setProps({ message, code })
    setActive(true)
    return new Promise<void>((resolve) => {
      const close = () => {
        resolve()
        finish()
      }
      setCallbacks({
        close,
      })
    })
  }

  const finish = () => {
    setCallbacks({
      close: null,
    })
    setProps({
      message: null,
    })
    setActive(false)
  }

  const { message, code } = props
  const { close } = callbacks
  const value = {
    createAlert,
  }
  return (
    <AlertContext.Provider value={value}>
      {children}
      <Modal immediate={active} setImmediate={setActive} off={close}>
        <section className={styles.window}>
          {code && <h4 className={styles.code}>{code.toLocaleUpperCase()}</h4>}
          {message && <p className={styles.message}>{message}</p>}
        </section>
      </Modal>
    </AlertContext.Provider>
  )
}
