import firebase from 'lib/db'
import 'firebase/auth'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import nookies from 'nookies'

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

  useEffect(() => {
    firebase.auth().onIdTokenChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        nookies.set(undefined, 'token', '')
        return
      }
      const token = await firebaseUser.getIdToken()
      setUser(firebaseUser)
      nookies.set(undefined, 'token', token)
    })
  }, [])

  const value = {
    user, signin, register, signout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
