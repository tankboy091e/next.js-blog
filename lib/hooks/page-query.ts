import { NextRouter, useRouter } from 'next/router'

const defaultCategory = 'sum'

interface PageQuery {
    router: NextRouter
    category: string
    current: number
}

export default function usePageQuery() : PageQuery {
  const router = useRouter()
  const { asPath } = router

  if (asPath.includes('pid')) {
    return {
      router,
      category: null,
      current: null,
    }
  }

  if (asPath === '/') {
    return {
      router,
      category: defaultCategory,
      current: 1,
    }
  }

  const query = asPath.substr(asPath.lastIndexOf('/') + 1)
  if (Number.isNaN(parseInt(query, 10))) {
    return {
      router,
      category: query,
      current: 1,
    }
  }

  const category = asPath.match(/[/](.*?)[/]/)[0].replaceAll('/', '')
  const current = parseInt(query, 10)

  return {
    router,
    category,
    current,
  }
}

export function useEditorPageQuery() {
  const router = useRouter()
  const { asPath } = router

  if (asPath.includes('category')) {
    return {
      router: null,
      category: null,
    }
  }

  const category = asPath.match(/[/](.*?)[/]/)[0].replaceAll('/', '')

  return {
    router,
    category,
  }
}
