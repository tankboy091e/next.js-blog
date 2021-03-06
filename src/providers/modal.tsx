import { createPortal } from 'react-dom'
import React, {
  createContext, useContext, useEffect, useRef, useState,
} from 'react'
import styles from 'sass/providers/modal.module.scss'
import { getClassName } from 'lib/util'

type Listener = (this: HTMLDivElement, ev: MouseEvent) => any

interface ModalProviderContextProps {
    appendToContainer : (component: React.ReactNode) => React.ReactPortal
    attachScrimOnClick : (func : Listener) => void
    detachScrimOnClick : (func : Listener) => void
    update: (state: boolean) => void
}

const ModalProviderContext = createContext<ModalProviderContextProps>(null)

export const useModalProvider = () => useContext(ModalProviderContext)

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>()
  const scrimRef = useRef<HTMLDivElement>()
  const [active, setActive] = useState(false)

  const appendToContainer = (component: React.ReactNode): React.ReactPortal => createPortal(
    component,
    containerRef.current,
  )

  const attachScrimOnClick = (func: Listener) => {
    scrimRef.current.addEventListener('click', func)
  }

  const detachScrimOnClick = (func: Listener) => {
    scrimRef.current?.removeEventListener('click', func)
  }

  const update = (state : boolean) => {
    if (state) {
      setActive(true)
      return
    }
    if (containerRef.current.childElementCount === 1) {
      setActive(false)
    }
  }

  const fixBody = () => {
    document.body.style.cssText = `position:fixed; top:${-1 * window.scrollY}px; left: 0; right: 0; margin: 0 auto;`
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
    appendToContainer,
    attachScrimOnClick,
    detachScrimOnClick,
    update,
  }

  return (
    <ModalProviderContext.Provider value={value}>
      {children}
      <div className={styles.container} ref={containerRef} style={{ zIndex: active ? 98 : -1 }}>
        <div className={getClassName(styles.scrim, active && styles.active)} ref={scrimRef} />
      </div>
    </ModalProviderContext.Provider>
  )
}
