import React, {
  createContext, SetStateAction, useContext, useEffect, useState,
} from 'react'
import { createPortal } from 'react-dom'
import styles from 'sass/providers/modal.module.scss'
import { useModalProvider } from 'providers/modal'
import { VscChromeClose } from 'react-icons/vsc'

interface ModalContextProps {
  turnOff: () => void
}

const ModalContext = createContext<ModalContextProps>(null)

export const useModal = () => useContext(ModalContext)

export default function Modal({
  children,
  initializer,
  immediate,
  setImmediate,
  off,
}: {
  children: React.ReactNode
  initializer?: React.ReactNode
  immediate? : boolean
  setImmediate?: React.Dispatch<SetStateAction<boolean>>
  off? : () => void
}) {
  if (typeof document === 'undefined') {
    return <></>
  }
  const [active, setActive] = setImmediate ? [immediate, setImmediate] : useState(immediate)

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
    return () => curtain.current?.removeEventListener('click', turnOff)
  }, [])

  useEffect(() => {
    if (active) {
      pull()
      fixBody()
    } else {
      pullBack()
      off?.call(null)
      reset()
    }
  }, [active])

  const value = {
    turnOff,
  }

  return (
    <ModalContext.Provider value={value}>
      {initializer && (
        <button type="button" onClick={() => setActive(true)}>
          {initializer}
        </button>
      )}
      {active && createPortal(
        <div className={styles.wrapper}>
          <button className={styles.close} type="button" onClick={turnOff}>
            <VscChromeClose size={20} />
          </button>
          {children}
        </div>,
        container.current,
      )}
    </ModalContext.Provider>
  )
}
