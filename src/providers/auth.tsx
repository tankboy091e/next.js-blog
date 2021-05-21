/* eslint-disable camelcase */
import firebase from 'lib/db'
import 'firebase/auth'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import nookies from 'nookies'
import { useAlert } from './modal/alert'

type User = firebase.User
type UserCredential = firebase.auth.UserCredential
type firebasePersistence = 'none' | 'session' | 'local'

interface authProps {
  user?: User
  signin?: (
    email: string,
    password: string,
    remember: firebasePersistence,
  ) => Promise<UserCredential>
  register?: (
    email: string,
    password: string,
  ) => Promise<UserCredential>
  signout?: () => Promise<void>
}

const AuthContext = createContext<authProps>(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User>(null)
  const { createAlert } = useAlert()

  const signin = (
    email: string,
    password: string,
    remember: firebasePersistence,
  ) => firebase
    .auth()
    .setPersistence(remember)
    .then((_) => firebase.auth().signInWithEmailAndPassword(email, password))

  const register = (email: string, password: string) => firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)

  const signout = () => firebase.auth().signOut()

  const silentRefresh = async (user : User) => {
    const res = await fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyCjXzzfZnv7AbJIqO_qM9oG1fxi3G2oRRs', {
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: user.refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (!res.ok) {
      createAlert({
        message: 'Silent refresh has failed.',
      })
      return
    }
    const data = await res.json()
    const {
      id_token = await user.getIdToken(),
      expires_in = 3600,
    } = data
    nookies.set(undefined, 'token', id_token, {
      maxAge: expires_in,
    })
    setTimeout(silentRefresh, (parseInt(expires_in, 10) - 60) * 1000, user)
  }

  useEffect(() => {
    firebase.auth().onIdTokenChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        nookies.set(undefined, 'token', '')
        return
      }
      setUser(firebaseUser)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      return
    }
    silentRefresh(user)
  }, [user])

  const value = {
    user, signin, register, signout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
