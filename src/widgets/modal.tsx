import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import { createPortal } from 'react-dom'
import styles from 'sass/components/modal.module.scss'
import { useModalProvider } from 'providers/modal'

interface ModalContextProps {
  turnOff : () => void,
}

const ModalContext = createContext<ModalContextProps>(null)

export const useModal = () => useContext(ModalContext)

export default function Modal({
  children,
  initializer,
}: {
  children: React.ReactNode
  initializer: React.ReactNode
}) {
  if (typeof document === 'undefined') {
    return <></>
  }

  const [active, setActive] = useState(false)

  const {
    container, curtain, pull, pullBack,
  } = useModalProvider()

  const turnOff = () => {
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
    curtain.current.addEventListener('click', turnOff)
    return () => curtain.current.removeEventListener('click', turnOff)
  }, [])

  useEffect(() => {
    if (active === true) {
      pull()
      fixBody()
    } else {
      pullBack()
      reset()
    }
  }, [active])

  const value = {
    turnOff,
  }

  return (
    <ModalContext.Provider value={value}>
      <button type="button" onClick={() => setActive(true)}>
        {initializer}
      </button>
      {createPortal(
        active && <div className={styles.container}>{children}</div>,
        container.current,
      )}
    </ModalContext.Provider>
  )
}
