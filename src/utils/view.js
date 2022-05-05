import { useLayoutEffect, useState } from 'react'

const vh = (v) => {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return (v * h) / 100
}

const vw = (v) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  return (v * w) / 100
}

const vmin = (v) => {
  return Math.min(vh(v), vw(v))
}

const vmax = (v) => {
  return Math.max(vh(v), vw(v))
}

function useWindowSize () {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize () {
      setSize([vw(100), vh(100)])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export {
  vh, vw, vmin, vmax, useWindowSize
}
