import firebase from 'firebase/app'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const firebaseConfig = {
  apiKey: publicRuntimeConfig.API_KEY,
  authDomain: publicRuntimeConfig.AUTH_DOMAIN,
  projectId: publicRuntimeConfig.PROJECT_ID,
  storageBucket: publicRuntimeConfig.STORAGE_BUCKET,
  messagingSenderId: publicRuntimeConfig.MESSAGING_SENDER_ID,
  appId: publicRuntimeConfig.APP_ID,
  measurementId: publicRuntimeConfig.MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
