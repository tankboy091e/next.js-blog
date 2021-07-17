import communicate from 'lib/api'
import usePageQuery from 'lib/hooks/page-query'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { useConfirm } from 'providers/dialog/confirm/inner'
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
    const confirm = await createConfirm({ text: '정말 삭제하시겠습니까?' })
    if (!confirm) {
      return
    }
    const res = await communicate(`/${category}/${current}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      router.push(`/${category}`)
    } else {
      const { error } = await res.json()
      await createAlert({ text: error })
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
