import { getClassName } from 'lib/util'
import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import styles from 'sass/widgets/edit-delete-menu.module.scss'

export default function EditDeleteMenu({
  containerClassName,
  menuButtonClassName,
  popupClassName,
  buttonWrapperClassName,
  menuButtonSize = 16,
  onEdit,
  onDelete,
}: {
  containerClassName?: string
  menuButtonClassName?: string
  popupClassName?: string
  buttonWrapperClassName?: string
  menuButtonSize?: number
  onEdit: () => void
  onDelete: () => void
}) {
  const [active, setActive] = useState(false)

  return (
    <div className={getClassName(styles.container, containerClassName)}>
      <button
        type="button"
        className={getClassName(styles.menuButton, menuButtonClassName)}
        onClick={() => setActive(!active)}
      >
        <HiOutlineDotsVertical size={menuButtonSize} />
      </button>
      {active && (
        <div className={getClassName(styles.popup, popupClassName)}>
          <div className={getClassName(styles.buttonWrapper, buttonWrapperClassName)}>
            <button type="button" onClick={onEdit}>
              수정
            </button>
          </div>
          <div className={getClassName(styles.buttonWrapper, buttonWrapperClassName)}>
            <button type="button" onClick={onDelete}>
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
