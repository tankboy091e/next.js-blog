import communicate from 'lib/api'
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
  state: 'default' | 'pending' | 'error' | 'success'
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
  const [state, setState] = useState<formState>({ state: 'default' })
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
        state: 'success',
        message: successDescription || 'request successed',
      })
    } catch (error) {
      const message = error instanceof VailidationError
        ? error.message
        : failDescription || 'Something went wrong'
      setState({
        state: 'error',
        message,
      })
    }
  }

  const handleFetch = async (input: RequestInfo, init?: RequestInit) => {
    const res = await communicate(input, {
      options: init,
    })
    if (res.ok) {
      if (res.status === 204) {
        setState({
          state: 'success',
        })
        return
      }
      const { data } = await res.json()
      setData(() => data)
      setState(() => ({
        state: 'success',
        message: 'request successed',
      }))
    } else {
      const { message } = await res.json()
      setState({
        state: 'error',
        message,
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
    setState({ state: 'pending' })
    try {
      if (needToValidate) {
        validateValues(...needToValidate)
      }
    } catch (error) {
      setState({
        state: 'error',
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

  if (state.state === 'success') {
    setTimeout(() => {
      if (backPath) {
        Router.push(backPath)
      } else {
        setState({ state: 'default' })
      }
      getResponse?.call(null, data)
    }, transitionInterval)
    return (
      <section className={containerClassName}>
        <p className={styles.success}>{state.message}</p>
      </section>
    )
  }

  const value = {
    setOptions,
  }

  return (
    <FormContext.Provider value={value}>
      <form
        onSubmit={onSubmit}
        className={getClassName(
          styles.container,
          containerClassName,
          state.state === 'pending' && styles.pending,
        )}
      >
        {state.state === 'error' && (
          <section className={styles.errorContainer}>
            {state.code}
            <p>{state.message}</p>
          </section>
        )}
        {state.state === 'pending' && <Loading />}
        <section className={getClassName(styles.inner, innerClassName)}>
          {children}
          <button type="submit" className={submitClassName}>
            {submitValue}
          </button>
        </section>
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
