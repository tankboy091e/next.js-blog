import { GoPlus } from 'react-icons/go'
import buttonStyles from 'sass/widgets/add-button.module.scss'

export default function AddButton({
  size = 48,
} : {
  size?: number
}) {
  return <GoPlus size={size} className={buttonStyles.addButton} />
}
