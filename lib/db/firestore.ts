import firebase from './admin'
import 'firebase/firestore'

export default firebase.firestore()

export const getCollectionRefwithID = async (path: string) => {
  const result = firebase.firestore().collection(path)
  const autoIncrementRef = result.doc('autoIncrement')
  await autoIncrementRef.update({
    value: firebase.firestore.FieldValue.increment(1),
  })
  const doc = await autoIncrementRef.get()
  return {
    colRef: result,
    id: doc.data().value,
  }
}
