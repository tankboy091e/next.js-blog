/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
import { useModalProvider } from 'providers/modal'
import React, {
  createContext, useContext, useState, useEffect,
} from 'react'
import Dialog from 'src/components/dialog'
import Modal from 'src/components/modal'

type Inner =
  | React.ReactNode
  | ((props: { ok?: () => void; cancle?: () => void }) => React.ReactNode)

interface IDialogRequest {
  insert(child: Inner): IDialogRequest
  open(): Promise<boolean>
}

interface DialogCallbackProps {
  ok: () => void
  cancle: () => void
}

export type DialogProviderProps = DialogCallbackProps & {
  inner: React.ReactNode
}

interface DialogProviderContextProps {
  requests: DialogProviderProps[]
  buildDialog: () => IDialogRequest
}

const DialogProviderContext = createContext<DialogProviderContextProps>(null)

export const useDialog = () => useContext(DialogProviderContext)

export default function DialogProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const [requests, setRequests] = useState<DialogProviderProps[]>([])
  const { update } = useModalProvider()

  const finishRequest = (request: DialogProviderProps) => {
    setRequests((array) => array.filter((value) => value !== request))
  }

  class DialogRequest implements IDialogRequest {
    private inner: React.ReactNode
    private executions : {
      ok: Function
      cancle: Function
      close: Function
    }

    private executeOk() {
      this.executions.ok()
      this.executeClose()
    }

    private executeCancle() {
      this.executions.cancle()
      this.executeClose()
    }

    private executeClose() {
      this.executions.close()
    }

    public insert(inner : Inner): IDialogRequest {
      if (typeof inner === 'function') {
        this.inner = inner({
          ok: () => this.executeOk(),
          cancle: () => this.executeCancle(),
        })
        return this
      }
      this.inner = inner
      return this
    }

    public open(): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = {
          inner: this.inner,
          ok: () => this.executeOk(),
          cancle: () => this.executeCancle(),
        }
        this.executions = {
          ok: () => resolve(true),
          cancle: () => resolve(false),
          close: () => finishRequest(request),
        }
        setRequests((array) => array.concat(request))
      })
    }
  }

  const buildDialog = () => new DialogRequest()

  const value = {
    requests,
    buildDialog,
  }

  useEffect(() => {
    if (requests.length < 1) {
      update(false)
    }
  }, [requests])

  return (
    <DialogProviderContext.Provider value={value}>
      {children}
      {requests.map(({ inner, cancle }) => (
        <Modal
          key={Math.random()}
          immediate
          onOff={cancle}
        >
          <Dialog>
            {inner}
          </Dialog>
        </Modal>
      ))}
    </DialogProviderContext.Provider>
  )
}

DialogProvider.defaultProps = {
  children: null,
}
