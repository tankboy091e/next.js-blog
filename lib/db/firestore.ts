import firebase from './admin'
import 'firebase/firestore'

export default firebase.firestore()

const autoIncrement = 'autoIncrement'

export type Collection = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
export type FirebaseDocument = FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
export type QueryDocument = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

export const reorderCollection = async (colRef: Collection) => {
  const snapshots = await colRef.orderBy('id', 'asc').get()
  const docs : QueryDocument[] = []
  snapshots.forEach((doc) => {
    docs.push(doc)
  })
  let prevId = 0
  // eslint-disable-next-line no-restricted-syntax
  for await (const doc of docs) {
    const { id } = doc.data()
    if (id !== prevId + 1) {
      await doc.ref.update({
        id: prevId + 1,
      })
    }
    prevId = id
  }
}

export const increaseAutoIncrement = async (colRef: Collection) => colRef
  .doc(autoIncrement)
  .update({
    value: firebase.firestore.FieldValue.increment(1),
  })

export const decreaseAutoIncrement = async (colRef: Collection) => colRef
  .doc(autoIncrement)
  .update({
    value: firebase.firestore.FieldValue.increment(-1),
  })

export const getAutoIncrement = async (colRef: Collection): Promise<number> => {
  const autoIncrementRef = colRef.doc(autoIncrement)
  const doc = await autoIncrementRef.get()

  if (!doc.exists) {
    const autoIncrement = await autoIncrementRef
      .set({ value: 0 })
      .then(() => autoIncrementRef.get())
      .then((doc) => doc.data().value)
    return autoIncrement
  }

  return doc.data().value
}
