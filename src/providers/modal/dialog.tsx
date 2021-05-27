import React, {
  createContext, MutableRefObject, useContext, useEffect, useState,
} from 'react'
import { useModalProvider } from '.'

interface DialogProviderContextProps {
  requests: DialogProviderProps[]
  createDialog: (
    props: DialogMessageProps,
  ) => Promise<boolean>
  createRefDialog: <K = void>(
    props: DialogMessageProps,
    returnRef: MutableRefObject<K>
  ) => Promise<K>
}

const DialogProviderContext = createContext<DialogProviderContextProps>(null)

export const useDialog = () => useContext(DialogProviderContext)

export interface DialogMessageProps {
  message: string
  code?: string,
}

interface DialogCallbackProps {
  ok: (e: React.FormEvent) => Promise<void>
  close: () => Promise<void>
}

export type DialogProviderProps = DialogMessageProps & DialogCallbackProps

export default function DialogProvider({
  children,
  dialogs,
}: {
  children?: React.ReactNode
  dialogs?: React.ReactNode
}) {
  const [requests, setRequests] = useState<DialogProviderProps[]>([])
  const { pullBack } = useModalProvider()

  const finishRequest = (request : DialogProviderProps) => {
    setRequests((requests) => requests.filter((value) => value !== request))
  }

  const createDialog = (
    props: DialogMessageProps,
  ) => new Promise<boolean>((resolve) => {
    const request = {
      ...props,
      ok: async (e : React.FormEvent) => {
        e.preventDefault()
        resolve(true)
        finishRequest(request)
      },
      close: async () => {
        resolve(false)
        finishRequest(request)
      },
    }
    setRequests((requests) => requests.concat(request))
  })

  const createRefDialog = <K extends unknown = void>(
    props: DialogMessageProps,
    returnRef: MutableRefObject<K>,
  ) => new Promise<K>((resolve) => {
    const request = {
      ...props,
      ok: async (e : React.FormEvent) => {
        e.preventDefault()
        resolve(returnRef.current)
        finishRequest(request)
      },
      close: async () => {
        resolve(returnRef.current)
        finishRequest(request)
      },
    }
    setRequests((requests) => requests.concat(request))
  })

  const value = {
    requests,
    createDialog,
    createRefDialog,
  }

  useEffect(() => {
    if (requests.length < 1) {
      pullBack()
    }
  }, [requests])

  return (
    <DialogProviderContext.Provider value={value}>
      {children}
      {dialogs}
    </DialogProviderContext.Provider>
  )
}
