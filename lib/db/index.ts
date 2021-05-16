import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCjXzzfZnv7AbJIqO_qM9oG1fxi3G2oRRs',
  authDomain: 'blog-ee4ab.firebaseapp.com',
  projectId: 'blog-ee4ab',
  storageBucket: 'blog-ee4ab.appspot.com',
  messagingSenderId: '1095411185579',
  appId: '1:1095411185579:web:5c57d138a11b3052f5c4ee',
  measurementId: 'G-F2CERFHE58',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
