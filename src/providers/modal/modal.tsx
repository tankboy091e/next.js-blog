import React, {
  createContext, MutableRefObject, SetStateAction, useContext, useEffect, useState,
} from 'react'
import { createPortal } from 'react-dom'
import styles from 'sass/providers/modal.module.scss'
import { useModalProvider } from 'providers/modal'

interface ModalContextProps {
  active: boolean
  turnOff: () => void
}

const ModalContext = createContext<ModalContextProps>(null)

export const useModal = () => useContext(ModalContext)

export default function Modal({
  children,
  ref,
  initializer,
  immediate,
  setImmediate,
  callback,
}: {
  children: React.ReactNode
  ref?: MutableRefObject<HTMLDivElement>
  initializer?: React.ReactNode
  immediate? : boolean
  setImmediate?: React.Dispatch<SetStateAction<boolean>>
  callback? : () => void
}) {
  const [active, setActive] = setImmediate ? [immediate, setImmediate] : useState(immediate)

  const {
    container, curtain, pull, pullBack,
  } = useModalProvider()

  const turnOff = () => {
    setActive(false)
  }

  useEffect(() => {
    curtain.current.addEventListener('click', turnOff)
    return () => curtain.current?.removeEventListener('click', turnOff)
  }, [])

  useEffect(() => {
    if (active) {
      pull()
    } else {
      pullBack()
      callback?.call(null)
    }
  }, [active])

  const value = {
    active,
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
        <div ref={ref} className={styles.wrapper}>
          {children}
        </div>,
        container.current,
      )}
    </ModalContext.Provider>
  )
}
