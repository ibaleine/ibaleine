import { useState, useEffect, useRef } from 'react'
import Animation from '../utils/Animation'

import styles from '../styles/Home.module.css'

export default function WaveCanvas() {
  const [innerWidth, setInnerWidth] = useState(1920)
  const [innerHeight, setInnerHeight] = useState(1080)
  const canvasRef = useRef()

  useEffect(() => {
    const onResize = () => {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }
    onResize()

    window.addEventListener('resize', onResize)

    const animation = new Animation(canvasRef, 1)
    animation.animate()

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [innerWidth, innerHeight, canvasRef])

  return (
    <canvas ref={canvasRef} className={styles.fountain} width={innerWidth} height={innerHeight} />
  )
}
