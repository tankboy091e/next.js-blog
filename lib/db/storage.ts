import firebase from './admin'
import 'firebase/storage'

export default firebase.storage().bucket(process.env.STORAGE_BUCKET)
