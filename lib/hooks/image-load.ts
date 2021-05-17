import { useEffect, useState } from 'react'

export default function useImageLoad(count : number) {
  const [load, setLoad] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const onImageLoad = () => {
    setLoadedCount((prev) => prev + 1)
  }
  useEffect(() => {
    if (loadedCount !== count) {
      return
    }
    setLoad(true)
  }, [loadedCount])

  return {
    load,
    onImageLoad,
  }
}
