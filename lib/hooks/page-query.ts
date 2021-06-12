/* eslint-disable no-restricted-syntax */
import { NextRouter, useRouter } from 'next/router'
import { categories } from 'lib/util/category'

interface PageQuery {
    router: NextRouter
    category: string
    current: string
}

export default function usePageQuery() : PageQuery {
  const router = useRouter()
  const { asPath } = router

  const result = {
    router,
    category: null,
    current: null,
  }

  if (asPath.includes('pid') || asPath.includes('category')) {
    return result
  }

  if (asPath === '/') {
    result.category = 'home'
    return result
  }
  const paths = asPath.split('/')

  for (const element of categories) {
    for (const path of paths) {
      if (path === element) {
        result.category = path
        break
      }
    }
  }

  if (!result.category) {
    return result
  }

  result.current = asPath.substr(asPath.indexOf(result.category) + result.category.length + 1)

  return result
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

  const path = asPath.match(/[/](.*?)[/]/)

  if (!path) {
    return {
      router,
      category: null,
    }
  }

  const category = path[0].replace(/\//g, '')

  return {
    router,
    category,
  }
}
