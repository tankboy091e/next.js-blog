import React, {
  createContext, MutableRefObject, SetStateAction, useContext, useEffect, useState,
} from 'react'
import styles from 'sass/components/modal.module.scss'
import { useModalProvider } from 'providers/modal'
import { getClassName } from 'lib/util'

interface ModalContextProps {
  active: boolean
  close: () => void
}

const ModalContext = createContext<ModalContextProps>(null)

export const useModal = () => useContext(ModalContext)

export default function Modal({
  className,
  ref,
  children,
  initializer,
  immediate,
  controller,
  onClose,
}: {
  className?: string,
  ref?: MutableRefObject<HTMLDivElement>
  children: React.ReactNode
  initializer?: React.ReactNode
  immediate? : boolean
  controller?: React.Dispatch<SetStateAction<boolean>>
  onClose? : () => void
}) {
  const [active, setActive] = controller
    ? [immediate, controller]
    : useState(immediate)

  const {
    appendToContainer,
    attachScrimOnClick,
    detachScrimOnClick,
    update,
  } = useModalProvider()

  const close = () => {
    setActive(false)
  }

  useEffect(() => {
    attachScrimOnClick(close)
    return () => detachScrimOnClick(close)
  }, [])

  useEffect(() => {
    update(active)
    if (!active) {
      onClose?.call(null)
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
      {active && appendToContainer(
        <section ref={ref} className={getClassName(styles.container, className)}>
          {children}
        </section>,
      )}
    </ModalContext.Provider>
  )
}

Modal.defaultProps = {
  className: null,
  ref: null,
  initializer: null,
  immediate: false,
  controller: null,
  onClose: null,
}
