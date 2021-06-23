import fetcher from 'lib/api/fetcher'
import useSWR from 'swr'
import ErrorMessage from 'widgets/error-message'
import styles from 'sass/components/notes.module.scss'
import { useAuth } from 'providers/auth'
import Modal from 'components/modal'
import AddButton from 'widgets/add-button'
import NewQuotes from 'templates/new-quotes'
import Note, { NoteProps } from './note'

export default function Notes({ isbn }: { isbn: string | string[] }) {
  const { data, error, mutate } = useSWR<NoteProps[]>(`/api/quotes/${isbn}`, fetcher)
  const { user } = useAuth()

  if (error) {
    return (
      <section className={styles.container}>
        <ErrorMessage />
      </section>
    )
  }

  if (!data) {
    return <></>
  }

  if (data.length === 0) {
    return (
      <>
        {user && (
          <Modal initializer={<AddButton />}>
            <NewQuotes isbn={isbn} mutate={mutate} />
          </Modal>
        )}
      </>
    )
  }

  return (
    <>
      <section className={styles.container}>
        {data.map((value) => <Note key={value.id} isbn={isbn} value={value} mutate={mutate} />)}
      </section>
      {user && (
        <Modal initializer={<AddButton />}>
          <NewQuotes isbn={isbn} mutate={mutate} />
        </Modal>
      )}
    </>
  )
}
