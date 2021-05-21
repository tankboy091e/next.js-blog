import Dialog from 'components/dialog'
import React, {
  createContext, useContext,
} from 'react'
import DialogProvider, { useDialog } from './dialog'

interface ConfirmContextProps {
  createConfirm: ({ ...props }: Props) => Promise<void | boolean>
}

const ConfirmContext = createContext<ConfirmContextProps>(null)
export const useConfirm = () => useContext(ConfirmContext)

interface Props {
  message: string
  code?: string
}

export default function ConfirmProvider({ children }: {
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

  const createConfirm = ({ ...props }: Props) => createDialog(props)

  const value = {
    createConfirm,
  }

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {requests.map((request) => (
        <Dialog
          key={request.message}
          request={request}
          showOk
        />
      ))}
    </ConfirmContext.Provider>
  )
}
