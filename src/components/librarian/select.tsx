import styles from 'sass/components/librarian/select.module.scss'

export default function Select({ isbn13 }: { isbn13: string }) {
  const onClick = async () => {
    const res = await fetch('/api/books', {
      body: JSON.stringify({
        isbn13,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (res.ok) {
      alert('Added')
    }
  }
  return (
    <button className={styles.select} type="button" onClick={onClick}>
      Select
    </button>
  )
}
