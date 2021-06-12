import { Dispatch, SetStateAction } from 'react'
import styles from 'sass/components/comments/button.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { getClassName } from 'lib/util'

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
      <span>Comment</span>
      <MdKeyboardArrowDown
        className={getClassName(styles.icon, active && styles.active)}
        size={24}
      />
    </button>
  )
}
