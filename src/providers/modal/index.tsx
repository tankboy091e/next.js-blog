import AlertProvider from 'providers/modal/alert'
import PromptProvider from 'providers/modal/prompt'
import { getClassName } from 'lib/util'
import React, {
  createContext, RefObject, useContext, useEffect, useRef, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import ConfirmProvider from './confirm'

interface ModalProviderContextProps {
    container : RefObject<HTMLDivElement>
    curtain: RefObject<HTMLDivElement>
    pull : () => void,
    pullBack : () => void,
}

const ModalProviderContext = createContext<ModalProviderContextProps>(null)

export const useModalProvider = () => useContext(ModalProviderContext)

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const container = useRef<HTMLDivElement>()
  const curtain = useRef<HTMLDivElement>()
  const [active, setActive] = useState(false)

  const pull = () => {
    setActive(true)
  }

  const pullBack = () => {
    if (container.current.childElementCount > 1) {
      return
    }
    setActive(false)
  }

  const fixBody = () => {
    document.body.style.cssText = `position:fixed; top:-${window.scrollY}px;`
  }

  const reset = () => {
    const scrollY = document.body.style.top
    document.body.style.cssText = 'position: relative; top:"";'
    window.scrollTo(0, -1 * parseInt(scrollY || '0', 10))
  }

  useEffect(() => {
    if (active) {
      fixBody()
    } else {
      reset()
    }
  }, [active])

  const value = {
    container,
    curtain,
    pull,
    pullBack,
  }

  return (
    <ModalProviderContext.Provider value={value}>
      <AlertProvider>
        <ConfirmProvider>
          <PromptProvider>
            {children}
          </PromptProvider>
        </ConfirmProvider>
      </AlertProvider>
      <div className={styles.container} ref={container} style={{ zIndex: active ? 98 : -1 }}>
        <div className={getClassName(styles.curtain, active && styles.active)} ref={curtain} />
      </div>
    </ModalProviderContext.Provider>
  )
}
