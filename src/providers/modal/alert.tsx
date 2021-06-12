import Dialog from 'components/dialog'
import React, {
  createContext, useContext,
} from 'react'
import DialogProvider, { useDialog } from './dialog'

interface AlertContextProps {
  createAlert: ({ ...props }: Props) => Promise<void | boolean>
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
  const { requests, createDialog } = useDialog()

  const createAlert = ({ ...props }: Props) => createDialog(props)

  const value = {
    createAlert,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      {requests.map((request) => (
        <Dialog key={request.message} request={request} />
      ))}
    </AlertContext.Provider>
  )
}
