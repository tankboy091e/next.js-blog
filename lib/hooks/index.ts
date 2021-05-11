/* eslint-disable no-param-reassign */
import { useEffect } from 'react'

export function useResize(func: () => void) {
  useEffect(() => {
    window.addEventListener('resize', func)
    return () => window.removeEventListener('resize', func)
  }, [])
}

export function useFixElement(id : string, active :boolean) {
  useEffect(() => {
    const element = document.getElementById(id)
    if (active) {
      const scrollTop = window.scrollY
      element.style.position = 'fixed'
      element.style.top = `-${scrollTop}px`
    } else {
      const scrollTop = element.style.top
      element.style.position = 'relative'
      element.style.top = ''
      window.scrollTo(0, -1 * parseInt(scrollTop || '0', 10))
    }
  }, [active])
}
