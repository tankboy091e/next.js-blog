export default function getAuthor(
  authorQuery: string,
): {
  author: string
  translator: string
  editor: string
} {
  try {
    const [authors, others] = authorQuery.trim().split('(지은이)')
    const author = merge(authors)
    const [translators, editors] = others?.split('(옮긴이)')
    const translator = merge(translators)
    const editor = merge(editors)
    return {
      author,
      translator,
      editor,
    }
  } catch (e) {
    return {
      author: authorQuery,
      translator: null,
      editor: null,
    }
  }
}

function merge(names: string) {
  return names?.split(',').reduce((prev, current) => prev + current, '').trim()
}
