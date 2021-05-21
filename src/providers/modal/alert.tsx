import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'
import getPascalCase from 'lib/util/uppercase'

export interface AlertProps {
  children?: React.ReactNode
}

interface AlertContextProps {
  createAlert: ({ ...props }: Props) => Promise<void>
}

const AlertContext = createContext<AlertContextProps>(null)
export const useAlert = () => useContext(AlertContext)

interface Props {
  message: string
  code?: string
}

interface AlertRequest {
  prop: Props
  callback: () => void
}

export default function AlertProvider({ children }: AlertProps) {
  const [requests, setRequests] = useState<AlertRequest[]>([])

  const createAlert = ({ message, code }: Props) => new Promise<void>((resolve) => {
    const request = {
      prop: { message, code },
      callback: () => {
        resolve()
        setRequests((requests) => requests.filter((value) => value !== request))
      },
    }
    setRequests((requests) => requests.concat(request))
  })

  const value = {
    createAlert,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      {requests.map((request) => (
        <Alert
          key={request.prop.message}
          request={request}
        />
      ))}
    </AlertContext.Provider>
  )
}

function Alert({ request }: { request: AlertRequest }) {
  const [active, setActive] = useState(true)
  const { prop, callback } = request
  const { code, message } = prop

  const close = () => {
    setActive(false)
  }

  useEffect(() => {
    if (active) {
      return
    }
    callback()
  }, [active])

  return (
    <Modal key={message} immediate={active} setImmediate={setActive} callback={close}>
      <section className={styles.window}>
        <h4 className={styles.code}>{getPascalCase(code || '안내')}</h4>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.menu}>
          <button type="button" onClick={close}>
            취소
          </button>
        </div>
      </section>
    </Modal>
  )
}
