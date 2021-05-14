import { getClassName } from 'lib/util'
import React, {
  createContext, RefObject, useContext, useRef, useState,
} from 'react'
import styles from 'sass/providers/modalProvider.module.scss'

interface ModalContextProps {
    container : RefObject<HTMLDivElement>
    curtain: RefObject<HTMLDivElement>
    pull : () => void,
    pullBack : () => void,
}

const ModalContext = createContext<ModalContextProps>(null)

export const useModal = () => useContext(ModalContext)

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

  const value = {
    container,
    curtain,
    pull,
    pullBack,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
      <div className={styles.container} ref={container} style={{ zIndex: active ? 98 : -1 }}>
        <div className={getClassName(styles.curtain, active && styles.active)} ref={curtain} />
      </div>
    </ModalContext.Provider>
  )
}
