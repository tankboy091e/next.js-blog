import React, {
  createContext, useContext,
} from 'react'
import Alert, { AlertHeaderProps } from 'components/alert'
import { useDialog } from '..'

interface AlertContextProps {
  createAlert: ({ ...props }: AlertHeaderProps) => Promise<void | boolean>
}

const AlertContext = createContext<AlertContextProps>(null)

export const useAlert = () => useContext(AlertContext)

export default function Inner({ children }: {
  children?: React.ReactNode
}) {
  const { buildDialog } = useDialog()

  const createAlert = (header : AlertHeaderProps) => buildDialog()
    .insert(({ ok, cancle }) => (
      <Alert
        header={header}
        ok={ok}
        cancle={cancle}
      />
    )).open()

  const value = {
    createAlert,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}

Inner.defaultProps = {
  children: null,
}
