import React, {
  createContext, MutableRefObject, useContext, useEffect, useRef, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'
import getPascalCase from 'lib/util/uppercase'

interface DialogProps<T> {
  children?: React.ReactNode
  dialogs: React.ReactElement<T>
}

interface AlertContextProps<T extends DialogMessageProps> {
  requests: MutableRefObject<(T & DialogCallbackProps)[]>
  createDialog: (props : T) => Promise<void>
}

const AlertContext = createContext<AlertContextProps<DialogMessageProps>>(null)
export const useAlert = () => useContext(AlertContext)

export interface DialogMessageProps {
  message: string
  code?: string
}

interface DialogCallbackProps {
  close: () => void
}

export default function DialogProvider<T extends DialogMessageProps>({
  children,
  dialogs,
}: DialogProps<T>) {
  const [requests, setRequests] = useState<(T & DialogCallbackProps)[]>([])

  const createDialog = (props : T) => new Promise<void>((resolve) => {
    const request = {
      ...props,
      close: () => {
        resolve()
        setRequests((requests) => requests.filter((value) => value !== request))
      },
    }
    setRequests((requests) => requests.concat(request))
  })

  const requestsRef = useRef(requests)

  const value = {
    requests: requestsRef,
    createDialog,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      {dialogs}
    </AlertContext.Provider>
  )
}

export function Dialog<T extends DialogMessageProps>({
  children,
  request,
}: {
  children: React.ReactNode,
  request: T & DialogCallbackProps
}) {
  const [active, setActive] = useState(true)
  const { code, message, close } = request

  useEffect(() => {
    if (active) {
      return
    }
    close()
  }, [active])

  return (
    <Modal
      key={message}
      immediate={active}
      setImmediate={setActive}
      callback={() => setActive(false)}
    >
      <section className={styles.window}>
        <h4 className={styles.code}>{getPascalCase(code || '안내')}</h4>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.menu}>
          {children}
          <button type="button" onClick={() => setActive(false)}>
            취소
          </button>
        </div>
      </section>
    </Modal>
  )
}
