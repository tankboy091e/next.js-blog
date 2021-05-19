import React, {
  createContext, useContext, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import Modal from 'providers/modal/modal'
import getPascalCase from 'lib/util/uppercase'

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
  const [callbacks, setCallbacks] = useState<{cancle:() => void}>({ cancle: null })

  const createAlert = ({ message, code } : Props) => {
    setProps({ message, code })
    setActive(true)
    return new Promise<void>((resolve) => {
      const cancle = () => {
        resolve()
        finish()
      }
      setCallbacks({
        cancle,
      })
    })
  }

  const finish = () => {
    setCallbacks({
      cancle: null,
    })
    setProps({
      message: null,
    })
    setActive(false)
  }

  const { message, code } = props
  const { cancle } = callbacks
  const value = {
    createAlert,
  }
  return (
    <AlertContext.Provider value={value}>
      {children}
      <Modal immediate={active} setImmediate={setActive} off={cancle}>
        <section className={styles.window}>
          <h4 className={styles.code}>{getPascalCase(code || '안내')}</h4>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.menu}>
            <button type="button" onClick={() => cancle()}>
              취소
            </button>
          </div>
        </section>
      </Modal>
    </AlertContext.Provider>
  )
}
