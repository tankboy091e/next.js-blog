import hermes from 'lib/api/hermes'
import usePageQuery from 'lib/hooks/page-query'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/modal/alert'
import { useConfirm } from 'providers/modal/confirm'
import EditDeleteMenu from 'widgets/edit-delete-menu'

export default function ArticleMenu() {
  const { router, category, current } = usePageQuery()
  const { user } = useAuth()
  const { createConfirm } = useConfirm()
  const { createAlert } = useAlert()

  const onEdit = () => {
    router.push(`/${category}/edit/${current}`)
  }

  const onDelete = async () => {
    const confirm = await createConfirm({ message: '정말 삭제하시겠습니까?' })
    if (!confirm) {
      return
    }
    const res = await hermes(`/api/${category}/${current}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      const { message } = await res.json()
      await createAlert({ message })
      router.reload()
    } else {
      const { error } = await res.json()
      await createAlert({ message: error })
    }
  }

  return (
    user && (
      <EditDeleteMenu
        menuButtonSize={24}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )
  )
}
