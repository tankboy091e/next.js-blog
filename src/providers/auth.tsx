/* eslint-disable camelcase */
import 'firebase/auth'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import communicate from 'lib/api'
import { deleteCookie, setCookie } from 'lib/util/cookie'
import { useAlert } from './dialog/alert/inner'

export const ACCESS_TOKEN = 'oh_t_cogito'

interface authProps {
  user?: boolean
  signin?: (
    email: string,
    password: string,
  ) => Promise<void>
  signout?: () => Promise<void>
}

const AuthContext = createContext<authProps>(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<boolean>(false)
  const { createAlert } = useAlert()

  const signin = async (email: string, password: string) => {
    const res = await communicate('/auth/signin', {
      payload: {
        email,
        password,
      },
      method: 'POST',
    })
    if (res.status !== 200) {
      createAlert({ text: '오류가 발생했습니다' })
      return
    }
    const { access_token, expiresIn } = await res.json()
    onResponse(access_token, expiresIn)
  }

  const signout = async () => {
    const res = await communicate('/auth/signout')
    if (!res.ok) {
      createAlert({ text: '오류가 발생했습니다' })
      return
    }
    deleteCookie(ACCESS_TOKEN)
    setUser(false)
  }

  const silentRefresh = async () => {
    const res = await communicate('/auth/token')
    if (res.status !== 200) {
      deleteCookie(ACCESS_TOKEN)
      setUser(false)
      return
    }
    const { access_token, expiresIn } = await res.json()
    onResponse(access_token, expiresIn)
  }

  const onResponse = (accessToken: string, expiresIn: string) => {
    setCookie(ACCESS_TOKEN, accessToken)
    setUser(true)
    setTimeout(silentRefresh, parseInt(expiresIn, 10) - 60 * 1000)
  }

  useEffect(() => {
    silentRefresh()
  }, [])

  const value = {
    user, signin, signout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
