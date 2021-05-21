import React, {
  createContext, useContext,
} from 'react'
import DialogProvider, { Dialog, useDialog } from './dialog'

interface AlertContextProps {
  createAlert: ({ ...props }: Props) => Promise<void>
}

const AlertContext = createContext<AlertContextProps>(null)
export const useAlert = () => useContext(AlertContext)

interface Props {
  message: string
  code?: string
}

export default function AlertProvider({ children }: {
  children?: React.ReactNode
}) {
  return (
    <DialogProvider>
      <Inner>
        {children}
      </Inner>
    </DialogProvider>
  )
}

function Inner({ children }: {
  children?: React.ReactNode
}) {
  const { getRequests, createDialog } = useDialog()

  const createAlert = ({ ...props }: Props) => createDialog(props)

  const value = {
    createAlert,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      {getRequests().map((request) => (
        <Dialog request={request} />
      ))}
    </AlertContext.Provider>
  )
}
