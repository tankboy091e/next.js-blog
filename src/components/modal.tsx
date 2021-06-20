import React, {
  createContext, MutableRefObject, SetStateAction, useContext, useEffect, useState,
} from 'react'
import styles from 'sass/components/modal.module.scss'
import { useModalProvider } from 'providers/modal'

interface ModalContextProps {
  active: boolean
  close: () => void
}

const ModalContext = createContext<ModalContextProps>(null)

export const useModal = () => useContext(ModalContext)

export default function Modal({
  ref,
  children,
  initializer,
  immediate,
  controller,
  onOff,
}: {
  ref?: MutableRefObject<HTMLDivElement>
  children: React.ReactNode
  initializer?: React.ReactNode
  immediate? : boolean
  controller?: React.Dispatch<SetStateAction<boolean>>
  onOff? : () => void
}) {
  const [active, setActive] = controller
    ? [immediate, controller]
    : useState(immediate)

  const {
    createModal,
    attachClickEventOnSkim,
    detachClickEventOnSkim,
    update,
  } = useModalProvider()

  const close = () => {
    setActive(false)
  }

  useEffect(() => {
    attachClickEventOnSkim(close)
    return () => detachClickEventOnSkim(close)
  }, [])

  useEffect(() => {
    update(active)
    if (!active) {
      onOff?.call(null)
    }
  }, [active])

  const value = {
    active,
    close,
  }

  return (
    <ModalContext.Provider value={value}>
      {initializer && (
        <button type="button" onClick={() => setActive(true)}>
          {initializer}
        </button>
      )}
      {active && createModal(
        <div ref={ref} className={styles.container}>
          {children}
        </div>,
      )}
    </ModalContext.Provider>
  )
}

Modal.defaultProps = {
  ref: null,
  initializer: null,
  immediate: null,
  controller: null,
  onOff: null,
}
