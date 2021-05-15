import React, {
  createContext, useContext, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'

export interface AlertProps {
  children?: React.ReactNode
}

interface AlertContextProps {
  createAlert: ({ ...props } : Props) => void
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

  const createAlert = ({ message, code } : Props) => {
    setProps({ message, code })
    setActive(true)
  }

  const { message, code } = props

  const value = {
    createAlert,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Modal immediate={active} setImmediate={setActive}>
        <section className={styles.window}>
          {code && <h4 className={styles.code}>{code.toLocaleUpperCase()}</h4>}
          {message && <p className={styles.message}>{message}</p>}
        </section>
      </Modal>
    </AlertContext.Provider>
  )
}
