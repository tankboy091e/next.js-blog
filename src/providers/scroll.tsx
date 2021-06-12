import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import useWindowSize from 'lib/hooks/window'

type scrollCallback = () => void

interface ScrollProviderProps {
  attachScrollCallback : (callback : scrollCallback) => void
  detachScrollCallback : (callback : scrollCallback) => void
  getScrollY : () => number
}

const ScrollContext = createContext<ScrollProviderProps>(null)
export const useScroll = () => useContext(ScrollContext)

export default function ScrollProvider({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>()

  const size = useWindowSize()

  const data = {
    ease: 0.05,
    curr: 0,
    prev: 0,
    result: 0,
    animation: null,
  }

  const callbacks : scrollCallback[] = []

  const attachScrollCallback = (callback : () => void) : void => {
    callbacks.push(callback)
  }

  const detachScrollCallback = (callback : () => void) : void => {
    callbacks.splice(callbacks.findIndex((child) => child !== callback), 1)
  }

  const notifyScrollCallback = () : void => {
    callbacks.forEach((callback) => {
      callback.call(null)
    })
  }

  const getScrollY = () : number => data.result

  const setBodyHeight = () : void => {
    document.body.style.height = `${
      containerRef.current.getBoundingClientRect().height
    }px`
  }

  const smoothScroll = useCallback(() => {
    if (!containerRef.current) {
      return
    }
    data.animation = requestAnimationFrame(smoothScroll)
    data.curr = window.scrollY
    data.prev += (data.curr - data.prev) * data.ease
    data.result = Math.round(data.prev * 100) / 100
    if (Math.abs(data.result - data.prev) < 1) {
      notifyScrollCallback()
    }
    containerRef.current.style.transform = `translateY(-${data.result}px)`
  }, [data])

  useEffect(() => {
    data.animation = requestAnimationFrame(smoothScroll)
    return () => cancelAnimationFrame(data.animation)
  }, [])

  useEffect(() => {
    setBodyHeight()
  }, [size.height, containerRef.current?.offsetHeight])

  const value = {
    attachScrollCallback,
    detachScrollCallback,
    getScrollY,
  }

  return (
    <ScrollContext.Provider value={value}>
      <div ref={containerRef} style={{ position: 'fixed' }} className={className}>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
