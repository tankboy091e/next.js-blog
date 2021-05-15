import { getClassName } from 'lib/util'
import Router from 'next/router'
import React, {
  createContext,
  FormEvent,
  RefObject,
  useContext,
  useState,
} from 'react'
import styles from 'sass/providers/form.module.scss'
import Loading from 'widgets/loading'

export interface formState {
  status: 'default' | 'pending' | 'error' | 'success'
  code?: string
  message?: string
}

interface defaultProps {
  needToValidate?: RefObject<HTMLInputElement | HTMLTextAreaElement>[]
  backPath?: string
  transitionInterval?: number
  getResponse?: (data: any) => void
  submitValue?: React.ReactNode
  containerClassName?: string
  innerClassName?: string
  submitClassName?: string
}

interface formProps {
  input: RequestInfo
  method?: string
  extraBody?: { [key: string]: string }
}

interface fetchProps {
  input: RequestInfo
  init: () => RequestInit
}

interface submitProps {
  onSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<void>
  successDescription?: string
  failDescription?: string
}

type options = defaultProps & (fetchProps | submitProps | formProps)

interface contextProps {
  setOptions: ({ ...props }: options) => void
}

const FormContext = createContext<contextProps>(null)

export const useForm = () => useContext(FormContext)

export default function FormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [options, setOptions] = useState<options>({
    onSubmit: null,
  })
  const [state, setState] = useState<formState>({ status: 'default' })
  const [data, setData] = useState<any>(null)

  const {
    needToValidate,
    submitValue = 'Submit',
    backPath,
    transitionInterval = 2000,
    getResponse,
    containerClassName,
    innerClassName,
    submitClassName,
  } = options

  const onSubmitCustom = async (
    {
      onSubmit,
      successDescription,
      failDescription,
    }: defaultProps & submitProps,
    e: FormEvent<HTMLFormElement>,
  ) => {
    try {
      await onSubmit(e)
      setState({
        status: 'success',
        message: successDescription || 'Processed Sucessfully.',
      })
    } catch (error) {
      const message = error instanceof VailidationError
        ? error.message
        : failDescription || 'Something went wrong'
      setState({
        status: 'error',
        message,
      })
    }
  }

  const handleFetch = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, init)
    if (res.status === 201) {
      const { data, message } = await res.json()
      setData(() => data)
      setState(() => ({
        status: 'success',
        message,
      }))
    } else {
      const { error } = await res.json()
      setState({
        status: 'error',
        message: error,
      })
    }
  }

  const onSubmitFetch = async ({ input, init }: defaultProps & fetchProps) => {
    handleFetch(input, init())
  }

  const onFetchWithGet = async ({ input }: defaultProps & formProps) => {
    handleFetch(input)
  }

  const onSubmitFormData = async (
    { input, method = 'POST', extraBody }: defaultProps & formProps,
    e: FormEvent<HTMLFormElement>,
  ) => {
    const body = new FormData(e.currentTarget)
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(extraBody)) {
      body.append(key, value)
    }
    const requestInit = {
      body,
      method,
    }
    handleFetch(input, requestInit)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState({ status: 'pending' })
    try {
      if (needToValidate) {
        validateValues(...needToValidate)
      }
    } catch (error) {
      setState({
        status: 'error',
        message: error.message,
      })
      return
    }
    if ('onSubmit' in options) {
      onSubmitCustom(options, e)
    } else if ('init' in options) {
      onSubmitFetch(options)
    } else if (options.method === 'GET') {
      onFetchWithGet(options)
    } else {
      onSubmitFormData(options, e)
    }
  }

  if (state.status === 'success') {
    setTimeout(() => {
      if (backPath) {
        Router.push(backPath)
      } else {
        setState({ status: 'default' })
      }
      getResponse?.call(null, data)
    }, transitionInterval)
    return <div className={styles.successContainer}>{state.message}</div>
  }

  const value = {
    setOptions,
  }

  return (
    <FormContext.Provider value={value}>
      {state.status === 'pending' && <Loading />}
      <form
        onSubmit={onSubmit}
        className={getClassName(
          containerClassName,
          state.status === 'pending' && styles.pending,
        )}
      >
        {state.status === 'error' && (
          <div className={styles.errorContainer}>
            {state.code}
            <p>{state.message}</p>
          </div>
        )}
        <div className={innerClassName}>
          {children}
          <button type="submit" className={submitClassName}>
            {submitValue}
          </button>
        </div>
      </form>
    </FormContext.Provider>
  )
}

export function getValue(
  element: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  validation?: boolean,
): string {
  const { value, name } = element.current
  if (validation === true) {
    if (value === '') {
      throw new VailidationError(`${name} is not filled out`)
    }
  }
  return value
}

export function validateValues(
  ...elements: RefObject<HTMLInputElement | HTMLTextAreaElement>[]
): string[] {
  return elements.map((element) => {
    const { value, name } = element.current
    if (value === '') {
      throw new VailidationError(`${name} is not filled out`)
    }
    return value
  })
}

function getFirstUpperCase(str: string) {
  return str[0].toUpperCase() + str.substr(1)
}

export class VailidationError extends Error {
  constructor(message?: string) {
    super(getFirstUpperCase(message))
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VailidationError)
    }
  }
}
