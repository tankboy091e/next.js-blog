import { ArticleData } from 'components/article'
import Frame from 'components/frame'
import Modal from 'components/modal'
import { useAuth } from 'providers/auth'
import styles from 'sass/templates/gallary.module.scss'
import GallaryWriter from './gallary-writer'

export default function Gallary({ data }: { data: ArticleData[] }) {
  const { user } = useAuth()

  return (
    <>
      {user && (
        <Modal initializer="+ New" initializerClassName={styles.new}>
          <GallaryWriter />
        </Modal>
      )}
      {
        data.map((value) => <Frame key={value.doc} data={value} />)
      }
    </>
  )
}
