import React, { MouseEventHandler } from 'react'
import styles from 'sass/components/alert.module.scss'

export interface AlertHeaderProps {
    code?: string
    message: string
}

export default function Alert({
  children,
  header,
  showCancle,
  ok,
  cancle,
}: {
  children?: React.ReactNode
  header: AlertHeaderProps
  showCancle?: boolean
  ok: MouseEventHandler
  cancle: MouseEventHandler
}) {
  const { code, message } = header
  return (
    <>
      <h4 className={styles.code}>{code || '안내'}</h4>
      {message && <p className={styles.message}>{message}</p>}
      {children}
      <section className={styles.menu}>
        <button type="button" onClick={ok}>
          확인
        </button>
        {showCancle && (
        <button type="button" onClick={cancle}>
          취소
        </button>
        )}
      </section>
    </>
  )
}

Alert.defaultProps = {
  children: null,
  showCancle: false,
}
