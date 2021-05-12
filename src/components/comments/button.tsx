import { Dispatch, SetStateAction } from 'react'
import styles from 'sass/components/comments/button.module.scss'

export default function Button({
  active,
  setActive,
}: {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => setActive(!active)}
    >
      Comment
    </button>
  )
}
