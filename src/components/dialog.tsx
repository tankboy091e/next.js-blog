import getPascalCase from 'lib/util/uppercase'
import { DialogProviderProps } from 'providers/modal/dialog'
import Modal, { useModal } from 'providers/modal/modal'
import React from 'react'
import styles from 'sass/components/dialog.module.scss'

interface DialogProps {
  children?: React.ReactNode
  request: DialogProviderProps
  showOk?: boolean
}

export default function Dialog({ children, request, showOk }: DialogProps) {
  return (
    <Modal immediate callback={request.close}>
      <Inner request={request} showOk={showOk}>
        {children}
      </Inner>
    </Modal>
  )
}

export function Inner({ children, request, showOk }: DialogProps) {
  const { code, message, ok } = request

  const { turnOff } = useModal()

  return (
    <form className={styles.window} onSubmit={ok}>
      <h4 className={styles.code}>{getPascalCase(code || '안내')}</h4>
      {message && <p className={styles.message}>{message}</p>}
      {children}
      <section className={styles.menu}>
        {showOk && <button type="submit">확인</button>}
        <button type="button" onClick={turnOff}>
          취소
        </button>
      </section>
    </form>
  )
}
